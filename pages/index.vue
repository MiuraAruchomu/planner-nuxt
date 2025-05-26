<script setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user === undefined" class="placeholder" />
  <HeyThere v-else-if="!user && user !== undefined" />
  <ComingSoon v-else-if="user && user !== undefined" />
</template>

<style lang="scss" scoped>
.placeholder {
  height: 100dvh;
}
</style>
