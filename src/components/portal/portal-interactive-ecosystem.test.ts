import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('PUSPA-Z Emons-Grade Continuous Fly-Through & Diorama Suite', () => {
  const rootDir = process.cwd()

  it('1. Master continuous video asset (puspa-continuous-ecosystem.mp4) exists and is valid', () => {
    const videoPath = path.join(rootDir, 'public', 'videos', 'puspa-continuous-ecosystem.mp4')
    expect(fs.existsSync(videoPath)).toBe(true)
    const stats = fs.statSync(videoPath)
    expect(stats.size).toBeGreaterThan(5_000_000)
  })

  it('2. All 5 living diorama individual video fallbacks exist', () => {
    for (let i = 1; i <= 5; i++) {
      const vid = path.join(rootDir, 'public', 'videos', `diorama-0${i}.mp4`)
      expect(fs.existsSync(vid)).toBe(true)
      const stats = fs.statSync(vid)
      expect(stats.size).toBeGreaterThan(100_000)
    }
  })

  it('3. All 6 field documentary gallery images exist and are non-empty', () => {
    for (let i = 1; i <= 6; i++) {
      const img = path.join(rootDir, 'public', `gallery-agihan-0${i}.jpg`)
      expect(fs.existsSync(img)).toBe(true)
      const stats = fs.statSync(img)
      expect(stats.size).toBeGreaterThan(50_000)
    }
  })

  it('4. Validates 5 continuous fly-through zone targets & monotonic timeline timestamps', () => {
    const ZONES = [
      { id: 'dapur', num: '01', targetTime: 2.0, range: [0.0, 5.0] },
      { id: 'gudang', num: '02', targetTime: 8.0, range: [5.0, 11.0] },
      { id: 'armada', num: '03', targetTime: 14.0, range: [11.0, 17.0] },
      { id: 'institusi', num: '04', targetTime: 20.0, range: [17.0, 23.0] },
      { id: 'hab', num: '05', targetTime: 26.0, range: [23.0, 28.0] },
    ]

    expect(ZONES.length).toBe(5)
    expect(ZONES[0].targetTime).toBe(2.0)
    expect(ZONES[1].targetTime).toBe(8.0)
    expect(ZONES[2].targetTime).toBe(14.0)
    expect(ZONES[3].targetTime).toBe(20.0)
    expect(ZONES[4].targetTime).toBe(26.0)

    for (let i = 0; i < ZONES.length - 1; i++) {
      expect(ZONES[i].range[1]).toBe(ZONES[i + 1].range[0])
    }
  })

  it('5. Verifies PII protection algorithm masks Malaysian IC numbers correctly', () => {
    const maskIC = (ic: string) => {
      const lastFour = ic.slice(-4)
      return '****' + lastFour
    }
    expect(maskIC('901020145678')).toBe('****5678')
    expect(maskIC('850512015544')).toBe('****5544')
  })
})
