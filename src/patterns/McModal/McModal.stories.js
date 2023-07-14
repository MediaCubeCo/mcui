import { boolean, number, select } from '@storybook/addon-knobs'

import McModal from './McModal'
import McButton from '../../elements/McButton/McButton'
import McTitle from '../../elements/McTitle/McTitle'

const getCommonTags = ctx => {
    return {
        maxWidth: ctx.maxWidth,
        clickToClose: ctx.clickToClose,
        arrowVisible: ctx.arrowVisible,
        closeVisible: ctx.closeVisible,
        secondaryModal: ctx.secondaryModal,
        scrollableContent: ctx.scrollableContent,
        separators: ctx.separators,
        headerAlign: ctx.headerAlign,
        topPadding: ctx.topPadding,
        variation: ctx.variation,
    }
}

export default {
    title: 'Patterns/McModal',
    component: McModal,
    parameters: {
        componentSubtitle: 'Status: In Progress',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=2368%3A45351',
        },
    },
}

// mc-modal default
export const Default = () => ({
    components: {
        McModal,
        McButton,
        McTitle,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        maxWidth: {
            default: number('maxWidth', 510, {}, 'default'),
        },
        clickToClose: {
            default: boolean('clickToClose', true, 'default'),
        },
        arrowVisible: {
            default: boolean('arrowVisible', false, 'default'),
        },
        closeVisible: {
            default: boolean('closeVisible', true, 'default'),
        },
        secondaryModal: {
            default: boolean('secondaryModal', false, 'default'),
        },
        scrollableContent: {
            default: boolean('scrollableContent', true, 'default'),
        },
        separators: {
            default: boolean('separators', true, 'default'),
        },
        headerAlign: {
            default: select('headerAlign', ['left', 'center'], 'center', 'default'),
        },
        topPadding: {
            default: boolean('topPadding', false, 'default'),
        },
        hasTitle: {
            default: boolean('hasTitle', true, 'default'),
        },
        variation: {
            default: select('variation', ['default', 'info'], 'default', 'default'),
        },
    },
    template: `
        <div>
            <mc-button @click.prevent="$modal.show('testModal')">Open</mc-button>
            <mc-modal name="testModal" v-bind="tagBind" @back="$modal.hide('testModal')">
                <template v-if="hasTitle" slot="title">
                    <mc-title variation="h4" :text-align="headerAlign">Заголовок</mc-title>
                </template>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis odio nunc, sagittis ut metus nec, congue dignissim turpis. Nunc mollis malesuada enim, vitae tincidunt urna fermentum vitae. Proin mollis diam quis interdum congue. Suspendisse eleifend metus ante, vitae viverra metus bibendum eget. Sed sed orci rhoncus erat varius aliquam. Nunc dignissim tortor eros, a fringilla nisl ullamcorper in. Nunc dignissim fringilla augue non facilisis. Nam ut pretium quam. Proin vel neque a arcu pretium molestie.
                Aliquam eget nisi eleifend, euismod lacus ac, finibus mi. Vivamus id risus tempus, lacinia nibh quis, euismod purus. Praesent porttitor enim non dui vestibulum, sit amet ullamcorper eros molestie. Nam porta leo sit amet libero laoreet pulvinar. Nulla ultricies ligula enim, pretium malesuada turpis imperdiet at. Ut vulputate tortor vitae maximus vulputate. Fusce elementum justo sed quam vehicula gravida. Quisque nunc felis, dignissim quis ex ac, aliquet sollicitudin purus. Suspendisse eget porta justo. Quisque et dictum magna, semper semper sapien. Vestibulum purus nisl, facilisis quis auctor vitae, vestibulum at eros. Pellentesque tempus neque diam, ut congue nisi ultrices et.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis odio nunc, sagittis ut metus nec, congue dignissim turpis. Nunc mollis malesuada enim, vitae tincidunt urna fermentum vitae. Proin mollis diam quis interdum congue. Suspendisse eleifend metus ante, vitae viverra metus bibendum eget. Sed sed orci rhoncus erat varius aliquam. Nunc dignissim tortor eros, a fringilla nisl ullamcorper in. Nunc dignissim fringilla augue non facilisis. Nam ut pretium quam. Proin vel neque a arcu pretium molestie.
                Aliquam eget nisi eleifend, euismod lacus ac, finibus mi. Vivamus id risus tempus, lacinia nibh quis, euismod purus. Praesent porttitor enim non dui vestibulum, sit amet ullamcorper eros molestie. Nam porta leo sit amet libero laoreet pulvinar. Nulla ultricies ligula enim, pretium malesuada turpis imperdiet at. Ut vulputate tortor vitae maximus vulputate. Fusce elementum justo sed quam vehicula gravida. Quisque nunc felis, dignissim quis ex ac, aliquet sollicitudin purus. Suspendisse eget porta justo. Quisque et dictum magna, semper semper sapien. Vestibulum purus nisl, facilisis quis auctor vitae, vestibulum at eros. Pellentesque tempus neque diam, ut congue nisi ultrices et.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis odio nunc, sagittis ut metus nec, congue dignissim turpis. Nunc mollis malesuada enim, vitae tincidunt urna fermentum vitae. Proin mollis diam quis interdum congue. Suspendisse eleifend metus ante, vitae viverra metus bibendum eget. Sed sed orci rhoncus erat varius aliquam. Nunc dignissim tortor eros, a fringilla nisl ullamcorper in. Nunc dignissim fringilla augue non facilisis. Nam ut pretium quam. Proin vel neque a arcu pretium molestie.
                Aliquam eget nisi eleifend, euismod lacus ac, finibus mi. Vivamus id risus tempus, lacinia nibh quis, euismod purus. Praesent porttitor enim non dui vestibulum, sit amet ullamcorper eros molestie. Nam porta leo sit amet libero laoreet pulvinar. Nulla ultricies ligula enim, pretium malesuada turpis imperdiet at. Ut vulputate tortor vitae maximus vulputate. Fusce elementum justo sed quam vehicula gravida. Quisque nunc felis, dignissim quis ex ac, aliquet sollicitudin purus. Suspendisse eget porta justo. Quisque et dictum magna, semper semper sapien. Vestibulum purus nisl, facilisis quis auctor vitae, vestibulum at eros. Pellentesque tempus neque diam, ut congue nisi ultrices et.
            </mc-modal>
        </div>
    `,
})
