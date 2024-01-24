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

// define Props using Object
defineProps({
    title: String, 
    id: Number
})

// define Props using Array
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
  // full props passed as 2nd argument in 3.4+
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

  // Absent Boolean prop will cast to false 
  propH: Boolean,

//   Change the default behavior of Boolean prop to set absent value to false by setting the default value
  propI: {
    type: Boolean, 
    default: undefined,
  }  ,

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
    <!-- Prop binding -->
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
