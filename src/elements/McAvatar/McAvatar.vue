<script>
  import defaultImage from '../../assets/img/no-user.png'
  export default {
    name: 'McAvatar',
    functional: true,
    props: {
      src: {
        type: String,
        default: defaultImage,
      },
      alt: {
        type: String,
        default: 'Avatar',
      },
      size: {
        type: String,
        default: '300',
      },
      rounded: {
        type: Boolean,
        default: true,
      },
    },
    render(h, { props, data }) {
      const classes = {
        'mc-avatar': true,
        'mc-avatar--rounded': props.rounded,
        [`mc-avatar--size-${props.size}`]: props.size,
        ...(data.class || {}),
      }
      if (data.staticClass) {
        const staticClasses = data.staticClass.split(" ")
        staticClasses.forEach(c => c && (classes[c] = true))
      }

      let style = {}
      if (data.staticStyle) {
        style = data.staticStyle
      }
      return h('div', {
        class: classes,
        style: {
          backgroundImage: `url('${props.src || defaultImage}')`,
          ...style,
        },
        ref: 'mc-avatar',
      })
    },
  }
</script>
<style lang="scss">
    .mc-avatar {
        $block-name: &;
        user-select: none;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        @each $size, $value in $token-avatar-sizes {
            &--size-#{$size} {
                @include size($value);
            }
        }
        &--rounded {
            border-radius: $radius-circle;
        }
    }
</style>
