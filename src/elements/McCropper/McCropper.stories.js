import { text } from '@storybook/addon-knobs'

import McCropper from './McCropper'

export default {
    title: 'Elements/McCropper',
    component: McCropper,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
}
const getUniqueProps = key => {
    return {
        imgSrc: {
            default: text(
                'imgSrc',
                'https://yt3.ggpht.com/-xxp17w8gwH4/AAAAAAAAAAI/AAAAAAAAAAA/yoFDaHVr8os/s84-c-k-no-mo-rj-c0xffffff/photo.jpg',
                key,
            ),
        },
    }
}

const getCommonTags = ctx => {
    return {
        imgSrc: ctx.imgSrc,
        zoomable: ctx.zoomable,
    }
}

export const Default = () => ({
    components: {
        McCropper,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `
        <div style="max-width: 100px;">
            <mc-cropper v-bind="tagBind" />
        </div>
    `,
})

export const notZoomable = () => ({
    components: {
        McCropper,
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                zoomable: false,
            }
        },
    },
    props: {
        ...getUniqueProps('not-zoomable'),
    },
    template: `
        <div style="max-width: 100px;">
            <mc-cropper v-bind="tagBind" />
        </div>
    `,
})
