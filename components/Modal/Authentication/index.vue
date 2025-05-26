<script setup>
import ModalAuthenticationSignin from '@/components/Modal/Authentication/Signin.vue';
import ModalAuthenticationSignup from '@/components/Modal/Authentication/Signup.vue';

const props = defineProps({
  modalClose: {
    type: String,
    default: null,
  },
});

const modalsStore = useModalsStore();
const { activeAuthenticationView } = storeToRefs(modalsStore);
</script>

<template>
  <div class="modal-authentication" @click="modalsStore.closeModal(modalClose)">
    <div class="modal-authentication__inner" @click.stop>
      <button
        class="modal-authentication__close-button"
        @click="modalsStore.closeModal(modalClose)"
      />
      <ModalAuthenticationViewSwitcher />
      <Transition name="authentication" mode="out-in">
        <component
          :is="
            activeAuthenticationView === 'sign in'
              ? ModalAuthenticationSignin
              : ModalAuthenticationSignup
          "
          :key="activeAuthenticationView"
          :modal-close="modalClose"
        />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-authentication {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90dvw;
    padding: 30px 0;
    gap: 20px;
    background: $white;
    border-radius: $border_mobile;
    overflow-y: auto;
    z-index: 4;

    @include mediaTablet {
      justify-content: center;
      width: fit-content;
      padding: 30px 100px;
      border-radius: $border_tablet;
    }

    @include mediaLaptop {
      border-radius: $border_laptop;
    }
  }

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: $main_poisonous;
    border-radius: 50px;
    transform-origin: top right;
    transition:
      opacity 0.3s ease-in,
      transform 0.3s ease-in;

    @include mediaLaptop {
      opacity: 0.5;

      &:hover {
        opacity: 1;
        transform: scale(1.15);
        cursor: pointer;
      }
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 14px;
      left: 5px;
      display: flex;
      width: 20px;
      height: 2px;
      background: $white;
      border-radius: 5px;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}

.authentication-enter-active,
.authentication-leave-active {
  transition: opacity 0.2s ease;
}
.authentication-enter-from,
.authentication-leave-to {
  opacity: 0;
}
</style>
