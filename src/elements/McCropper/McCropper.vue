<template>
    <section class="mc-cropper">
        <vue-cropper
            ref="cropper"
            drag-mode="crop"
            background
            alt="Avatar"
            :aspect-ratio="1 / 1"
            :initial-aspect-ratio="1 / 1"
            :highlight="false"
            :guides="false"
            :zoomable="zoomable"
            :view-mode="2"
            :src="imgSrc"
            @ready="$emit('ready')"
        />
    </section>
</template>

<script>
const VueCropper = () => import('vue-cropperjs')
import 'cropperjs/dist/cropper.css'

export default {
    name: 'McCropper',
    status: 'ready',
    release: '1.0.0',
    components: {
        VueCropper,
    },
    props: {
        /**
         *  Путь к изображению
         *
         */
        imgSrc: {
            type: [String, Object],
            default: null,
        },
        zoomable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            cropImg: '',
        }
    },
    watch: {
        imgSrc(val) {
            this.setImage(val)
        },
    },
    methods: {
        setImage() {
            this.$refs.cropper.replace(this.imgSrc)
        },
        cropImage() {
            this.$refs.cropper
                .getCroppedCanvas({
                    maxWidth: 650,
                    maxHeight: 650,
                })
                .toBlob(blob => {
                    /**
                     * Событие по обрезке
                     * @property {blob}
                     */
                    this.$emit('crop', blob)
                })
        },
    },
}
</script>

<style lang="scss">
@import '../../tokens/border-radius';
@import '../../tokens/opacities';
.mc-cropper {
    $block-name: &;

    $color-main: var(--color-main);

    .cropper {
        &-modal {
            opacity: $opacity-active;
            background-color: $color-white;
        }

        &-face,
        &-line,
        &-point {
            opacity: 0;
        }

        &-view-box {
            border-radius: $radius-circle;
            outline: 1px dashed $color-main;
        }

        &-line {
            background-color: $color-main;
        }

        &-point {
            background: $color-main;

            &.point-se {
                @media #{$media-query-xl} {
                    opacity: 1;
                }

                &:before {
                    background-color: $color-main;
                }
            }
        }

        &-center {
            display: none;
        }

        &-canvas {
            height: 100% !important;
        }

        &-hide {
            height: 100% !important;
        }
    }
}
</style>
