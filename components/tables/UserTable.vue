<template>
  <div class="table-responsive">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field">
            {{ field }}
          </th>
        </tr>
      </thead>
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  props: {
    fields: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
