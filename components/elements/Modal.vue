<template>
  <div v-if="toggle" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-info">
        <img src="/warning.svg" alt="" />
        <h2>Are you sure to delete this item?</h2>
        <span>If you delete it, you can’t bring it again</span>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('modal-delete-click', item)">Yes, delete</button>
        <button class="btn" @click="handleBackdropClick">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey)
  },
  updated() {
    if (this.toggle) {
      document.querySelector('body').classList.add('modal-active')
    } else {
      document.querySelector('body').classList.remove('modal-active')
    }
  },
  beforeDestroy() {
    document.querySelector('body').classList.remove('modal-active')
    window.removeEventListener('keydown', this.handleEscapeKey)
  },
  methods: {
    handleEscapeKey(e) {
      if (this.toggle && e.key === 'Escape') {
        this.$emit('close')
      }
    },
    handleBackdropClick() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
