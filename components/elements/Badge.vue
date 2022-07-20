<template>
  <span :class="['badge', `badge-${category}`, `badge-${className}`]">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      validator: (value) => ['status', 'priority', 'document'].includes(value),
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    className() {
      switch (this.category) {
        case 'status':
          return {
            Online: 'light',
            Pending: 'warning',
            Completed: 'info',
            Cancelled: 'danger',
            Processing: 'warning',
            Rejected: 'danger',
            Obtained: 'success',
            Applied: 'info',
            'To Do': 'warning',
            Done: 'success',
            Doing: 'info',
            Review: 'light',
          }[this.text]
        case 'priority':
          return {
            Online: 'light',
            Pending: 'warning',
            Medium: 'info',
            Important: 'danger',
          }[this.text]
        case 'document':
          return {
            Copy: 'danger',
            Original: 'warning',
            Translated: 'success',
          }[this.text]
        default:
          return ''
      }
    },
  },
}
</script>

<style></style>
