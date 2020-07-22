<script>
  import defaultImage from '../../assets/img/no-user.png'
  export default {
    name: 'McAvatar',
    functional: true,
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
      /**
       *  Цвет рамки
       *
       */
      borderColor: {
        type: String,
        default: "",
      },
      /**
       *  Цвет точки
       *
       */
      dotColor: {
        type: String,
        default: "",
      },
    },
    render(h, { props, data }) {
      const hasStatus = props.borderColor || props.dotColor

      const avatarClasses = {
        'mc-avatar': true,
        'mc-avatar--rounded': props.rounded,
        [`mc-avatar--size-${props.size}`]: props.size,
        [`mc-avatar--border-color-${props.borderColor}`]: props.borderColor,
        [`mc-avatar--dot-color-${props.dotColor}`]: props.dotColor,
        ...(!hasStatus && data.class ? data.class : {}),
      }
      const wrapperClasses = {
        'mc-avatar-status': true,
        [`mc-avatar-status--size-${props.size}`]: props.size,
        [`mc-avatar-status--border-color-${props.borderColor}`]: props.borderColor,
        [`mc-avatar-status--dot-color-${props.dotColor}`]: props.dotColor,
        ...(data.class || {}),
      }


      if (data.staticClass) {
        const staticClasses = data.staticClass.split(" ")
        const targetClasses = hasStatus ? wrapperClasses : avatarClasses
        staticClasses.forEach(c => c && (targetClasses[c] = true))
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

      const avatar = h('figure',
        {
            class: avatarClasses,
            style: {
                ...(!hasStatus ? style : {}),
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


      const wrapper = h('section',
        {
          class: wrapperClasses,
          style: {
            ...style,
          },
        },
        [avatar]
      )
      return hasStatus ? wrapper : avatar
    },
  }
</script>
<style lang="scss">
    $color-borders: $token-colors;
    $dot-colors: $token-colors;

    .mc-avatar-status {
        $status-name: &;

        display: inline-flex;
        border: 2px solid transparent;
        padding: 1px;
        position: relative;
        border-radius: 50%;

        &::after {
            @include size($size-100);
            @include pseudo();
            border: none;
            position: absolute;
            z-index: 2;
            border-radius: 50%;
        }

        @each $color, $value in $color-borders {
            &--border-color-#{$color} {
                border-color: $value;
                transition: box-shadow $duration-s;

                    &:hover,
                    &:focus {
                        .mc-avatar {
                            box-shadow: none;
                        }
                        background-color: $color-hover-gray;
                        box-shadow: 0 0 0 $space-50 $color-hover-gray;
                    }

            }
        }

        @each $color, $value in $dot-colors {
            &--dot-color-#{$color} {
                &::after {
                    border: 1px solid $color-white;
                    background-color: $value;
                    @if $color == "transparent" {
                        display: none;
                    }
                }
            }
        }

        @each $size, $value in $token-avatar-sizes {
            &--size-#{$size} {
                @if $size == 300 {
                    &::after {
                        bottom: -1px;
                        left: -2px;
                    }
                }
                @if $size == 400 {
                    &::after {
                        bottom: 0;
                        left: -1px;
                    }
                }
                @if $size == 500 {
                    &::after {
                        @include size($size-150);
                        bottom: -1px;
                        left: -2px;
                    }
                }
                @if $size == 600 {
                    &::after {
                        @include size($size-150);
                        bottom: -1px;
                        left: 0;
                    }
                }
                @if $size == 700 {
                    &::after {
                        @include size($size-200);
                        border-width: 2px;
                        bottom: -1px;
                        left: -1px;
                    }
                }
                @if $size == 800 {
                    &::after {
                        @include size($size-200);
                        border-width: 2px;
                        bottom: 0;
                        left: -1px;
                    }
                }
                @if $size == 900 {
                    &::after {
                        @include size($size-200);
                        border-width: 2px;
                        bottom: 1px;
                        left: 0;
                    }
                }
                @if $size == 1000 {
                    &::after {
                        @include size($size-200);
                        border-width: 2px;
                        bottom: 1px;
                        left: 2px;
                    }
                }
            }
        }
    }

    .mc-avatar {
        $avatar-name: &;

        @include reset();
        position: relative;
        display: inline-block;
        border-radius: $radius-100;
        overflow: hidden;
        background-color: $color-hover-gray;
        transition: box-shadow $duration-s;

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

        &:hover,
        &:focus {
            box-shadow: 0 0 0 $space-100 $color-hover-gray;
        }
    }
</style>
