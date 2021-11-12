<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
input::-webkit-input-placeholder {
  color: #aaa;
  font-size: 14px;
}
textarea::-webkit-input-placeholder {
  color: #aaa;
  font-size: 14px;
}
img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
