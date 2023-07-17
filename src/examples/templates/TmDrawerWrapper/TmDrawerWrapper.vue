<template>
    <div class="tm-drawer-wrapper">
        <mc-drawer v-bind="drawerProps" :title="`Hi, ${userName}!`" @close-panel="handleClose">
            <mc-field-text
                v-model="prettyUserAge"
                name="age"
                title="How old are you?"
                placeholder="Enter"
                type="number"
            />
            <mc-title v-for="num in 5" :key="num" class="mt-300" :ellipsis="false">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis id iure iusto placeat sapiente
                sint ullam voluptas. Amet animi aspernatur doloremque explicabo fuga illo modi neque nisi odit, porro
                repudiandae sunt voluptatem voluptatibus. At consequatur cupiditate distinctio dolore dolores ea eaque
                et excepturi, fugiat id ipsam iure, laborum nisi optio praesentium quaerat quisquam rerum. Amet, aut
                autem commodi consectetur consequuntur culpa dignissimos expedita illum incidunt inventore maxime
                necessitatibus, neque officia optio possimus quae sapiente veritatis vitae? Ab aliquam, doloremque et
                ipsam laudantium quae quisquam voluptatem voluptatibus? Architecto asperiores eius expedita facere magni
                minima molestias, nam officia omnis ratione soluta.
            </mc-title>
            <mc-button slot="footer" @click.prevent="handleClose">Close</mc-button>
        </mc-drawer>
    </div>
</template>

<script>
import McDrawer from '../../../patterns/McDrawer/McDrawer'
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'
import McTitle from '../../../elements/McTitle/McTitle'
import McButton from '../../../elements/McButton/McButton'
/**
 * Пример пользовательской
 * боковой панели на проекте
 * (подключается глобально!)
 */
export default {
    name: 'TmDrawerWrapper',
    components: {
        McDrawer,
        McFieldText,
        McTitle,
        McButton,
    },

    props: {
        userName: {
            type: String,
            required: true,
        },
        userAge: {
            type: Number,
            default: 0,
        },
        drawerProps: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            prettyUserAge: this.userAge,
        }
    },
    methods: {
        handleClose() {
            /**
             * Событие закрытия панели
             * @property {Object}
             */
            this.$emit('closePanel', { userAge: this.prettyUserAge })
        },
    },
}
</script>

<style lang="scss">
.tm-drawer-wrapper {
    $block-name: &;
    height: 100%;
}
</style>
