<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>

    <input
      v-if="password"
      type="password"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <input
      v-else
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "placeholder", "password", "modelValue"],
};
</script>

<style scoped>
label {
  font-size: 14px;
}
</style>
