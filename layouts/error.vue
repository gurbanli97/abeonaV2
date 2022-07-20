<template>
  <div class="error">
    <div class="container">
      <div class="error-inner">
        <img src="/images/404.svg" alt="" />
        <h2>Oops! Page not found</h2>
        <p>Ibrahim, internet niye islemir? :(</p>
        <button class="btn btn-transparent" @click="$router.go(-1)">Go back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
}
</script>
