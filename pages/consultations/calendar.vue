<template>
  <div class="calendar">
    <page-header :title="'Calendar'" :show-actions="true" :show-back-button="true" />
    <div class="container">
      <client-only>
        <full-calendar />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {}
</script>
