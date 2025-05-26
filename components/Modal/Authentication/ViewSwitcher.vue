<script setup>
const modalsStore = useModalsStore();

const { authenticationViewSwitcherItems, activeAuthenticationView } =
  storeToRefs(modalsStore);

const activeIndex = computed(() =>
  activeAuthenticationView.value === 'sign in' ? 0 : 1,
);
</script>

<template>
  <ul
    class="authentication-view-switcher"
    :class="{
      'active-bg-left': activeIndex === 0,
      'active-bg-right': activeIndex === 1,
    }"
  >
    <li
      v-for="item in authenticationViewSwitcherItems"
      :key="item"
      class="authentication-view-switcher__item"
      :class="{
        'authentication-view-switcher__item_active':
          item === activeAuthenticationView,
      }"
    >
      <button @click="modalsStore.changeActiveAuthenticationView(item)">
        {{ item }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.authentication-view-switcher {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 55%;
  margin-bottom: 15px;
  background: $main_grey;
  border-radius: 50px;

  @include mediaTablet {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(50% - 5px);
    height: calc(100% - 10px);
    background: $main_poisonous;
    border-radius: 50px;
    transition: transform 0.2s ease-in;
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

.authentication-view-switcher.active-bg-left::before {
  transform: translateX(0);
}

.authentication-view-switcher.active-bg-right::before {
  transform: translateX(100%);
}
</style>
