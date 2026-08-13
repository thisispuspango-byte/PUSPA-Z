## 2024-05-30 - Memoizing static data mapping in Sidebar
**Learning:** Complex object reduction inside a render function causes unnecessary object creation and work on every render.
**Action:** Use `useMemo` for static array processing (like `navItems.reduce`) inside components that are rendered frequently or re-rendered.
