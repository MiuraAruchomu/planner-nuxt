<script setup>
const authStore = useAuthStore();
const sidemenuStore = useSidemenuStore();
const modalsStore = useModalsStore();

const { user } = storeToRefs(authStore);
const { items, isVisible } = storeToRefs(sidemenuStore);
</script>

<template>
  <ul v-if="items && user && user !== undefined" class="side-menu-list">
    <li v-for="(value, key, index) in items" :key="key">
      <SideMenuListItem
        :name="key"
        :path="value.path"
        :index="index"
        @click="sidemenuStore.toggleVisible()"
      />
    </li>
  </ul>
  <ul
    class="side-menu-list side-menu-list_authentication"
    :class="{ 'side-menu-list_not-authorized': !user }"
  >
    <li v-if="!user && user !== undefined" class="list-item_authentication">
      <button
        :class="{ visible: isVisible }"
        @click="
          modalsStore.openModal('authentication', 'sign in');
          sidemenuStore.toggleVisible();
        "
      >
        sign in
      </button>
    </li>
    <li v-if="!user && user !== undefined" class="list-item_authentication">
      <button
        :class="{ visible: isVisible }"
        @click="
          modalsStore.openModal('authentication', 'sign up');
          sidemenuStore.toggleVisible();
        "
      >
        sign up
      </button>
    </li>
    <li v-if="user && user !== undefined" class="list-item_authentication">
      <button
        :class="{ visible: isVisible }"
        @click="
          authStore.signoutWithFirebase();
          sidemenuStore.toggleVisible();
        "
      >
        sign out
      </button>
    </li>
  </ul>
  <div class="designed-dev-by">
    <span :class="{ visible: isVisible }">designed/dev by miuraAruchomu</span>
  </div>
</template>

<style lang="scss" scoped>
.side-menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30dvh;
  margin-bottom: 10dvh;

  &_authentication {
    margin-top: 0;
    margin-bottom: 0;
  }

  &_not-authorized {
    margin-top: 30dvh;
  }
}

.designed-dev-by {
  position: absolute;
  bottom: 7dvh;
  width: 100%;
  overflow: hidden;

  span {
    display: flex;
    justify-content: center;
    width: 100%;
    color: $main_poisonous;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(-110%);
    transition:
      opacity 0.7s ease-in,
      transform 0.5s ease-in-out 0.7s;

    @include font_epilogue_italic_16_500;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.list-item_authentication {
  display: block;
  user-select: none;
  overflow: hidden;

  &:nth-child(1) {
    button {
      transition:
        transform 0.5s ease-in-out 0.65s,
        opacity 0.7s ease-in,
        background-position 0.3s ease-in;
    }
  }

  &:nth-child(2) {
    button {
      transition:
        transform 0.5s ease-in-out 0.675s,
        opacity 0.7s ease-in,
        background-position 0.3s ease-in;
    }
  }

  button {
    color: $main_green_light;
    background-image: linear-gradient(
      to right,
      $white 50%,
      $main_green_light 50%
    );
    background-size: 200% 100%;
    background-position: 100%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    transform: translateY(-110%);

    @include font_epilogue_italic_32_800;

    @include mediaTablet {
      @include font_epilogue_italic_44_800;
    }

    @include mediaLaptop {
      &:hover {
        background-position: 0;
      }
    }

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
