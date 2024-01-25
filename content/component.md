# Component

## Register Component

### Global Registration

```ts
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)

// We can chain component method
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Now `MyComponent` is globally available. We can use it in any component like below:

```vue
<MyComponent />
```

### Local Registration

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Defining a Component

There are several ways to define a component in vue js. We have listed all below

### 1. SFC

```ts
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

### 2. defineComponent

```ts
import { ref, h, defineComponent } from 'vue'

const Comp = defineComponent(
  (props) => {

    return () => {
      return h('div', props.title)
    }
  },
  {
    props: {
      title: String,
    }
  }
)

export default Comp
```

### 3. defineAsyncComponent

```ts
defineAsyncComponent(() => import('@/components/TestCompo.vue'));
```

## Slots

### Basic slot

```html{4}
<!-- Child Component (MyButton.vue) -->
<div>
  Hello World
  <slot></slot>
</div>
```

```html
<!-- Parent Component -->
<my-button>
  This content will replace the slot
</my-button>
```

### Named Slot

```html{4,7,10}
<!-- Child Component (MyButton.vue) -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot>Default content</slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<!-- Parent Component -->
<Child>
  <template v-slot:header><h1>Title</h1></template>
  <p>The main content.</p>
  <template v-slot:footer><p>Footer</p></template>
</Child>
```

## Provide & Inject

![Provide and Inject](https://vuejs.org/assets/provide-inject.tIACH1Z-.png)

::: code-group

```vue{2,8} [Parent.vue]
<script setup>
import { ref, provide } from 'vue'
import Child from './Child.vue'

// by providing a ref, the GrandChild
// can react to changes happening here.
const message = ref('hello')
provide('message', message)
</script>

<template>
  <input v-model="message">
  <Child />
</template>
```

```vue [Child.vue]
<script setup>
import GrandChild from './GrandChild.vue'
</script>

<template>
  <GrandChild />
</template>
```

```vue{2,4} [GrandChild.vue  ]
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    Message to grand child: {{ message }}
  </p>
</template>
```

:::
