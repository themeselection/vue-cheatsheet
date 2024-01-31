# Vue Router

## Basic Route Setup

```ts
// src/route/index.ts

const router = createRouter({
  ...
  routes: [
    {
      path: '/',
      name: 'home', // "home" will be route name
      component: () => import('./views/HomeView.vue') // Always lazy load route components
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
```

Use `RouterView` to render the matched component for the current route, and use `RouterLink` component to create links to navigate between routes.

```vue
<template>
 <nav>
   <RouterLink to="/">Home</RouterLink>

   <!-- Use route name via object syntax -->
   <RouterLink :to="{ name: 'about' }">About</RouterLink>
 </nav>
 <RouterView />
</template>
```

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

## Dynamic Routing

Dynamic routes are used to match a series of routes with some params to be acquired. (Denoted by **colon** `:` )

```ts
// src/router/index.ts

const router = createRouter({
  ...
  routes: [
    {
      path: '/product/:id', // [!code highlight]
      name: 'product',
      component: () => import('./views/ProductView.vue')
    }
  ]
})
```

``` vue
<!-- src/views/ProductView.vue -->

<script setup>
  import { useRoute } from 'vue-router'
  const products = [
      { id: 1, name: Computer },
      { id: 2, name: Laptop },
      ...
  ]

  const route = useRoute()
  const product = products.find(p => p.id === parseInt(route.params.id))
</script>

<template>
 <main>
    <h1>{{ product.name }}</h1>
 </main>
</template>
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

## Routes' Matching Syntax

```ts
const routes = [
  // matches /o/3549 or /o/books
  { path: '/o/:orderId' },
  
  // /:orderId -> matches only numbers
  { path: '/:orderId(\\d+)' },

  // /:productName -> matches anything else
  { path: '/:productName' },

  // /:chapters -> matches /one, /one/two, /one/two/three, etc
  { path: '/:chapters+' },

  // /:chapters -> matches /, /one, /one/two, /one/two/three, etc
  { path: '/:chapters*' },

  // Sensitive and strict route options: match /users/posva but not:
  // - /Users/posva because of sensitive: true
  { path: '/users/:id', sensitive: true },

  // - /users/posva/ because of strict: true
  { path: '/users/:id?', strict: true },

  // Optional parameters: match /users and /users/posva
  { path: '/users/:userId?' },
]
```

## Nested Routes

It is used when components that are nested with **multiple levels deep**.

```
/user/johnny/profile                     /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

```ts
// src/router/index.ts

const router = createRouter({
  ...
  routes: [
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('./views/ProductView.vue'),
      children: [
        {
          path: 'reviews',
          component: () => import('./views/ProductReviews.vue')
        },
        {
          path: 'variations',
          component: () => import('./views/ProductVariations.vue')
        },
      ]
    }
  ]
})
```

```vue
<!-- src/views/Product.vue -->

<template>
  <h1>{{ product.name }}</h1>
  ...
  <RouterView></RouterView>
</template>
```

## Named Views

```ts
// display multiple views at the same time
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

```vue
<template>
  <RouterView class="view left-sidebar" name="LeftSidebar"></RouterView>
  <RouterView class="view main-content"></RouterView>
  <RouterView class="view right-sidebar" name="RightSidebar"></RouterView>
</template>
```

[Working Demo](https://codesandbox.io/p/sandbox/named-views-vue-router-4-examples-rd20l?file=%2Fsrc%2Frouter.js%3A25%2C9)

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

## Passing Props to Route Components

```vue
<script setup lang='ts'>
const User = {
    // make sure to add a prop named exactly like the route param
    props: ['id'],
    template: '<div>User {{ id }}</div>'
  }
  
const routes = [
  // Boolean mode
  { 
    path: '/user/:id',
    component: User,
    props: true
  },

  // Object mode
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  },
    
  // Function mode
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
</script>

<!-- Via RouterView -->
<template>
  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      view-prop="value"
    />
  </RouterView>
</template>
```
