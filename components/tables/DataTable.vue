<template>
  <div class="table-responsive">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field">
            {{ field }}
          </th>
          <th v-if="withActions"></th>
        </tr>
      </thead>
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    withActions: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
