<template>
 <div @click.prevent="$emit('delete-filter')">
    <b-form-group :label="label" 
    :class="{'query-field': inputStyle === 'query-field'}" 
    >
    <icon :name="'close'" v-if="inputStyle === 'query-field'"/>
    
    <b-form-input
      disabled
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
 </div>
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
    },
    inputStyle: {
      type: String,
      default: "default"
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
  },
}
</script>
