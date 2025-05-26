<script setup>
const props = defineProps({
  modalClose: {
    type: String,
    default: null,
  },
});

const authStore = useAuthStore();
const modalsStore = useModalsStore();

const inputs = reactive({
  email: {
    name: 'email',
    focused: false,
    required: false,
    disabled: false,
    placeholder: 'Email',
  },
  password: {
    name: 'password',
    focused: false,
    required: false,
    disabled: false,
    placeholder: 'Password',
  },
});

const formConfig = reactive({
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
});

const timer = ref(null);

const handleFocus = ({ target }) => {
  inputs[target.name].focused = true;
};

const handleInput = ({ target }) => {
  formConfig[target.name].value = target.value.trim();
  formConfig[target.name].error = '';
};

const handleBlur = ({ target }) => {
  inputs[target.name].focused = false;
};

const handleClose = (e) => {
  if (e.key === 'Escape') {
    modalsStore.closeModal(props.modalClose);
  }
};

const handleSubmit = async () => {
  if (formConfig.email.value && formConfig.password.value) {
    try {
      const response = await authStore.signinWithFirebase(
        formConfig.email.value,
        formConfig.password.value,
      );
      if (response) {
        timer.value = setTimeout(() => {
          modalsStore.closeModal(props.modalClose);
          return navigateTo('/');
        }, 1000);
      }
    } catch (err) {}
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleClose);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleClose);
  if (timer.value) {
    clearTimeout(timer.value);
  }
});
</script>

<template>
  <div class="modal-authentication-signin">
    <h2 class="modal-authentication-signin__title">Sign In to Your Account</h2>
    <form class="modal-authentication-signin__form" @submit.prevent>
      <UiInputWrapper
        v-for="(input, key) in inputs"
        :focused="inputs[key].focused"
        :required="inputs[key].required"
        :disabled="inputs[key].disabled"
        :placeholder="inputs[key].placeholder"
        :has-value="formConfig[key].value"
        :error="formConfig[key].error"
      >
        <input
          v-if="inputs[key].name === 'password'"
          type="password"
          :name="inputs[key].name"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
        />
        <input
          v-else
          :name="inputs[key].name"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
        />
      </UiInputWrapper>
      <UiButtonStatus
        :name="'sign in'"
        :type="'fill'"
        :color="'green'"
        :size="'large'"
        class="modal-authentication-signin__submit-button"
        @click="handleSubmit"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal-authentication-signin {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 80%;
  background-color: $white;
  overflow-y: auto;

  &__title {
    @include font_notosans_22_300;

    @include mediaTablet {
      @include font_notosans_24_300;
    }
  }

  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  &__submit-button {
    margin-top: 15px;
  }
}
</style>
