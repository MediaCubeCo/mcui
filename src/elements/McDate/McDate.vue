<template>
    <section class="mc-date">
        <!-- @slot Слот для вставки в начало -->
        <slot name="prepend" />
        <time class="mc-date__time" :datetime="dayjsDate">
            <mc-title :variation="size" :ellipsis="ellipsis" :uppercase="uppercase" :color="color">
                {{ formattedDate }}
            </mc-title>
        </time>
        <!-- @slot Слот для вставки в конец -->
        <slot name="append" />
    </section>
</template>

<script>
import { dayjs } from '../../utils/dayjs'
import McTitle from '../McTitle/McTitle'

export default {
    name: 'McDate',

    components: {
        McTitle,
    },

    props: {
        /**
         *  Значение
         */
        value: {
            type: String,
            default: null,
        },

        /**
         *  Формат даты
         */
        format: {
            default: 'DD.MM.YYYY',
        },

        /**
         *  Размер даты
         *  `h1`, `h2`, `h3`, `h4`, `subtitle`, `body`, `overline`.
         */
        size: {
            type: String,
            default: 'body',
        },

        /**
         *  Перенос строк
         */
        ellipsis: {
            type: Boolean,
            default: true,
        },

        /**
         *  Заглавные буквы
         */
        uppercase: {
            type: Boolean,
            default: true,
        },
        /**
         *  Цвет текста:
         *  `purple, red, gray и т.д.`
         */
        color: {
            type: String,
            default: 'black',
        },
    },

    computed: {
        dayjsDate() {
            if (dayjs === null) return null
            const locale = this.$i18n?.locale || 'ru' // TODO: maybe `en`?
            return dayjs(this.value).locale(locale)
        },
        formattedDate() {
            if (this.dayjsDate === null) return this.value
            return this.dayjsDate.format(this.format)
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/font-families';
.mc-date {
    $block-name: &;

    display: inline-flex;
    align-items: center;
    @include reset-text-indents();
    @include child-indent-right($space-50);

    &__time {
        font-family: $font-family-main;
    }
}
</style>
