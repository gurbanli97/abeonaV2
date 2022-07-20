<template>
  <div @click.prevent="$emit('delete-filter')">
    <b-form-group :label="label" :class="{ 'query-field': inputStyle === 'query-field' }">
      <icon v-if="inputStyle === 'query-field'" :name="'close'" />

      <b-form-input
        v-model="fieldValue"
        disabled
        autocomplete="off"
        :type="type"
        :placeholder="placeholder"
        :class="{
          'is-invalid': isInvalid,
          'has-error': hasError,
          'has-success': hasSuccess,
        }"
      />
      <slot></slot>
    </b-form-group>
  </div>
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
    inputStyle: {
      type: String,
      default: 'default',
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
}
</script>
