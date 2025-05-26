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
    required: true,
    disabled: false,
    placeholder: 'Email',
    validate: validateEmail,
  },
  password: {
    name: 'password',
    focused: false,
    required: true,
    disabled: false,
    placeholder: 'Password',
    validate: validatePassword,
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    focused: false,
    required: true,
    disabled: false,
    placeholder: 'Confirm your password',
    validate: validateConfirmPassword,
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
  passwordConfirm: {
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
  const input = inputs[target.name];
  const value = formConfig[target.name].value;
  input.focused = false;

  if (input.required && !value) {
    formConfig[target.name].error = 'This field is required';
  }
  if (input.name === 'passwordConfirm' && value) {
    validateConfirmPassword();
  } else if (value) {
    formConfig[target.name].error = inputs[target.name].validate(
      formConfig[target.name].value,
    );
  }
};

const handleClose = (e) => {
  if (e.key === 'Escape') {
    modalsStore.closeModal(props.modalClose);
  }
};

const handleSubmit = async () => {
  if (inputs.email.required && !formConfig.email.value) {
    formConfig.email.error = 'This field is required';
  }
  if (inputs.password.required && !formConfig.password.value) {
    formConfig.password.error = 'This field is required';
  }
  if (inputs.passwordConfirm.required && !formConfig.passwordConfirm.value) {
    formConfig.passwordConfirm.error = 'This field is required';
  }

  if (
    formConfig.email.value &&
    formConfig.password.value &&
    formConfig.passwordConfirm.value &&
    !formConfig.email.error &&
    !formConfig.password.error &&
    !formConfig.passwordConfirm.error
  ) {
    try {
      const response = await authStore.signupWithFirebase(
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

function validateConfirmPassword() {
  if (formConfig.password.value !== formConfig.passwordConfirm.value) {
    formConfig.passwordConfirm.error = "Passwords don't match";
  } else if (
    formConfig.password.value === formConfig.passwordConfirm.value &&
    formConfig.password.error
  ) {
    formConfig.passwordConfirm.error = 'The password must not contain errors';
  }
}
</script>

<template>
  <div class="modal-authentication-signup">
    <h2 class="modal-authentication-signup__title">Sign up and get started!</h2>
    <form class="modal-authentication-signup__form" @submit.prevent>
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
          v-if="
            inputs[key].name === 'password' ||
            inputs[key].name === 'passwordConfirm'
          "
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
        :name="'sign up'"
        :type="'outline'"
        :color="'green'"
        :size="'large'"
        class="modal-authentication-signup__submit-button"
        @click="handleSubmit"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal-authentication-signup {
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
