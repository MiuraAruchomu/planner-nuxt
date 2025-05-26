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
const { status } = storeToRefs(requestStatusStore);

const inputs = reactive({
  name: {
    name: 'name',
    focused: false,
    required: true,
    disabled: false,
    placeholder: 'Habit name',
    validate: validateHabitName,
  },
});

const formConfig = reactive({
  name: {
    value: '',
    error: '',
  },
  regularity: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
});

const isAllRegularityFalse = computed(() => {
  return Object.values(formConfig.regularity).every((value) => {
    return value === false;
  });
});

const selectedRegularityError = ref('');
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
  if (inputs.name.required && !formConfig.name.value) {
    formConfig.name.error = 'This field is required';
  }

  if (isAllRegularityFalse.value) {
    selectedRegularityError.value = 'Minimum one day';
  }

  if (
    formConfig.name.value &&
    !formConfig.name.error &&
    !selectedRegularityError.value
  ) {
    try {
      const newHabitId = `${Date.now()}-${useNuxtApp().$nanoid()}`;
      await habitsStore.addNewHabitWithFirebase({
        id: newHabitId,
        name: formConfig.name.value,
        regularity: formConfig.regularity,
      });
      if (status.value === 'success') {
        timer.value = setTimeout(() => {
          modalsStore.closeModal(props.modalClose);
        }, 1000);
      }
    } catch (err) {}
  }
};

watch(
  () => formConfig.regularity,
  () => {
    if (!isAllRegularityFalse.value && selectedRegularityError.value) {
      selectedRegularityError.value = '';
    }
  },
  { deep: true },
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
  <div class="modal-new-habit" @click="modalsStore.closeModal(modalClose)">
    <div class="modal-new-habit__inner" @click.stop>
      <button
        class="modal-new-habit__close-button"
        @click="modalsStore.closeModal(modalClose)"
      >
        <span />
      </button>
      <h2 class="modal-new-habit__title">New habit</h2>
      <form class="modal-new-habit__form" @submit.prevent>
        <span class="modal-new-habit__name">Enter habit name:</span>
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
            type="text"
            :name="inputs[key].name"
            @focus="handleFocus"
            @input="handleInput"
            @blur="handleBlur"
          />
        </UiInputWrapper>
        <span class="modal-new-habit__regularity"> Select regularity: </span>
        <HabitTrackerRegularity
          :regularity="formConfig.regularity"
          :error="selectedRegularityError"
        />
        <span v-if="selectedRegularityError" class="modal-new-habit__error">
          {{ selectedRegularityError }}
        </span>
        <UiButtonStatus
          :name="'create'"
          :type="'outline'"
          :color="'green'"
          :size="'large'"
          class="modal-new-habit__submit-button"
          @click="handleSubmit"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-new-habit {
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
    gap: 20px;
    width: 90dvw;
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

  &__title {
    @include font_notosans_22_300;

    @include mediaTablet {
      @include font_notosans_24_300;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  &__name,
  &__regularity {
    display: flex;
    justify-content: center;

    @include font_notosans_16_300;
  }

  &__error {
    font-size: 14px;
    user-select: none;
    pointer-events: none;
    display: flex;
    justify-content: center;
    width: inherit;

    @include font_error;
  }

  &__submit-button {
    margin-top: 15px;
  }
}
</style>
