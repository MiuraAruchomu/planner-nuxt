<script setup>
definePageMeta({
  middleware: ['public'],
});

const authStore = useAuthStore();

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

const handleSubmit = async () => {
  if (formConfig.email.value && formConfig.password.value) {
    try {
      const response = await authStore.signinWithFirebase(
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

onBeforeUnmount(() => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
});
</script>

<template>
  <div class="signin-page">
    <div class="signin-page__inner">
      <h2 class="signin-page__title">Sign In to Your Account</h2>
      <form class="signin-page__form" @submit.prevent>
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
          class="signin-page__submit-button"
          @click="handleSubmit"
        />
      </form>
      <h4 class="signin-page__signup">
        Don't have an account?
        <NuxtLink to="/signup" class="signin-page__signup-link"
          >Sign up</NuxtLink
        >
      </h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;

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

  &__signup {
    margin-top: -10px;
    color: $main_font;

    @include font_notosans_14_300;

    &-link {
      color: $main_green;
      transition: color 0.3s ease-in-out;

      @include mediaLaptop {
        &:hover {
          color: $main_green_dark;
        }
      }
    }
  }

  &__submit-button {
    margin-top: 15px;
  }
}
</style>
