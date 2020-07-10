<template>
    <div :class="taskClass">
        <label class="my-pt-task__checkbox">
            <input type="checkbox" :checked="isChecked" :disabled="true" name="checked" />
            <span class="my-pt-task__checkbox-custom" @click="$emit('archiveTask', task.id)" />
        </label>
        <div class="my-pt-task__title">
            <input type="text" :readonly="true" :value="task.title" placeholder="Input title" />
        </div>
        <div class="my-pt-task__actions">
            <a @click="$emit('pinTask', task.id)" v-if="!isChecked">
                <span class="my-pt-task__actions-icon" />
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'my-el-task',
    props: {
      task: {
        type: Object,
        required: true,
        default: () => ({
          id: '',
          state: '',
          title: '',
        }),
      },
    },
    computed: {
      taskClass() {
        return `my-pt-task ${this.task.state}`
      },
      isChecked() {
        return this.task.state === 'TASK_ARCHIVED'
      },
    },
  };
</script>

<style lang="scss">

.my-pt-task {
    $block-name: &;
    font-size: $font-size-s;
    line-height: $line-height-m;
    display: flex;
    flex-wrap: wrap;
    @include size(100%, 3rem);
    background: $color-white;
    transition: all ease-out 150ms;

    &__checkbox {
        margin: 0 $space-150;
    }

    &__title {
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    input[type="text"] {
        width: 100%;

        &:focus {
            cursor: text;
        }
    }

    &__actions {
        transition: all 200ms ease-in;
        padding-right: $space-200;

        a {
            display: inline-block;
            vertical-align: top;
            text-align: center;
            color: #eee;

            &:hover {
                color: $color-blue;
            }
            &:active {
                color: $color-gray;
            }
        }

        &-icon {
            font-size: 16px;
            line-height: $line-height-m;
            text-align: center;
            margin-left: $space-200;
            &::before {
                content: "*";
            }
        }
    }

    &.TASK_PINNED {
        a {
            color: $color-blue;
        }
    }
    &.TASK_ARCHIVED {
        input[type="text"] {
            color: #aaa;
        }
    }
}
</style>