<template>
    <div class="mc-field-radio-group" :class="classes">
       <mc-field-radio-button
           v-for="radio in computedOptions"
           v-bind="radio"
           :key="radio.id"
           :name="name"
           @input="handleInput"
       />
    </div>
</template>

<script>
  import _XEUtils from 'xe-utils'
  import McFieldRadioButton from "../McFieldRadioButton/McFieldRadioButton"
  export default {
    name: "McFieldRadioGroup",
    components: { McFieldRadioButton },
    props: {
      /**
       *  Значение
       */
      value: {
        default: null,
      },
      /**
       *  Объект или массив данных
       */
      options: {
        type: Array,
        default: () => [],
      },
      /**
       *  Выбранное значение по умолчанию
       */
      defaultValue: {
        type: [String, Number],
        default: ''
      },
      /**
       *  Name
       */
      name: {
        type: String,
        required: true,
      },
      /**
       *  Отключенное состояние
       *  всего списка
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       *  Добавление пользовательского
       *  класса к radio
       */
      radioClassName: {
        type: String,
        default: '',
      },
      /**
       *  Направление списка
       *  `column`, `row`
       */
      direction: {
        type: String,
        default: 'column',
      }
    },
    computed: {
      computedOptions() {
        if(!this.options.length) return []
        return this.options.map(o => {
          const optionData = typeof o === 'object' ? o : { label: o, value: o }
          return {
            id: _XEUtils.uniqueId(),
            ...optionData,
            disabled: this.disabled || optionData.disabled,
            'checked-default': optionData.value === this.defaultValue,
            class: this.radioClassName,
          }
        })
      },
      classes() {
        return {
            [`mc-field-radio-group--direction-${this.direction}`]: this.direction,
        }
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value)
        /**
         * Событие по смене выбора
         * @property {event}
         */
        this.$emit('change', e)
      },
    },
  }
</script>

<style lang="scss">
.mc-field-radio-group {
    $block-name: &;


    &--direction {
        &-column {
            @include child-indent-bottom($space-100);
            .mc-field-radio-button {
                display: block;
            }
        }
        &-row {
            @include child-indent-right($space-100);
        }
    }

}
</style>