"""
Maria Puspa Avatar API Server.
Generates talking-head videos using SadTalker.
"""

import logging
import os
import subprocess
import sys
import urllib.request
import uuid
from pathlib import Path
from typing import Any, Dict

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("AvatarAPI")

logger.info("🚀 [Maria Puspa Auto-Setup] Memulakan proses automasi sepenuhnya...")

def install_packages() -> None:
    """Install required Python packages."""
    logger.info("📦 Memeriksa dan memasang module Python yang diperlukan...")
    try:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "fastapi", "uvicorn", "edge-tts", "pydantic"]
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Gagal memasang pakej: {e}")
        sys.exit(1)

try:
    import edge_tts
    import fastapi
    import uvicorn
    from fastapi.responses import FileResponse
    from pydantic import BaseModel
except ImportError:
    install_packages()
    import edge_tts
    import fastapi
    import uvicorn
    from fastapi.responses import FileResponse
    from pydantic import BaseModel

# ─── CONFIGURATION ───
SADTALKER_REPO: str = "https://github.com/OpenTalker/SadTalker.git"
SADTALKER_DIR: Path = Path("SadTalker")
SOURCE_IMAGE: Path = Path("maria.jpg")
IMAGE_URL: str = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
HOST: str = "127.0.0.1"
PORT: int = 8000

def setup_environment() -> None:
    """Download dependencies, AI models, and source image if they don't exist."""
    if not SADTALKER_DIR.exists():
        logger.info("📥 Memuat turun sistem AI SadTalker secara automatik...")
        try:
            subprocess.check_call(["git", "clone", SADTALKER_REPO, str(SADTALKER_DIR)])
            logger.info("📦 Memasang modul AI... (Sila tunggu, ini mungkin mengambil masa sedikit)")
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", "-r", str(SADTALKER_DIR / "requirements.txt")]
            )
        except subprocess.CalledProcessError as e:
            logger.error(f"Gagal setup SadTalker: {e}")

    if not SOURCE_IMAGE.exists():
        logger.info("🖼️ Memuat turun gambar rujukan (wajah Maria Puspa)...")
        try:
            urllib.request.urlretrieve(IMAGE_URL, str(SOURCE_IMAGE))
        except Exception as e:
            logger.error(f"Gagal memuat turun gambar rujukan: {e}")

setup_environment()

# ─── API SERVER ───
app = fastapi.FastAPI(title="Maria Puspa Avatar API")

class AvatarRequest(BaseModel):
    text: str

@app.post("/generate-avatar")
async def generate_avatar(req: AvatarRequest) -> Dict[str, Any]:
    """Generate a talking-head video from text."""
    job_id: str = str(uuid.uuid4())[:8]
    audio_path: Path = Path(f"temp_{job_id}.wav")
    output_dir: Path = Path(f"results_{job_id}")
    
    logger.info(f"[API] Menjana suara untuk teks: {req.text}")
    try:
        communicate = edge_tts.Communicate(req.text, "ms-MY-YasminNeural")
        await communicate.save(str(audio_path))
    except Exception as e:
        logger.error(f"Ralat Edge TTS: {e}")
        return {"error": f"Ralat TTS: {str(e)}", "status": "failed"}
    
    logger.info("[API] Menjalankan AI Avatar... Video sedang dijana.")
    
    sadtalker_cmd: str = (
        f"cd {SADTALKER_DIR} && "
        f"{sys.executable} inference.py "
        f"--driven_audio ../{audio_path} "
        f"--source_image ../{SOURCE_IMAGE} "
        f"--result_dir ../{output_dir} "
        f"--still --preprocess crop"
    )
    
    try:
        process = subprocess.run(sadtalker_cmd, shell=True, capture_output=True, text=True)
        if process.returncode != 0:
            logger.error(f"SadTalker gagal dengan kod {process.returncode}:\n{process.stderr}")
    except Exception as e:
        logger.error(f"Ralat ketika memanggil SadTalker: {e}")
    
    try:
        if output_dir.exists():
            mp4_files: list[str] = [f for f in os.listdir(output_dir) if f.endswith('.mp4')] 
            if mp4_files:
                video_url: str = f"http://{HOST}:{PORT}/download/{job_id}/{mp4_files[0]}"
                return {"video_url": video_url, "status": "success"}
            else:
                logger.error("Tiada fail mp4 dijumpai dalam direktori hasil.")
        else:
            logger.error("Direktori hasil tidak wujud.")
    except Exception as e:
        logger.error(f"Ralat membaca output: {e}")
        
    return {"error": "Ralat ketika menjana video (mungkin GPU tidak cukup atau ralat lain).", "status": "failed"}

@app.get("/download/{job_id}/{filename}")
async def download_video(job_id: str, filename: str) -> FileResponse:
    """Endpoint to download generated videos."""
    file_path: Path = Path(f"results_{job_id}") / filename
    if not file_path.exists():
        raise fastapi.HTTPException(status_code=404, detail="Fail tidak dijumpai")
    return FileResponse(str(file_path), media_type="video/mp4")

if __name__ == "__main__":
    logger.info(f"✅ PUSPA AVATAR API SEDIA BEROPERASI DI: http://{HOST}:{PORT}")
    uvicorn.run(app, host=HOST, port=PORT)
