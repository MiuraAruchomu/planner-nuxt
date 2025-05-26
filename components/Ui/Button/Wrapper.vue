<script setup>
const props = defineProps({
  type: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label
    v-if="type && color && size"
    :class="[
      'main-button-wrapper',
      `main-button-wrapper__${type}-${color}`,
      `main-button-wrapper_${size}`,
      { [`main-button-wrapper__${type}-${color}_disabled`]: disabled },
    ]"
  >
    <slot />
  </label>
</template>

<style lang="scss" scoped>
.main-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  &__fill {
    &-green {
      color: $white;
      background: $main_green;
      transition: background 0.3s ease-in-out;

      &:active {
        background: $main_green_dark;
        cursor: pointer;
      }

      &:hover {
        @include mediaLaptop {
          background: $main_green_dark;
          cursor: pointer;
        }
      }

      &_disabled {
        pointer-events: none;
        background: $main_grey;
        color: $main_grey_dark;
      }
    }

    &-red {
      color: $white;
      background: $main_red;
      transition: background 0.3s ease-in-out;

      &:active {
        background: $main_red_dark;
        cursor: pointer;
      }

      &:hover {
        @include mediaLaptop {
          background: $main_red_dark;
          cursor: pointer;
        }
      }

      &_disabled {
        pointer-events: none;
        background: $main_grey;
        color: $main_grey_dark;
      }
    }

    &-error {
      color: $white;
      background: $main_error;
      transition: background 0.3s ease-in-out;

      &:hover {
        @include mediaLaptop {
          cursor: pointer;
        }
      }
    }
  }

  &__outline {
    &-green {
      color: $main_green_dark;
      box-shadow: inset 0 0 0 1.5px $main_green_dark;
      transition: all 0.3s ease-in-out;

      &:active {
        color: $white;
        background: $main_green_dark;
        cursor: pointer;
      }

      &:hover {
        @include mediaLaptop {
          color: $white;
          background: $main_green_dark;
          cursor: pointer;
        }
      }

      &_disabled {
        pointer-events: none;
        box-shadow: inset 0 0 0 1.5px $main_grey;
        color: $main_grey_dark;
      }
    }

    &-red {
      color: $main_red_dark;
      box-shadow: inset 0 0 0 1.5px $main_red_dark;
      transition: all 0.3s ease-in-out;

      &:active {
        color: $white;
        background: $main_red_dark;
        cursor: pointer;
      }

      &:hover {
        @include mediaLaptop {
          color: $white;
          background: $main_red_dark;
          cursor: pointer;
        }
      }

      &_disabled {
        pointer-events: none;
        box-shadow: inset 0 0 0 1.5px $main_grey;
        color: $main_grey_dark;
      }
    }

    &-error {
      color: $main_error;
      box-shadow: inset 0 0 0 1.5px $main_error;
      transition: all 0.3s ease-in-out;

      &:hover {
        @include mediaLaptop {
          color: $white;
          background: $main_error;
          cursor: pointer;
        }
      }
    }
  }

  &__text {
    &-green {
      position: relative;
      color: $main_green_dark;
      overflow: hidden;

      &::before {
        content: '';
        background: $main_green_dark;
        position: absolute;
        inset: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
        z-index: -1;
      }

      &:active {
        color: $white;
        cursor: pointer;
        &::before {
          transform: translateY(0);
        }
      }

      &:hover {
        @include mediaLaptop {
          color: $white;
          cursor: pointer;

          &::before {
            transform: translateY(0);
          }
        }
      }

      &_disabled {
        pointer-events: none;
        color: $main_grey_dark;
      }
    }

    &-red {
      position: relative;
      color: $main_red_dark;
      overflow: hidden;

      &::before {
        content: '';
        background: $main_red_dark;
        position: absolute;
        inset: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
        z-index: -1;
      }

      &:active {
        color: $white;
        cursor: pointer;
        &::before {
          transform: translateY(0);
        }
      }

      &:hover {
        @include mediaLaptop {
          color: $white;
          cursor: pointer;

          &::before {
            transform: translateY(0);
          }
        }
      }

      &_disabled {
        pointer-events: none;
        color: $main_grey_dark;
      }
    }

    &-error {
      position: relative;
      color: $main_error;
      overflow: hidden;

      &::before {
        content: '';
        background: $main_error;
        position: absolute;
        inset: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
        z-index: -1;
      }

      &:hover {
        @include mediaLaptop {
          color: $white;
          cursor: pointer;

          &::before {
            transform: translateY(0);
          }
        }
      }
    }
  }

  &_small {
    padding: 5px 8px;
    border-radius: $border_button_small;

    @include font_button_small;
  }

  &_medium {
    padding: 9px 14px;
    border-radius: $border_button_medium;

    @include font_button_medium;
  }

  &_large {
    padding: 12px 30px;
    border-radius: $border_button_large;

    @include font_button_large;
  }
}
</style>
