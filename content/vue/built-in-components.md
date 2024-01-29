# Built-in Components

## Transition

`<Transition>` :  It can be used to apply enter and leave animations on elements or components passed to it via its default slot.

![Transition Image](https://vuejs.org/assets/transition-classes.2BufuvZR.png)

```vue{9-11}
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>  // Applied fade transition
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9UstOwzAQ/BXjCyDRBKniUtKKh3qAAyDo0ZfgblO3jm3Zm7RV1X9nHUelSKineGdnxrMb7/mjc1nbAB/xIkivHLIA2LiJMKp21iPbMw8LdmALb2t2SdRLYYSR1gSiLu2GjSPhCn0D18IUeXIhPRUItdMlAlWMFd8NojXsQWol12PBe/VF/Ao+mdmq0lDkiZYkM1+aoFD1NSGOtQO16NWkWoLWtshjYOrmfwRFfhKAyoA7HY9ZOwCD4AelRNXCTYdoKFvoEbaPbnj0GjHrSqlwx26zu8CgDHAvzCGaHr3ifk6d0CaXXjlit0lCG+pi8BuOgda4UFW2CtbQH+j4gktbO6XBv7t4dxB8lJxir6RpN68dFjdOFyZcLkGu/8FXYRsxwT88BPAtCH7sYekrwNSefr3Bls7HZm3njSb2meYnBKubmDHRnhozp9gnvC7tS/eOlKlmYbpFoJX2Q8WgkXno+ILT23o+M/pv3GE27HS0T374AbBs70k=)

### Using Javascript Hooks

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"       
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

## TransitionGroup

`<TransitionGroup>`: It is designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

```vue{5-9}
<template>
  <button @click="insert">insert at random index</button>
  <button @click="reset">reset</button>

  <TransitionGroup tag="ul" name="list" class="container">
    <li v-for="item in items" class="item" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VMFu2zAM/RXCwJBkdZ10WS9eGmzriqEDthVbDwPqHjSbjtXKkmHRaYog/z5KStIka3syST0+PtKiltGnpknmHUZpNLF5KxsCi9Q100zLujEtwRJaLGEFZWtq6DG0l+lM50ZbghnSpZYkhbokrC2cQX8AZ1O4OYnhXQzjGN7HcHq7gcs1iAn7B6n9wSDTChlTMMADk7lQHSYK9YwqOIITV7fsdE7SaJDaYktcbplpgDU/p34XVCWt6XTRD6bQhakZ9/YZVq4Je2HbKJljX8YwilnK0REjVnt1W+T5bMrupHLp/1rykNf68dSTYRg8j5wdRjZKELIHMPnbEXHRjznLuj/LotB1Fk2DAYIgNMjzKHAxGYaE55O9dM713x2oB18zj2XxRn/l6TVAYsYpncoi0KJGtpW0nA25EtayyyMnITW2zOgYmENJmB+XpnVCuQ/WFDrfyXI+u+k9Pm69dTrAcunxsOK5eMKhkqGV4YE8jk6GO6Ni19KjcmbiKfzveZAFVSmcjEZvPji/QjmrKIXxqFlwwE8/cW0doyZsjwX/4jnGm6BCMcd1MBDSVkUKQikYJacWUFgMbLtcbl0OmMgEFtOIXNJjCiOvypPy1Oo0mK6lP32ncRBo+YL43qI4IstjL+UsubNG8856Pvcv6kYqbH82ThvPOw2V3BnrNA/ffIzaznUX4nmF+f0z8Tu7cLEsunL3pJ1jFm3PSLR8ycPxxe8fuGB7e1ibolOMfuXwF1qjOqcxwD7zmrLsHZxXe+lfHqln1/ZiQcgjXzflhDrkyuOziF+j81daf5I7TsY+j+fJUzyvpCpeePXCS9K0pnEvVYElX/Er5/VveiRJYe+W9/rFnZ0Ucv7CikwqFAW2zrLK0GatQpQRzMlhf7OfkDXnbzKmX7AUnSL32vFUeIW3CRtYaQxfvsMSIbpf4gk5ZMn7+xSt/gH4Zxci)

## KeepAlive

`<KeepAlive>`: It allows us to conditionally cache component instances when dynamically switching between multiple components.

::: code-group

```vue{13-15} [App.vue]
<script setup>
  import { shallowRef } from 'vue'
  import CompA from './CompA.vue'
  import CompB from './CompB.vue'

  const current = shallowRef(CompB)
</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <KeepAlive>
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>
```

```vue [CompA.vue]
<script setup>
  import { ref } from 'vue'

  const count = ref(0)
</script>

<template>
  <p>Current component: A</p>
  <span>count: {{ count }} </span>
  <button @click="count++">Increase Count</button>
</template>
```

```vue [CompB.vue]
<script setup>
  import { ref } from 'vue'

  const msg = ref('')
</script>

<template>
  <p>Current component: B</p>
  <span>Message is: </span>
  <input v-model="msg">
</template>
```

:::

[Try it in the Playground](https://play.vuejs.org/#eNqtU01vnDAQ/SuWL5sq6VIpN0RQlyiHtOqH0h65EJglToxt+YNuhfjvHdssYbf5kKLc8Jvn8XvzhoFulFr3DmhKM1NrpiwxYJ3KS0EI65TUlgzE3FWcyz83sCUj2WrZkRXeWS04l7JTm6m0TsLJtz2mFAeUYqJ4Ui2FsaR2WoOw5GLx5EmgfihFlkSFqA0PFjrFKwtBadawntS8MuaipA10sqQBxwqvboHnGRPKWWL/KkCGrhqGFNJ/7GQDHJHpYcTSvuLOk4IJBJKcbLIktnmPnkXsWRz1/AqgNpz10VCAamRL4eeRMm9sbphnyVzb308OG2QJjgS/smQxKHoWXb2euP4v6kVI0oWIkHPy6ZVcVH45RToLTv0443OZUZXIQ7+UDMPUeRxRfagEzq2zVgryueasfvBT8KTTU5zCtag1VAZwtRDKksh8xnRYtreb7kw7WV6t3uIZ4156/gbGVC0QZtIDs3GlHncInw2rfOzIGpS1Ze363kiBrgZ/28+mU4yD/qEsQ9klxbHG/Shp+J++BMxqB2d7vL6D+uEJ/N7sPFbSnxoM6B5KOtdspVvARfTlq1/fYYffcxG1O47sF4o3YCR3XmOkFU40KHvBC2qvQzJMtL/N1c6CMHtTXqhnjoFfUkzLZ/yc9Ue55+vzcK8UIx3/AY/eq8Q=)

## Teleport

The `<teleport>` component in Vue.js allows you to render a component's HTML in a different part of the DOM than where the component is declared.

```vue
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

## Suspense

`<Suspense>` is a built-in component for orchestrating async dependencies in a component tree. It can render a `loading state` while waiting for multiple nested async dependencies down the component tree to be resolved.

```vue
<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <Dashboard />

    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

### Combining Suspense with other components

```vue
<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>
```
