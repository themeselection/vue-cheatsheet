# Pinia

Pinia is a store library for Vue which allows you to share a state across components.

::: tip Note
We have used Composition API in this cheatsheet as it is recommended.
:::

::: info In Setup Stores

`ref()`s become state properties.

`computed()`s become getters.

`function()`s become actions.
:::

## Define Store

```js
export const useCounterStore = defineStore('counter', () => {

  // States 
  const count = ref(0)
  const name = ref('Eduardo')

  // Getters
  const doubleCount = computed(() => count.value * 2)

  // Actions
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

## Use store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()

// Another way to use the store
// Destructuring from the store

// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { name, doubleCount } = storeToRefs(store)

// the increment action can just be destructured
const { increment } = store

</script>
```

## States

### Define a state

```js
export const useCounterStore = defineStore('counter', () => {
  // States 
  const count = ref(0) // [!code hl]

  return { count }
})
```

### Accessing the States

```vue
<script setup>
  const store = useStore()
  console.log(store.count)
</script>
```

### Resetting the States

In Setup Stores, you need to create your own `$reset()` method

```js
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)

    function $reset() {
    count.value = 0
    }
})
```

### Mutating the state

We use `$patch` method for mutating the state.

```vue
<template>
    <button @click="store.$patch({ count: 12 })">patch</button>
</template>
```

### Replacing the state

```vue
<template>
    <button @click="store.$state = { count: 12 }">Replace</button>
</template>
```

### Subscribing to the state

You can watch the state and its changes through the `$subscribe()` method of a store.

```js
store.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('counter', JSON.stringify(state))
})
```

## Store computed Properties aka Getters

Getters are exactly the equivalent of computed values for the state of a Store.

### Define a Getter

```js
export const useCounterStore = defineStore('counter', () => {

  const count = ref(0)

  const doubleCount = computed(() => count.value * 2) // [!code hl]

  return { count, doubleCount  }
})
```

### Accessing Getters

```js
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

### Accessing Other Getters

```js
export const useCounterStore = defineStore('counter', () => {

    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    const doubleCountPlusOne = computed(() => doubleCount.value + 1) // [!code hl]

    return { count, doubleCount, doubleCountPlusOne}
})
```

### Accessing Other Store Getters

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {

  const otherGetter = computed(() => {
        const otherStore = useOtherStore()
        return state.localData + otherStore.data
  })
})
```

## Store methods aka Actions

Actions are the equivalent of methods in components.

### Defining an action

```js
export const useCounterStore = defineStore('counter', () => {

  const count = ref(0)

  function increment() { // [!code hl]
    count.value++ // [!code hl]
  } // [!code hl]

  return { count, increment }
})
```

### Accessing Actions

```vue
<script setup>
import { useCounterStore } from '@/stores/TaskStore.js';

const counterStore = useCounterStore()
</script>

<template>
    <button @click="counterStore.increment">increment</button>
</template>
```

### Accessing other store actions

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {

  const preferences = ref([])
  
  const fetchPreferences = () => {
    const auth = useAuthStore() 

    if(auth.isAuthenticated) 
      preferences = await fetchPreferences() 
    else
      throw new Error('User must be authenticated')
  }
  
})
```

## Plugin

A Pinia plugin is a function that optionally returns properties to be added to a store. It takes one optional argument, a context:

```js
export function myPiniaPlugin(context) {
  context.pinia // the pinia created with `createPinia()`
  context.app // the current app created with `createApp()` (Vue 3 only)
  context.store // the store the plugin is augmenting
  context.options // the options object defining the store passed to `defineStore()`
  // ...
}

pinia.use(myPiniaPlugin)
```

```js
import { markRaw } from 'vue'
// adapt this based on where your router is
import { router } from './router'

pinia.use(() => ({ hello: 'world' }))

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

pinia.use(({ store }) => {
  store.$subscribe(() => {
    // react to store changes
  })
  store.$onAction(() => {
    // react to store actions
  })
})
```
