# Vue Basic

## Data binding

```html
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World!')
const htmlContent = ref('<h1>In Heading Tag</h1>')
</script>

<template>
  <!-- Render `msg` variable -->
  <p>{{ msg }}</p>  // [!code hl]

  <!-- Bind HTML instead of string. Similar to `.innerHTML` -->
  <div v-html="htmlContent"></div> // [!code hl]
</template>
```

## Attribute Bindings

```vue
<!-- Passing `dynamicId` as attribute -->
<div v-bind:id="dynamicId"></div>

<!-- `:id` is a Shorthand of `v-bind:id` -->
<div :id="dynamicId"></div>

<!-- It can be passed directly without specifying a value, using the same name as the attribute. -->
<div v-bind:id></div>

<!-- `:id` is a Shorthand of `v-bind:id` -->
<div :id></div>
```

### Event Bindings

```vue
<!-- method handler -->
<button v-on:click="doThis"></button>

<!-- shorthand -->
<button @click="doThis"></button>
```

::: info
Furthermore, we'll exclusively use shorthand notation
:::

### Boolean Attributes

```vue
<script setup>
import { ref } from 'vue'

const isButtonDisabled = ref(true)
</script>

<template>
  <button :disabled="isButtonDisabled">Button</button> // [!code hl]
</template>
```

### Dynamically Binding Multiple Attributes

```vue
<script setup>
const inputAttrs = {
  id: 'container',
  class: 'wrapper'
}
</script>

<template>
  <!-- Bind Multiple attributes by using a single variable -->
  <div v-bind="inputAttrs"></div> // [!code hl]
</template>
```

## Using JavaScript Expressions

```vue
<script setup>
import { ref } from 'vue';

const message = ref('Hello')
const number = 5
const ok = true
const id = 'wrapper'

</script>

<template>
  <!-- Mustache can have `JavaScript Expression` -->
  {{ number + 1 }}

  {{ ok ? 'YES' : 'NO' }}

  {{ message.split('').reverse().join('') }}

  <div :id="`list-${id}`">JavaScript Expression</div>
</template>
```

## Directives

![Directive-Structure](https://vuejs.org/assets/directive.7WSr6AKH.png)

::: details Vue all Directives with their API
<https://vuejs.org/api/built-in-directives.html>
:::

```vue
<!-- Bind HTML instead of string. Similar to `.innerHTML` -->
<div v-html="htmlContent"></div>

<!-- bind an attribute -->
<img v-bind:src="imageSrc" />

<!-- conditionally displaying an element -->
<h1 v-show="ok">Hello!</h1>

<!-- Conditionally rendering the element -->
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else-if="type === 'C'"> C </div>
<div v-else> Not A/B/C </div>

<!-- Render element or template multiple times -->
<div v-for="(item, index) in items"> {{ item }} </div>

<!-- Render the element and component once only, and skip future updates. -->
<span v-once>This will never change: {{msg}}</span>

<!-- Two-way data binding: -->
<input v-model="firstName" />

<!-- method handler -->
<button v-on:click="doThis"></button>

<!-- `Dynamic Arguments`: They are denoted by 'square brackets' after the directive name. -->
<a @[eventName]="doSomething"> ... </a>

<!-- `Modifiers`: They are special postfixes denoted by 'dot'. -->
<form @submit.prevent="onSubmit"> ... </form>
```

::: info `v-if` vs. `v-show`
`v-if`: Use when the condition is unlikely to change often.

`v-show`: Use when you need to toggle frequently.
:::

### Example: Quick review of using 'v-for' with arrays and objects

```vue
<script setup>
import { ref } from 'vue'

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

const myObject = ref({
  title: 'How to do lists in Vue',
  author: 'John Doe',
  publishedAt: '2016-04-10'
})
</script>

<template>
<!-- Array -->
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} - {{ item.message }}
  </li>
</ul>

<!-- Array w/ Destructure -->
<ul>
  <li v-for="({ message }, index) in items" :key="index">
    {{ index }} - {{ message }}
  </li>
</ul>

<!-- Object -->
<ul>
  <!-- v-for="value in myObject" -->
  <!-- v-for="(value, key) in myObject" -->
  <li v-for="(value, key, index) in myObject" :key="index">
    {{ index }}. {{ key }}: {{ value }}
  </li>
</ul>
</template>
```

## Template Refs

Give access to DOM elements.

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => input.value.focus())
</script>

<template>
  <input ref="input" />
</template>
```
