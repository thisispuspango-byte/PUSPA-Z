import { describe, it, expect } from 'vitest'
import { MariaStoryboardManager, mariaStoryboard } from './maria-storyboard'

describe('Maria Storyboard Manager State Machine', () => {
  it('should start in idle state', () => {
    const manager = new MariaStoryboardManager()
    expect(manager.getCurrentState()).toBe('idle')
    expect(manager.getPoseConfig().blendshapePreset).toBe('neutral')
  })

  it('should transition to speaking state with happy blendshape', () => {
    const manager = new MariaStoryboardManager()
    const pose = manager.transitionTo('speaking')
    expect(manager.getCurrentState()).toBe('speaking')
    expect(pose.blendshapePreset).toBe('happy')
    expect(pose.expressionIntensity).toBe(0.8)
  })

  it('should transition to thinking state', () => {
    const pose = mariaStoryboard.transitionTo('thinking')
    expect(mariaStoryboard.getCurrentState()).toBe('thinking')
    expect(pose.blendshapePreset).toBe('thinking')
  })
})
