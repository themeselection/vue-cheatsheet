# Redirect and Alias

## Programmatic Navigation

Aside from using `<RouterLink>` to create anchor tags for declarative navigation, we can do this programmatically using the router's instance methods.

| Declarative        |      Programmatic      |
| ------------- | :-----------: |
| `<RouterLink :to="...">`   | `router.push(...)` |
| `<RouterLink :to="..." replace>`  | `router.replace(...)`    |
| `window.history.go(n)`  |   `router.go(1)`    |

The argument can be a string path, or a location descriptor object.

```ts
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.replace({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.replace({ path: '/about', hash: '#team' })

// go forward by one record, the same as router.forward()
router.go(1)

// go back by one record, the same as router.back()
router.go(-1)
```

## Redirect

Redirecting is also done in the routes configuration. To redirect from /home to /:

```ts
const router = createRouter({
  ...
  routes: [
    {
      path: '/home',
      redirect: '/',
    },
    // targeting a named route
    {
      path: '/home',
      redirect: { name: 'homepage' },
    }
  ]
})
```

## Catch all / 404 Not found Route

```ts {6,12}
const router = createRouter({
  ...
  routes: [
    // will match everything and put it under `$route.params.pathMatch`
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue')  // Component
    },
    // will match anything starting with `/user-` and put it under `$route.params.afterUser`
    {
      path: '/user-:afterUser(.*)',
      component: () => import('./views/UserGeneric.vue')  // Component
    }
  ]
})
```

## Alias

```ts
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      /* 
        this will render the UserDetails for these 3 URLs
          - /users/24
          - /users/24/profile
          - /24 
      */
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

::: info `Redirect` vs. `Alias`

A redirect means when the user visits `/home`, the URL will be replaced by `/`, and then matched as `/`.

An alias of `/` as `/home` means when the user visits `/home`, the URL remains `/home`, but it will be matched as if the user is visiting `/`.

:::

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
