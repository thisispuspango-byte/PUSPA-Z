import { describe, it, expect } from 'vitest'
import {
  roleHierarchy,
  canAccessView,
  getRequiredRole,
  getViewAccessMap,
  Role,
} from './access-control'
import type { ViewId } from './store'

describe('Access Control Utilities', () => {
  it('should define correct role hierarchy levels', () => {
    expect(roleHierarchy.staff).toBe(1)
    expect(roleHierarchy.admin).toBe(2)
    expect(roleHierarchy.developer).toBe(3)
    expect(roleHierarchy.developer).toBeGreaterThan(roleHierarchy.admin)
    expect(roleHierarchy.admin).toBeGreaterThan(roleHierarchy.staff)
  })

  it('should correctly evaluate staff access permissions', () => {
    expect(canAccessView('dashboard', 'staff')).toBe(true)
    expect(canAccessView('members', 'staff')).toBe(true)
    expect(canAccessView('cases', 'staff')).toBe(true)
    expect(canAccessView('reports', 'staff')).toBe(false)
    expect(canAccessView('admin', 'staff')).toBe(false)
    expect(canAccessView('ai', 'staff')).toBe(false)
  })

  it('should correctly evaluate admin access permissions', () => {
    expect(canAccessView('dashboard', 'admin')).toBe(true)
    expect(canAccessView('reports', 'admin')).toBe(true)
    expect(canAccessView('compliance', 'admin')).toBe(true)
    expect(canAccessView('ekyc', 'admin')).toBe(true)
    expect(canAccessView('ai', 'admin')).toBe(false)
  })

  it('should allow developer role full access to all views', () => {
    const allViews: ViewId[] = [
      'dashboard',
      'members',
      'cases',
      'reports',
      'admin',
      'ai',
      'settings',
    ]
    for (const view of allViews) {
      expect(canAccessView(view, 'developer')).toBe(true)
    }
  })

  it('should return default staff required role for unknown views', () => {
    expect(getRequiredRole('dashboard')).toBe('staff')
    expect(getRequiredRole('reports')).toBe('admin')
    expect(getRequiredRole('ai')).toBe('developer')
    // @ts-expect-error testing fallback
    expect(getRequiredRole('unknown-view')).toBe('staff')
  })

  it('should return a clean copy of view access map', () => {
    const map = getViewAccessMap()
    expect(map.dashboard).toBe('staff')
    expect(map.reports).toBe('admin')
    expect(map.ai).toBe('developer')
  })
})
