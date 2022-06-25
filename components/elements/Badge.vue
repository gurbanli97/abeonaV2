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
      validator: value => [
        'status',
        'priority',
        'document'
      ].includes(value)
    },
    text: String
  },
  computed: {
    className () {
      switch (this.category) {
        case 'status':
          return {
            'Online': 'light',
            'Pending': 'warning',
            'Completed': 'info',
            'Cancelled': 'danger',
            'Processing': 'warning',
            'Rejected': 'danger',
            'Obtained': 'success',
            'Applied': 'info',
            'todo': 'warning',
            'done': 'success'
          }[this.text]
        case 'priority':
          return {
            'Online': 'light',
            'Pending': 'warning',
            'Medium': 'info',
            'Important': 'danger'
          }[this.text]
           case 'document':
          return {
            'Copy': 'danger',
            'Original': 'warning',
            'Translated': 'success',
          }[this.text]
      }
    },
  }
}
</script>

<style>

</style>