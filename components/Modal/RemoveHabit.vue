<script setup>
const props = defineProps({
  modalClose: {
    type: String,
    default: null,
  },
});

const modalsStore = useModalsStore();
const habitsStore = useHabitsStore();
const requestStatusStore = useRequestStatusStore();

const { habitDataToRemove } = storeToRefs(habitsStore);
const { status } = storeToRefs(requestStatusStore);

const computedButtonName = computed(() => {
  switch (status.value) {
    case 'success':
      return 'has been removed';
    case 'error':
      return 'error';
    default:
      return 'remove';
  }
});

const inputs = reactive({
  name: {
    name: 'name',
    focused: false,
    required: true,
    disabled: false,
    matching: true,
    placeholder: 'Habit name',
  },
});

const formConfig = reactive({
  name: {
    value: '',
    isMatched: false,
  },
});

const timer = ref(null);

const handleFocus = ({ target }) => {
  inputs[target.name].focused = true;
};

const handleInput = ({ target }) => {
  formConfig[target.name].value = target.value.trim();
};

const handleBlur = ({ target }) => {
  const input = inputs[target.name];
  input.focused = false;
};

const handleClose = (e) => {
  if (e.key === 'Escape') {
    modalsStore.closeModal(props.modalClose);
  }
};

const handleSubmit = async () => {
  if (formConfig.name.value && formConfig.name.isMatched) {
    try {
      await habitsStore.removeHabitWithFirebase(habitDataToRemove.value.id);
      if (status.value === 'success') {
        timer.value = setTimeout(() => {
          modalsStore.closeModal(props.modalClose);
          habitsStore.clearHabitDataToRemove();
        }, 1000);
      }
    } catch (err) {}
  }
};

watch(
  () => formConfig.name.value,
  () => {
    if (formConfig.name.value === habitDataToRemove.value.name) {
      formConfig.name.isMatched = true;
    } else {
      formConfig.name.isMatched = false;
    }
  },
);

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
  <div
    class="modal-remove-habit"
    @click="
      modalsStore.closeModal(modalClose);
      habitsStore.clearHabitDataToRemove();
    "
  >
    <div class="modal-remove-habit__inner" @click.stop>
      <button
        class="modal-remove-habit__close-button"
        @click="
          modalsStore.closeModal(modalClose);
          habitsStore.clearHabitDataToRemove();
        "
      />
      <h2 class="modal-remove-habit__title">Remove habit</h2>
      <h3 class="modal-remove-habit__subtitle">
        Are you sure you want to remove the habit?
      </h3>
      <form class="modal-remove-habit__form" @submit.prevent>
        <span class="modal-remove-habit__name">
          Enter habit name to remove:
        </span>
        <UiInputWrapper
          v-for="(input, key) in inputs"
          :focused="inputs[key].focused"
          :required="inputs[key].required"
          :disabled="inputs[key].disabled"
          :matching="inputs[key].matching"
          :placeholder="inputs[key].placeholder"
          :has-value="formConfig[key].value"
          :is-matched="formConfig[key].isMatched"
        >
          <input
            type="text"
            :name="inputs[key].name"
            @focus="handleFocus"
            @input="handleInput"
            @blur="handleBlur"
          />
        </UiInputWrapper>
        <UiButtonWrapper
          :type="'fill'"
          :color="'red'"
          :size="'large'"
          :disabled="!formConfig.name.isMatched || status === 'loading'"
        >
          <button
            class="modal-remove-habit__submit-button"
            @click="handleSubmit"
          >
            <span
              class="button-name"
              :class="{ 'button-name_hidden': status === 'loading' }"
            >
              {{ computedButtonName }}
            </span>
            <div v-if="status === 'loading'" class="loader">
              <span />
              <span />
              <span />
            </div>
          </button>
        </UiButtonWrapper>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-remove-habit {
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
    gap: 20px;
    padding: 30px 0;
    background-color: $white;
    border-radius: $border_mobile;
    z-index: 4;

    @include mediaTablet {
      width: fit-content;
      padding: 30px;
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
    background: $main_grey;
    border-radius: 50px;
    transform-origin: top right;
    transition:
      opacity 0.3s ease-in,
      transform 0.3s ease-in;

    @include mediaLaptop {
      opacity: 0.8;

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

  &__title {
    @include font_notosans_22_300;

    @include mediaTablet {
      @include font_notosans_24_300;
    }
  }

  &__subtitle {
    text-align: center;

    @include font_notosans_18_300;

    @include mediaTablet {
      @include font_notosans_20_300;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  &__name {
    display: flex;
    justify-content: center;

    @include font_notosans_16_300;
  }

  &__submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.button-name {
  white-space: nowrap;

  &_hidden {
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
