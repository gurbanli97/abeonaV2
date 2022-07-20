<template>
  <div class="detail-field">
    <span v-if="label">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
