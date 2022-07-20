<template>
  <i :class="'icon-' + name" aria-hidden="true"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
