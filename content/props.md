# Props

## Defining Props

```vue
<script setup lang="ts">
// Recommended way to define props
interface Props {
    title: string
    likes: number
}
defineProps<Props>()

// define props using Object
defineProps({
    title: String, 
    id: Number
})

// define props using Array
defineProps(['title', 'id'])

// Extending props with existing interface 
interface CustomProps extends Props {
    name: string
}
defineProps<CustomProps>()
</script>
```

## Prop Validation

We can validate prop using its types, required parameter, validator function. We can also pass default value to the prop.

```ts
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,

  // Multiple possible types
  propB: [String, Number],

  // Required string
  propC: {
    type: String,
    required: true
  },

  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },

  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },

  // Custom validator function
  // All props passed as 2nd argument in 3.4+
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },

  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory 
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  },

  // If you don't pass value to prop by default it will take false.
  propH: Boolean,

  // Change the default behavior of Boolean type prop.
  propI: {
    type: Boolean, 
    default: undefined,
  },

})
```

## Binding Props

```vue
<script setup lang="ts">
const propsData = {
  title: 'title',
  likes: 1,
  views: 1000
}

const id = ref(1)
const title = ref('vuexy')

</script>

<template>
    <!-- prop binding -->
    <MyComponent :title='title'></MyComponent>

    <!-- use v-bind directive prop to bind multiple props -->
    <MyComponent v-bind="propsData"></MyComponent>

    <!-- Same name shorthand (available in vue 3.4+) -->
    <Post :id :title />

    <!-- Boolean Casting -->

    <!-- equivalent of passing :disabled="true" -->
    <MyComponent disabled />

    <!-- equivalent of passing :disabled="false" -->
    <MyComponent />
</template>
```

## Two Way binding

```js
// two way binding with defineModel
const model = defineModel()

<input v-model="model" />

// making the v-model required
const model = defineModel({ required: true })

// providing a default value
const model = defineModel({ default: 0 })

// multiple v-model binding
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')

<input type="text" v-model="firstName" />
<input type="text" v-model="lastName" />

// Handling v-model modifier
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

<MyComponent v-model.capitalize="myText" />
```
