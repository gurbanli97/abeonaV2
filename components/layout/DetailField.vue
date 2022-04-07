<template>
    <div class="detail-field">
        <span>{{label}}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        }
    }

}
</script>

<style>

</style>