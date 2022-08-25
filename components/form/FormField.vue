<template>
  <b-form-group :label="label" :class="{ 'search-input': type === 'search' }">
    <span v-if="type === 'search'"><icon name="search-normal-1" /></span>
    <b-form-input
      v-model="fieldValue"
      autocomplete="off"
      :type="type"
      :placeholder="placeholder"
      :class="{
        'is-invalid': isInvalid,
        'has-error': hasError,
        'has-success': hasSuccess,
      }"
    />
    <span v-if="type === 'search' && fieldValue" id="clear-search" @click.stop="clearSearchValue">
      <icon name="close-circle-2" />
    </span>
    <slot></slot>
  </b-form-group>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    hasSuccess: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fieldValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    clearSearchValue() {
      this.fieldValue = ''
    },
  },
}
</script>
