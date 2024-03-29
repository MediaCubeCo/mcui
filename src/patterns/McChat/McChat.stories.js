import { boolean, text } from '@storybook/addon-knobs'

import McChat from './McChat'
import McChatForm from './McChatForm/McChatForm'
import McChatComment from './McChatComment/McChatComment'
import McDrawer from '../McDrawer/McDrawer'
import McRoot from '../../templates/layouts/McRoot/McRoot'
import McButton from '../../elements/McButton/McButton'
import McTitle from '../../elements/McTitle/McTitle'
import McFieldText from '../../elements/McField/McFieldText/McFieldText'

import { comments } from '../../mocks/chatComments'

export default {
    title: 'Patterns/McChat/McChat',
    component: McChat,
    subcomponents: {
        McDrawer,
        McChatForm,
        McChatComment,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
        },
    },
}


export const Default = () => ({
    components: {
        McChat,
        McRoot,
        McButton,
        McTitle,
        McFieldText,
    },
    data() {
        return {
            value: '',
            comments: comments,
            name: 'Kirill Sushko',
        }
    },
    props: {
        title: {
            default: text('title', 'Chat', 'default'),
        },
        emptyMessage: {
            default: text('emptyMessage', 'No messages', 'default'),
        },
        width: {
            default: text('width', '320px', 'default'),
        },
        hideBg: {
            default: boolean('hideBg', false, 'default'),
        },
        removeBg: {
            default: boolean('removeBg', false, 'default'),
        },
        showInput: {
            default: boolean('showInput', true, 'default'),
        },
        editable: {
            default: boolean('editable', false, 'default'),
        },
        avatar: {
            default: text('avatar', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4', 'default'),
        },
        placeholder: {
            default: text('placeholder', 'Message...', 'default'),
        },
        dateFormat: {
            default: text('dateFormat', 'YYYY-MM-DD HH:mm', 'default'),
        },
        defaultUserName: {
            default: text('defaultUserName', 'System Comment', 'default'),
        },
        hasMoreMessages: {
            default: boolean('hasMoreMessages', false, 'default'),
        },
    },
    created() {
        this.$bus.on('chat-input', this.updateChatInput)
        this.$bus.on('chat-submit', this.onChatSubmit)
        this.$bus.on('chat-delete', this.onCommentDelete)
    },

    beforeDestroy() {
        this.$bus.off('chat-input', this.updateChatInput)
        this.$bus.off('chat-submit', this.onChatSubmit)
        this.$bus.off('chat-delete', this.onCommentDelete)
    },
    methods: {
        showChat() {
            // для вызова чата в проекте предпочтительно
            // использование миксина с коллбэком
            this.panelResult = this.$showPanel({
                component: 'McChat',
                width: this.width,
                openOn: 'right',
                hideBg: true,
                removeBg: this.removeBg,
                disableBgClick: false,
                keepAlive: false,
                props: {
                    title: this.title,
                    defaultUserName: this.defaultUserName,
                    hasMoreMessages: this.hasMoreMessages,
                    emptyMessage: this.emptyMessage,
                    showInput: this.showInput,
                    value: this.value,
                    editable: this.editable,
                    avatar: this.avatar,
                    placeholder: this.placeholder,
                    dateFormat: this.dateFormat,
                    comments: this.comments,
                },
            })
        },
        updateChatInput(value) {
            this.value = value
        },
        onChatSubmit() {
            const comment = {
                content: this.value,
                created_at: new Date().toString(),
                user: {
                    full_name: this.name,
                    avatar: this.avatar,
                },
            }
            this.comments.push(comment)
            this.value = ''
        },
        onCommentDelete(id) {
            console.log('onCommentDelete', id)
        },
    },
    template: `
        <mc-root>
            <mc-button @click.prevent="showChat">Show Chat</mc-button>
        </mc-root>
    `,
})
