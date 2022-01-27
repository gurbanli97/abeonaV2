<template>
  <b-form-group :label="label" :class="{'search-input': placeholder === 'Search'}">
    <icon :name="'search-normal-1'" v-if="placeholder === 'Search'"/>
    <b-form-input
      autocomplete="off"
      v-model="fieldValue"
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
</template>

<script>
export default {
  name: "FormField",
  props: {
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    hasSuccess: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fieldValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
}
</script>
