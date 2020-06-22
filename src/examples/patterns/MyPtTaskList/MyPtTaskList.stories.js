import MyPtTaskList from './MyPtTaskList';
import MyElTask from '../../elements/MyElTask/MyElTask';
import { taskData, actionsData } from '../../elements/MyElTask/MyElTask.stories';

const coloredList = () => {
  return {
    template: '<div style="background-color: lightcyan;"><story/></div>',
  };
}

export default {
  title: 'Examples/MyPtTaskList',
  parameters: {
    componentSubtitle: 'Subtitle for this component',
  },
  description: 'Component description',
  subcomponents: { MyElTask },
  excludeStories: /.*Data$/,
  decorators: [coloredList],
}

export const defaultTasksData = [
  { ...taskData, id: "1", title: "Task 1" },
  { ...taskData, id: "2", title: "Task 2" },
  { ...taskData, id: "3", title: "Task 3" },
  { ...taskData, id: "4", title: "Task 4" },
  { ...taskData, id: "5", title: "Task 5" },
  { ...taskData, id: "6", title: "Task 6" }
]

export const withPinnedTasksData = [
  ...defaultTasksData.slice(0, 5),
  { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
]

// default TaskList state
export const Default = () => ({
  components: { MyPtTaskList },
  template: `<my-pt-task-list :tasks="tasks" @archiveTask="onArchiveTask" @pinTask="onPinTask"/>`,
  props: {
    tasks: {
      default: () => defaultTasksData
    }
  },
  methods: actionsData
});
// tasklist with pinned tasks
export const WithPinnedTasks = () => ({
  components: { MyPtTaskList },
  template: `<my-pt-task-list :tasks="tasks" @archiveTask="onArchiveTask" @pinTask="onPinTask"/>`,
  props: {
    tasks: {
      default: () => withPinnedTasksData
    }
  },
  methods: actionsData
});
// tasklist in loading state
export const Loading = () => ({
  components: { MyPtTaskList },
  template: `<my-pt-task-list loading @archiveTask="onArchiveTask" @pinTask="onPinTask"/>`,
  methods: actionsData
});
// tasklist no tasks
export const Empty = () => ({
  components: { MyPtTaskList },
  template: `<my-pt-task-list @archiveTask="onArchiveTask" @pinTask="onPinTask"/>`,
  methods: actionsData
});