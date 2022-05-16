<template>
    <div class="mc-chat-form">
        <form @submit.prevent="handleSubmit">
            <mc-preview class="mc-chat-form__inner">
                <mc-avatar slot="left" class="mc-chat-form__avatar" size="400" rounded :src="avatar" />
                <mc-field-text
                    slot="top"
                    name="chat-field"
                    class="mc-chat-form__input"
                    type="textarea-autosize"
                    :min-height="40"
                    :max-height="250"
                    :value="prettyValue"
                    :placeholder="placeholder"
                    @input="handleInput"
                    @keydown.enter.native.prevent.exact="handleSubmit"
                    @keydown.ctrl.enter.native="toNewRow"
                >
                    <mc-button
                        slot="append"
                        class="mc-chat-form__btn"
                        variation="purple-link"
                        size="m-compact"
                        type="submit"
                        rounded
                        :loading="loading"
                        @click.prevent="handleSubmit"
                    >
                        <mc-svg-icon slot="icon-append" name="send_solid" />
                    </mc-button>
                </mc-field-text>
            </mc-preview>
        </form>
    </div>
</template>

<script>
import McAvatar from '../../../elements/McAvatar/McAvatar'
import McPreview from '../../McPreview/McPreview'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McButton from '../../../elements/McButton/McButton'
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'
/**
 * Используется только в McChat
 */
export default {
    name: 'McChatForm',
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
        McAvatar,
        McPreview,
    },
    props: {
        /**
         * Значение инпута
         */
        value: {
            type: String,
            required: true,
        },
        /**
         * Состояние загрузки/отправки
         * данных
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Аватар пользователя
         */
        avatar: {
            type: String,
            default: null,
        },
        /**
         * Плейсхолдер инпута
         */
        placeholder: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            prettyValue: this.value,
        }
    },
    methods: {
        handleInput(value) {
            this.prettyValue = value
            /**
             * Событие инпута
             * @property {string}
             */
            this.$emit('input', value)
        },
        handleSubmit() {
            if (this.prettyValue.trim() === '') return
            this.prettyValue = ''
            /**
             * Событие по отправке
             */
            this.$emit('submit')
        },
        toNewRow() {
            this.prettyValue += '\n'
        },
    },
}
</script>

<style lang="scss">
.mc-chat-form {
    $block-name: &;
    line-height: $line-height-200;

    &__inner {
        @include custom-scroll($space-250);
    }

    .mc-field-text {
        &__input {
            border-radius: $radius-200;
            padding-bottom: $space-150;
        }
        &__append {
            right: $space-50;
            padding: $space-50 0 $space-50 $space-50;
        }
    }

    &__avatar {
        margin-top: $space-50;
    }

    &__btn {
        align-self: flex-end;
        .mc-svg-icon {
            @include size($size-400);
        }
    }
}
</style>
