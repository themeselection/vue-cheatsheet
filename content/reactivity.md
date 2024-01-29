# Reactivity

## `ref()`

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays.

```ts
const count = ref(0);

console.log(count.value); // 0

count.value = 10; // Will update the DOM as well

console.log(count.value); // 10
```

## `reactive()`

Unlike a ref which wraps the inner value in a special object, reactive() makes an object itself reactive.

```ts
const state = reactive({ count: 1 });

console.log(state); // {count: 1}
console.log(state.count); // 1
```

## `shallowRef()`

The inner value of a `shallowRef` is stored and exposed as-is, and will not be made deeply reactive

```ts
const state = shallowRef({ count: 1 })

// does NOT trigger change
state.value.count = 2

// does trigger change
state.value = { count: 2 }
```

## Computed Property

```vue
<script setup>
const value = ref(5);

const doubleValue = computed(() => value.value * 2); // [!code hl]
</script>

<template>
  <div>
    <p>Original value: {{ value }}</p>
    <p>Computed value: {{ doubleValue }}</p>
  </div>
</template>
```

## Class and Style Bindings

```vue{21-24,27,30,33,36}
<script setup>
import { ref } from "vue";

const isActive = ref(true);
const hasError = ref(false);

const activeClass = ref("active");
const errorClass = ref("text-danger");

const activeColor = ref("red");
const fontSize = ref(30);

const styleObject = reactive({
  color: "red",
  fontSize: "13px",
});
</script>

<template>
  <!-- Class Binding -->
  <div 
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>

  <!-- Binding class using Array -->
  <div :class="[activeClass, errorClass]"></div>

  <!-- toggle a class in the list conditionally -->
  <div :class="[isActive ? activeClass : '', errorClass]"></div>

  <!-- Style Binding -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

  <!-- Multiple Style Binding -->
  <div :style="styleObject"></div>

  <!-- style binding using v-bind -->
  <div class='error-text'></div>
</template>

<style scoped>
/* dynamically bind color */
.error-text{
  color: v-bind(error-color)
}
</style>
```

::: tip
When a `<style>` tag has the scoped attribute, its CSS will apply to elements of the current component only.
:::

## Events

```vue
<button @click="addToCart"> ... </button>

<!-- Arguments can be passed -->
<button @click="addToCart(product)"> ...  </button>

<!-- To prevent default behavior (e.g. page reload) -->
<form @submit.prevent="addProduct"> ... </form>

<!-- Only trigger once -->
<img @mouseover.once="showImage" />

<!-- Keyboard entry example -->
<input @keyup.enter="submit" /> 

<!-- Call execute when `Ctrl+C` is pressed -->
<input @keyup.ctrl.c="onCopy">
```

::: details Vue all Modifiers

------- ***Key Modifiers*** -------  

- **`.tab`**  
- **`.delete`**  
- **`.esc`**  
- **`.space`**  
- **`.up`**  
- **`.down`**  
- **`.left`**  
- **`.right`**  
- **`.ctrl`**  

------- ***Mouse Modifiers*** -------  

- **`.left`**  
- **`.right`**  
- **`.middle`**  
:::

## Watchers

```ts

// Watcher
watch(myProperty, (newValue, oldValue) => {
  console.log(`myProperty changed from ${oldValue} to ${newValue}`);
});

// ----- By using Getter -----
watch(
  () => obj.count,
  (count) => console.log(`count is: ${count}`)
)

// ------ array of multiple sources ------
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

## `WatchEffect()`

```ts
import { ref, watchEffect } from 'vue';

const site = ref('vue.org');

watchEffect(() => {
  console.log(site.value);
});

// Expose site for template usage
const siteData = site;
```

::: info `watch` vs. `watchEffect`
**watch** and **watchEffect** are both used for reactive side effects in Vue.js.

- **`watch`**: Precisely tracks only explicitly specified data changes and triggers the callback only when those changes occur.

- **`watchEffect`**: Automatically tracks all accessed reactive properties during its execution, combining dependency tracking and side effect in one step.
:::

## Utilities

```ts
const counter = ref(true)

// isRef() -- checks if counter is ref, returns true
console.log(isRef(counter))

// unRef() -- returns inner value of ref
console.log(unRef(counter))

// toRef() -- returns existing refs as-is
toRef(existingRef)

// creates a readonly ref that calls the getter on .value access
toRef(() => props.foo)

// creates normal refs from non-function values
// equivalent to ref(1)
toRef(1)

// toValue() -- normalizes values / refs / getters to values
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1

// toRefs() -- Converts a reactive object to object where each property of object is a ref.
const state = reactive({
    foo: 1,
    bar: 2
})

const stateAsRefs = toRefs(state)

// nextTick() -- A utility for waiting for the next DOM update flush.
async function increment() {
  count.value++

  // DOM not yet updated
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM is now updated
  console.log(document.getElementById('counter').textContent) // 1
}
```
