/**
 * Maria Puspa AI Character — Storyboard & Posture State Machine
 */

export type MariaState = 'idle' | 'thinking' | 'speaking' | 'action' | 'listening'

export interface MariaPoseConfig {
  vrmAnimation: string
  blendshapePreset: 'neutral' | 'happy' | 'thinking' | 'blink'
  expressionIntensity: number
}

const POSE_MAP: Record<MariaState, MariaPoseConfig> = {
  idle: {
    vrmAnimation: 'idle_gentle',
    blendshapePreset: 'neutral',
    expressionIntensity: 0.3,
  },
  listening: {
    vrmAnimation: 'listen_attentive',
    blendshapePreset: 'neutral',
    expressionIntensity: 0.5,
  },
  thinking: {
    vrmAnimation: 'think_thoughtful',
    blendshapePreset: 'thinking',
    expressionIntensity: 0.7,
  },
  speaking: {
    vrmAnimation: 'speak_gesturing',
    blendshapePreset: 'happy',
    expressionIntensity: 0.8,
  },
  action: {
    vrmAnimation: 'action_presenting',
    blendshapePreset: 'happy',
    expressionIntensity: 0.9,
  },
}

export class MariaStoryboardManager {
  private currentState: MariaState = 'idle'

  public transitionTo(newState: MariaState): MariaPoseConfig {
    this.currentState = newState
    return POSE_MAP[newState]
  }

  public getCurrentState(): MariaState {
    return this.currentState
  }

  public getPoseConfig(state: MariaState = this.currentState): MariaPoseConfig {
    return POSE_MAP[state] || POSE_MAP.idle
  }
}

export const mariaStoryboard = new MariaStoryboardManager()
