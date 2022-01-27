<template>
  <b-badge variant="light" v-if="status === 'Online'">
    <slot></slot>
  </b-badge>
   <b-badge variant="info" v-else-if="status === 'Completed'">
    <slot></slot>
  </b-badge>
   <b-badge variant="danger" v-else-if="status === 'Canceled'">
    <slot></slot>
  </b-badge>
   <b-badge variant="warning" v-else-if="status === 'Pending'">
    <slot></slot>
  </b-badge>
</template>

<script>
export default {
    props: {
        status: String
    }
}
</script>

<style>

</style>