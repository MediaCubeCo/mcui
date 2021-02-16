<template>
    <div class="mc-side-bar-center">
        <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">{{
            title
        }}</mc-title>
        <div v-if="computedMenuMain && computedMenuMain.length" class="mc-side-bar-center__content">
            <mc-side-bar-button
                v-for="menuMainItem in computedMenuMain"
                :key="menuMainItem.id"
                :info="menuMainItem.info"
                :href="menuMainItem.href"
                :to="menuMainItem.to"
                :icon="menuMainItem.icon"
                :icon-color="menuMainItem.iconColor"
                :title="menuMainItem.name"
                :compact="compact"
                with-tooltip
            />
        </div>
        <mc-separator
            v-if="chatraConfig || userbackConfig"
            color="dark-gray"
            indent-top="150"
            indent-bottom="150"
            :indent-left="compact ? '0' : '100'"
            :indent-right="compact ? '0' : '100'"
        />
        <mc-side-bar-button
            v-if="chatraConfig"
            icon="chat_messages"
            :title="chatraConfig.title"
            :compact="compact"
            with-tooltip
            @click="$emit('handlerChatraClick')"
        />
        <mc-side-bar-button
            v-if="userbackConfig"
            icon="bug_report"
            :title="userbackConfig.title"
            :compact="compact"
            with-tooltip
            @click="$emit('handlerUserbackClick')"
        />
    </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import _has from 'lodash/has'
import McTitle from '../../../elements/McTitle/McTitle'
import McSideBarButton from '../McSideBarButton/McSideBarButton'
import McSeparator from '../../../elements/McSeparator/McSeparator'
export default {
    name: 'McSideBarCenter',
    components: {
        McTitle,
        McSideBarButton,
        McSeparator,
    },
    props: {
        /**
         *  Заголовок
         */
        title: {
            type: String,
            default: '',
        },
        /**
         *  Центральное меню
         *
         */
        menuMain: {
            type: Array,
            default: () => [],
        },
        /**
         *  Меню при клике на +
         *
         */
        menuAdditional: {
            type: Array,
            default: () => [],
        },
        /**
         *  Id чатры
         *
         */
        chatraConfig: {
            type: Object,
            default: null,
        },
        /**
         *  Userback Config
         *
         */
        userbackConfig: {
            type: Object,
            default: null,
        },
        /**
         *  Данные пользователя
         *
         */
        user: {
            type: Object,
            default: null,
        },
        /**
         *  Компактный вид
         */
        compact: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            menuUserbackIsOpen: false,
        }
    },
    computed: {
        computedMenuMain() {
            return this.menuMain.map(i => {
                return {
                    id: _XEUtils.uniqueId(),
                    ...i,
                }
            })
        },
    },
}
</script>

<style lang="scss">
.mc-side-bar-center {
    $block-name: &;
    //overflow: hidden;

    &__title {
        margin: $space-100;
    }

    &__content {
        @include child-indent-bottom($space-50);
    }
}
</style>
