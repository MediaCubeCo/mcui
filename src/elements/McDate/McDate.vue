<template>
    <section class="mc-date">
        <!-- @slot Слот для вставки в начало -->
        <slot name="prepend" />
        <time class="mc-date__time" :datetime="momentDate">
            <mc-title :variation="size" :ellipsis="ellipsis" :uppercase="uppercase" :color="color">
                {{ formattedDate }}
            </mc-title>
        </time>
        <!-- @slot Слот для вставки в конец -->
        <slot name="append" />
    </section>
</template>

<script>
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
         *  `blue, red, gray и т.д.`
         */
        color: {
            type: String,
            default: 'black',
        },
    },

    computed: {
        momentDate() {
            if (this.$moment === null) return null
            const locale = this.$i18n ? this.$i18n.locale : 'ru'
            return this.$moment(this.value).locale(locale)
        },
        formattedDate() {
            if (this.momentDate === null) return this.value
            return this.momentDate.format(this.format)
        },
    },
}
</script>

<style lang="scss">
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
