# Component

## Props

```vue
<!-- Child component -->
<script setup>
const props = defineProps(['title']) // [!code hl]
</script>

<template>
  <h4> {{ title }} </h4> // [!code hl]
</template>
```

```vue
<!-- Parent component -->
<script setup>
import Child from './Child.vue';
</script>

<template>
  <Child title="Vue 3" />
</template>
```

### Prop Validation

It ensures that components receive the right types of data, preventing errors by defining expected data types or custom validation functions for each prop.

```ts
const props = defineProps({
    fullName: {
        type: [String, Number] , // Data type
        required: true , // Boolean Value
        default: ... , // value can be passed as default
         validator: ... , // create a custom validation
    },
})
```

::: details Vue all Types

- **`String`**
- **`Number`**
- **`Boolean`**
- **`Array`**
- **`Object`**
- **`Date`**
- **`Function`**
- **`Symbol`**
:::

## Custom Events

```html{2,5}
<!-- Child Component (MyButton.vue) -->
<button @click="$emit('someEvent')">click me</button>

<!-- w/ parameters -->
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

```html
<!-- Parent Component -->
<MyButton @some-event="callback" />

<MyButton @increase-by="increaseCount" />
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
