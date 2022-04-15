<template>
  <div class="root">
      <section class="page" :class="{'is-login':$route.path === '/login'}">
            <nuxt keep-alive />
      </section>
  </div>
</template>

<script>

export default {
  name: "EmpyLayout",
}
</script>
