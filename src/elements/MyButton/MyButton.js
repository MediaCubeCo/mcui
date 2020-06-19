export default {
  name: 'my-button',

  data() {
    return {
      buttonStyles: {
        border: '1px solid #eee',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        fontSize: 15,
        padding: '3px 10px',
        margin: 10,
      },
    };
  },

  template: `
    <button :disabled="isDisabled" :style="buttonStyles" @click="onClick">
      <slot />
    </button>
  `,

  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
