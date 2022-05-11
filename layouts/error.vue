<template>
  <div class="error">
    <div class="container">
        <div class="error-inner">
            <img src="/images/404.svg" alt="">
            <h2>Oops! Page not found</h2>
            <p>You didn't break the internet, but we can't find what you are looking for.</p>
            <button class="btn btn-transparent" @click="$router.go(-1)">Go back</button>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ErrorLayout",
}
</script>
