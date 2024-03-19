<template>
  <div class="test">Test</div>
</template>

<style scoped lang="scss">
.test {
  color: lightblue;
}
@media (prefers-color-scheme: dark) {
  .test {
    color: grey;
  }
}
</style>
