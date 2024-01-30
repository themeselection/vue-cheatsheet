# Vue Router

## Basic Route Setup

```ts
// src/route/index.ts

const router = createRouter({
  ...
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue')
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
   <RouterLink to="/about">About</RouterLink>
 </nav>
 <RouterView />
</template>
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

## Nested Route

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
