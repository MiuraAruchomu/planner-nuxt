<script setup>
import { SIDEMENU_ITEMS } from '../SideMenu.config';
</script>

<template>
  <ul class="side-menu-list">
    <li
      v-for="(value, key, index) in SIDEMENU_ITEMS.AUTHORIZED"
      :key="key"
      class="side-menu-list__item"
    >
      <SideMenuAuthorizedItem
        :name="value.name"
        :path="value.path"
        :index="index"
      />
    </li>
    <SideMenuAuthorizedSignoutItem />
  </ul>
</template>

<style lang="scss" scoped>
.side-menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30dvh;

  &__item {
    display: block;
    user-select: none;
    overflow: hidden;
  }
}
</style>
