<template>
  <div :class="['slideout-overlay', { active: slideIsActive }]" @click.self="$emit('close-slide')">
    <div :class="['slideout-content', { active: slideIsActive }]">
      <div class="slideout-content_head">
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      taskList: 'orders/order_tasks',
    }),
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey)
  },
  beforeDestroy() {
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
