<template>
    <div class="mc-field-radio-group">
       <mc-field-radio-button
           v-for="radio in computedOptions"
           v-bind="radio"
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
        default: [],
      },
      /**
       *  Выбранное значение по умолчанию
       */
      defaultValue: {
        type: [String, Number],
        default: 0
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
    },
    computed: {
      computedOptions() {
        if(!this.options.length) return []
        return this.options.map(o => {
          const optionData = typeof o === 'object' ? o : { label: o, value: o }
          return {
            key: _XEUtils.uniqueId(),
            ...optionData,
            disabled: this.disabled || optionData.disabled,
            'checked-default': optionData.value === this.defaultValue,
          }
        })
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value)
      }
    },
  }
</script>

<style lang="scss">

</style>