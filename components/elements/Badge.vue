<template>
      <span 
        v-if="status" 
        class="badge-status badge"
       :class="{
         'badge-light':status === 'Online',
         'badge-warning':status === 'Pending',
         'badge-info':status === 'Completed',
         'badge-danger':status === 'Cancelled',
         }"
       >
        <slot></slot>
      </span>
       <span 
       v-else-if="priority" 
       class="badge-priority badge"
       :class="{
         'badge-light':priority === 'Online',
         'badge-warning':priority === 'Pending',
         'badge-info':priority === 'Medium',
         'badge-danger':priority === 'Important',
         }"
       >
        <slot></slot>
      </span>
</template>

<script>
export default {
    props: {
        status: String,
        priority: String
    }
}
</script>

<style>

</style>