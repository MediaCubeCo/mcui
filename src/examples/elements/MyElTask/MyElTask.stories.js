import { action } from '@storybook/addon-actions'
import MyElTask from './MyElTask'

export default {
  title: 'Examples/MyElTask',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}
export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'Task_INBOX',
  updated_at: new Date(2019, 0, 1, 9, 0),
};

const taskTemplate = `<my-el-task :task="task" @archiveTask="onArchiveTask" @pinTask="onPinTask"/>`;

// default task state
export const Default = () => ({
  components: { MyElTask },
  template: taskTemplate,
  props: {
    task: {
      default: () => taskData,
    },
  },
  methods: actionsData,
});
// pinned task state
export const Pinned = () => ({
  components: { MyElTask },
  template: taskTemplate,
  props: {
    task: {
      default: () => ({
        ...taskData,
        state: 'TASK_PINNED',
      }),
    },
  },
  methods: actionsData,
});
// archived task state
export const Archived = () => ({
  components: { MyElTask },
  template: taskTemplate,
  props: {
    task: {
      default: () => ({
        ...taskData,
        state: 'TASK_ARCHIVED',
      }),
    },
  },
  methods: actionsData,
});