<template>
  <div class="calendar">
      <page-header :title="'Calendar'" :showActions="true" :showBackButton="true"/>
      <div class="container">
          <client-only>
              <full-calendar/>
          </client-only>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>