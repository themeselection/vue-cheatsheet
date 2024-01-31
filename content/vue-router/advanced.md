# Advanced

## Scroll Behavior

With client-side routing, we might want to scroll to the top on a new route, or keep the scroll position like a real page reload.

```ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    return { top : 0 }

    // always scroll 10px above the element #main
    return { el: '#main', top: 10 }

    // Returning the savedPosition
    return (savePosition ? savedPosition : { top : 0 })

    // "scroll to anchor" behavior & "scroll behavior to smooth"
    if (to.hash)
      return { el: to.hash, behavior: 'smooth' }
    
    // Delaying the scroll
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  }
})
```

## Navigation Guards & Navigation Flow

They are primarily used to guard navigations either by redirecting it or canceling it.

1. Navigation triggered.
2. Call `beforeRouteLeave` guards in deactivated components.
3. Call global `beforeEach` guards.
4. Call `beforeRouteUpdate` guards in reused components.
5. Call `beforeEnter` in route configs.
6. Resolve async route components.
7. Call `beforeRouteEnter` in activated components.
8. Call global `beforeResolve` guards.
9. Navigation is confirmed.
10. Call global `afterEach` hooks.
11. DOM updates triggered.
12. Call callbacks passed to `next` in `beforeRouteEnter` guards with instantiated instances.

## Transitions

```vue
<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
```

### Per-Route Transition

```ts
// Apply different transitions on each route's.

const routes = [
  {
    path: '/custom-transition',
    component: PanelLeft,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/other-transition',
    component: PanelRight,
    meta: { transition: 'slide-right' },
  },
]
```

```vue
<template>
  <RouterView v-slot="{ Component, route }">
    <!-- Use a custom transition or fallback to `fade` -->
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
```
