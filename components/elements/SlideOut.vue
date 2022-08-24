<template>
  <div :class="['slideout-overlay', { active: slideIsActive }]" @click.self="$emit('close-slide')">
    <div :class="['slideout-content', { active: slideIsActive }]">
      <div class="slideout-content-head">
        <h2>{{ title }}</h2>
        <slot name="head"></slot>
        <button @click="$emit('close-slide')">
          <icon :name="'close-circle'" />
        </button>
      </div>
      <div class="slideout-content_forms">
        <div class="slideout-forms-inner">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slideIsActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey)
  },
  updated() {
    if (this.slideIsActive) {
      document.querySelector('body').classList.add('slideout-active')
    } else {
      document.querySelector('body').classList.remove('slideout-active')
    }
  },
  beforeDestroy() {
    document.querySelector('body').classList.remove('slideout-active')
    window.removeEventListener('keydown', this.handleEscapeKey)
  },
  methods: {
    handleEscapeKey(e) {
      if (this.slideIsActive && e.key === 'Escape') {
        this.$emit('close-slide')
      }
    },
  },
}
</script>

<style></style>
