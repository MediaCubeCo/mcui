<script>
  // import VueLazyload from 'vue-lazyload'
  import defaultImage from '../../assets/img/no-user.png'
  export default {
    name: 'McAvatar',
    functional: true,
    // directives: {
    //   lazy: VueLazyload,
    // },
    props: {
      /**
       *  Путь до изображения
       *
       */
      src: {
        type: String,
        default: defaultImage,
      },
      /**
       *  Отложенная подгрузка
       *
       */
      lazy: {
        type: Boolean,
        default: false,
      },
      alt: {
        type: String,
        default: 'Avatar',
      },
      /**
       *  Размеры
       */
      size: {
        type: String,
        default: '300',
      },
      /**
       *  Круглый
       *
       */
      rounded: {
        type: Boolean,
        default: false,
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

      const lazyOptions = {
        name: 'lazy',
        value: {
          src: props.src,
          error: defaultImage,
          attempt: 1,
        }
      }
      const directives = props.lazy ? [lazyOptions] : []

      return h('figure',
        {
            class: classes,
            style: {
                ...style,
            },
        },
        [
            h("img",
              {
                class: "mc-avatar__img",
                attrs: {
                  alt: props.alt,
                  ...(!props.lazy ? { src: props.src } : {}),
                },
                directives,
                key: props.src,
              }
            ),
        ]
      )
    },
  }
</script>
<style lang="scss">
    .mc-avatar {
        $block-name: &;

        @include reset();
        position: relative;
        display: inline-block;
        border-radius: $radius-100;
        overflow: hidden;
        background-color: $color-hover-gray;

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @each $size, $value in $token-avatar-sizes {
            &--size-#{$size} {
                @include size($value);
                @if $size < 500 {
                    border-radius: $radius-50;
                }
            }
        }
        &--rounded {
            border-radius: $radius-circle;
        }
    }
</style>
