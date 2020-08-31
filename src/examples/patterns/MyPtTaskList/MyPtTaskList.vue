<template>
    <div class="my-pt-task-list">
        <div v-if="loading">
            <div class="my-pt-task-list__loading-item" v-for="(n, index) in 5" :key="index">
                <span class="my-pt-task-list__glow-checkbox" />
                <span class="my-pt-task-list__glow-text"> <span>Loading</span> <span>cool</span> <span>state</span> </span>
            </div>
        </div>
        <div class="my-pt-task-list__items" v-if="noTasks && !this.loading">
            <div class="my-pt-task-list__wrapper-message">
                <span class="my-pt-task-list__icon-check" />
                <div class="my-pt-task-list__title-message">You have no tasks</div>
                <div class="my-pt-task-list__subtitle-message">Sit back and relax</div>
            </div>
        </div>
        <div class="my-pt-task-list__items" v-if="showTasks">
            <my-pt-task
                v-for="(task, index) in tasksInOrder"
                :key="index"
                :task="task"
                @archiveTask="$emit('archiveTask', $event)"
                @pinTask="$emit('pinTask', $event)"
            />
        </div>
    </div>
</template>

<script>
  import MyPtTask from '../../elements/MyElTask/MyElTask.vue'
  export default {
    name: "my-pt-task-list",
    components: {
      MyPtTask,
    },
    props: {
      /**
       Description for current prop
       */
      loading: {
        type: Boolean,
        default: false,
      },
      tasks: {
        type: Array,
        default: () => []
      },
    },
    computed: {
      noTasks() {
        return this.tasks.length === 0
      },
      showTasks() {
        return !this.loading && !this.noTasks
      },
      tasksInOrder() {
        return [
          ...this.tasks.filter(t => t.state === 'TASK_PINNED'),
          ...this.tasks.filter(t => t.state !== 'TASK_PINNED'),
        ];
      },
    },
  }
</script>

<style lang="scss">
.my-pt-task-list {
    $block-name: &;

    &__loading-item {
        height: 3rem;
        width: 100%;
        background: white;
        display: flex;
        align-items: center;
        line-height: 1rem;
        padding-left: $space-200;
    }

    &__glow-checkbox {
        margin-right: $space-200;
        @include size($space-150);
    }

    &__glow-checkbox,
    &__glow-text span {
        animation: $animation-glow;
        background: #eee;
        color: transparent;
        cursor: progress;
        display: inline-block;
    }

    &__items {
        position: relative;
        background: $color-white;
        min-height: 288px;
    }

    &__wrapper-message {
        @include position(absolute, 45% 0 auto 0);
        @include size(auto);
        transform: translate3d(0, -50%, 0);
        text-align: center;
    }

    &__title-message {
        font-size: $font-size-300;
        line-height: $line-height-250;
        font-weight: $font-weight-semi-bold;
        color: $color-gray;
    }

    &__subtitle-message {
        font-size: $font-size-300;
        line-height: $line-height-250;
        color: $color-gray;
    }

}
</style>