<template>
    <div class="mc-chat-comment" :class="classes" @click="handleClick">
        <a ref="a" href="javascript:void(0);" class="mc-chat-comment__back"></a>
        <mc-preview>
            <mc-avatar slot="left" size="400" rounded lazy :src="computedAvatar" />
            <mc-date slot="top" size="overline" color="dark-gray" :format="dateFormat" :value="comment.created_at" />
            <div slot="bottom" class="mc-chat-comment__title">
                <mc-title slot="top" :weight="computedTitle.weight" :color="computedTitle.color">
                    {{ computedTitle.name }}
                </mc-title>
                <mc-title v-if="comment.statusText" variation="overline" color="dark-gray">
                    {{ comment.statusText }}
                </mc-title>
                <mc-badge v-if="commentStatus" :variation="comment.status.color">
                    {{ comment.status.title }}
                </mc-badge>
                <mc-title v-else-if="comment.editing_title">
                    {{ comment.editing_title }}
                </mc-title>
            </div>
            <mc-title
                v-if="comment.content"
                slot="bottom"
                :ellipsis="false"
                :class="contentClasses"
                v-html="filteredComment"
            />
            <mc-title v-if="comment.message" slot="bottom" :ellipsis="false" class="mc-chat-comment__message">
                {{ comment.message }}
            </mc-title>
            <mc-button
                v-if="canEdit"
                slot="right"
                class="mc-chat-comment__btn"
                size="xs-compact"
                variation="gray-link"
                secondary-color="red"
                @click.prevent="handleDelete"
            >
                <mc-svg-icon slot="icon-prepend" name="delete" />
            </mc-button>
        </mc-preview>
    </div>
</template>

<script>
import _has from 'lodash/has'
import McPreview from '../../McPreview/McPreview'
import McTitle from '../../../elements/McTitle/McTitle'
import McDate from '../../../elements/McDate/McDate'
import McAvatar from '../../../elements/McAvatar/McAvatar'
import McBadge from '../../../elements/McBadge/McBadge'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McButton from '../../../elements/McButton/McButton'
/**
 * Используется только в McChat
 */
export default {
    name: 'McChatComment',
    components: {
        McPreview,
        McTitle,
        McDate,
        McAvatar,
        McBadge,
        McSvgIcon,
        McButton,
    },
    props: {
        /**
         * Объект данных
         * комментария
         */
        comment: {
            type: Object,
            required: true,
        },
        /**
         * Можно липроизводить
         * действия с комментарием
         */
        editable: {
            type: Boolean,
            default: false,
        },
        /**
         * Значение по умолчанию
         * системного комментария
         */
        defaultUserName: {
            type: String,
            default: 'System comment',
        },
        /**
         * Формат даты (moment.js)
         */
        dateFormat: {
            type: String,
            default: 'YYYY-MM-DD HH:mm',
        },
    },
    computed: {
        classes() {
            return {
                'mc-chat-comment--editable': this.canEdit,
            }
        },
        canEdit() {
            return this.editable && !('status' in this.comment)
        },
        computedAvatar() {
            return this.comment?.moderator?.avatar ?? this.comment?.user?.avatar ?? this.comment?.user?.profile?.avatar
        },
        computedTitle() {
            const hasUserName = _has(this.comment, ['user', 'full_name']) && this.comment.user.full_name
            return {
                name: hasUserName ? this.comment.user.full_name : this.defaultUserName,
                weight: hasUserName ? 'semi-bold' : 'medium',
                color: hasUserName ? 'black' : 'purple',
            }
        },
        filteredComment() {
            let nl2br = this.$options.filters.nl2br
            return nl2br ? nl2br(this.commentWithLinks) : this.commentWithLinks
        },
        commentWithLinks() {
            const regExp = /((http|https):\/\/)?(([0-9a-zA-Zа-яА-Я.-]*)\.([a-zA-Zа-яА-Я]+[^\s,.;])(.*)?)/gi
            return this.comment.content.replace(regExp, match => {
                const url = /^http/.test(match) ? match : `http://${match}`
                return `<a class="mc-chat-comment__link" href='${url}' target="_blank">${match.trim()}</a>`
            })
        },
        commentStatus() {
            return (this.comment.status !== null && this.comment.status !== undefined) || !this.comment.status < 0
        },
        contentClasses() {
            return {
                'mc-chat-comment__content': !!this.comment.status,
                [`mc-chat-comment__content--variation-${this.comment.status?.color}`]: !!this.comment.status?.color,
            }
        },
    },
    methods: {
        handleDelete() {
            this.$emit('delete', this.comment.id)
        },
        handleClick() {
            this.$refs.a && this.$refs.a.focus()
        },
    },
}
</script>

<style lang="scss">
.mc-chat-comment {
    $block-name: &;
    padding: $space-50;
    border-radius: $radius-100;
    display: block;
    cursor: default;
    position: relative;
    &__title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        @include child-indent-right($space-50);
        > * {
            margin-bottom: $space-50;
        }
        .mc-badge {
            flex-shrink: 0;
        }
        .mc-title {
            width: auto;
            overflow: hidden;
        }
    }
    &__back {
        text-decoration: none;
        display: block;
        @include position(absolute, 0);
        border-radius: $radius-100;
    }

    &__btn {
        visibility: hidden;
    }
    &__link {
        color: $color-purple;
        &:hover,
        &:focus {
            color: $color-hover-purple;
        }

        &:active {
            color: $color-hover-purple;
        }
    }

    .mc-preview {
        z-index: 10;
        position: relative;
    }

    .mc-preview__bottom {
        margin-top: $space-50;
    }
    &__content {
        margin-top: $space-50;
        border-radius: $radius-100;
        padding: $space-150 $space-200;
        &--variation {
            @each $color, $value in $token-colors {
                &-#{$color} {
                    &,
                    &-outline {
                        @if $color == 'outline-gray' {
                            background-color: $color-hover-gray;
                        } @else {
                            background-color: rgba($value, 0.1);
                        }
                    }
                }
            }
        }
    }
    &__message {
        margin-top: $space-100;
        padding: $space-150 $space-200;
        border-radius: $radius-100;
        background-color: $color-hover-gray;
    }
    &--editable {
        cursor: pointer;
        &:focus-within {
            background-color: $color-hover-gray;
            #{$block-name}__btn {
                visibility: visible;
            }
        }
        &:active {
            background-color: $color-hover-gray;
            #{$block-name}__btn {
                visibility: visible;
            }
        }
    }
}
</style>
