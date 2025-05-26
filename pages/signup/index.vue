<script setup>
import { useAuthStore } from '@/stores/auth';
import { validateEmail, validatePassword } from '@/utils/formValidation';

definePageMeta({
  middleware: ['public'],
});

const authStore = useAuthStore();

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
          return navigateTo('/');
        }, 1000);
      }
    } catch (err) {}
  }
};

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

onBeforeUnmount(() => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
});
</script>

<template>
  <div class="signup-page">
    <div class="signup-page__inner">
      <h2 class="signup-page__title">Sign up and get started!</h2>
      <form class="signup-page__form" @submit.prevent>
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
          class="signup-page__submit-button"
          @click="handleSubmit"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  inset: 0;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90dvw;
    padding: 30px 0;
    gap: 20px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(3px);
    border-radius: $border_mobile;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

    @include mediaTablet {
      width: fit-content;
      padding: 30px 100px;
      border-radius: $border_tablet;
    }

    @include mediaLaptop {
      border-radius: $border_laptop;
    }
  }

  &__title {
    color: $main_font;

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
