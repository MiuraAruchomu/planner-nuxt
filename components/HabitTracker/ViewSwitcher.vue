<script setup>
const habitsStore = useHabitsStore();
const { viewSwitcherItems, activeHabitTrackerView } = storeToRefs(habitsStore);

const activeIndex = computed(() => {
  return activeHabitTrackerView.value === 'daily' ? 0 : 1;
});
</script>

<template>
  <ul
    class="view-switcher"
    :class="{
      'active-bg-left': activeIndex === 0,
      'active-bg-right': activeIndex === 1,
    }"
  >
    <li
      v-for="item in viewSwitcherItems"
      :key="item"
      class="view-switcher__item"
      :class="{
        'view-switcher__item_active': item === activeHabitTrackerView,
      }"
    >
      <button @click="habitsStore.changeActiveHabitTrackerView(item)">
        {{ item }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.view-switcher {
  position: absolute;
  bottom: 3dvh;
  left: 4dvw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50dvw;
  padding: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  backdrop-filter: blur(3px);

  @include mediaTablet {
    left: 50%;
    transform: translateX(-50%);
    width: 25dvw;
  }

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: calc(50% - 8px);
    height: calc(100% - 16px);
    background: $main_poisonous;
    border-radius: 50px;
    transition: transform 0.2s ease-in;
    will-change: transform;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 10px;
    color: $main_font;
    text-transform: uppercase;
    transition:
      color 0.2s ease-in,
      font-weight 0.2s ease-in;
    z-index: 1;

    @include font_notosans_18_300;

    &_active {
      color: $white;

      @include font_notosans_18_400;
    }
  }
}

.view-switcher.active-bg-left::before {
  transform: translateX(0);
}

.view-switcher.active-bg-right::before {
  transform: translateX(100%);
}
</style>
