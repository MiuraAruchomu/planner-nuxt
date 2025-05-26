<script setup>
const modalsStore = useModalsStore();
</script>

<template>
  <div class="habit-tracker-add-button">
    <button @click="modalsStore.openModal('new-habit')" />
  </div>
</template>

<style lang="scss" scoped>
.habit-tracker-add-button {
  position: absolute;
  bottom: 3dvh;
  right: 4dvw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  backdrop-filter: blur(3px);

  @include mediaTablet {
    right: 3dvh;
  }

  button {
    width: 35px;
    height: 35px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 1.5px;
      background: $main_font;
      border-radius: 5px;
      transform-origin: center;
    }

    &::before {
      left: 20.5px;
      transform: rotate(-90deg);
    }

    &::after {
      left: 20.5px;
    }
  }
}
</style>
