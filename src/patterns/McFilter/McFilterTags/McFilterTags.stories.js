import { value, filters, placeholders } from '../../../mocks/filterMocks'
import { handleConfirmAction } from '../../../helpers/delayedAction'
import _isEqual from "lodash/isEqual"
import _cloneDeep from "lodash/cloneDeep"

import McFilterTags from './McFilterTags'
import _isEmpty from "lodash/isEmpty"

export default {
  title: 'Patterns/McFilter/McFilterTags',
  component: McFilterTags,
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1801%3A5024',
    },
  },
}

const getCommonTags = ctx => {
  return {
    value: ctx.valuesName,
    filters: ctx.filters,
    placeholders: ctx.placeholders,
    activeTag: ctx.activeTag,
  }
}

export const Default = () => ({
  components: { McFilterTags },
  data() {
    return {
      valuesName: value.filter_name,
      activeTag: null,
      temporaryValuesName: {},
    }
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  props: {
    filters: {
      default: filters,
    },
    placeholders: {
      default: placeholders,
    },
  },
  methods: {
    onTagsChange(val) {
      if (_isEmpty(val)) {
        this.valuesName = {}
        return
      }
      this.valuesName = _cloneDeep(val)
    },
    onTagClick(tag) {
      this.activeTag = _isEqual(this.activeTag, tag) ? null : tag
      console.log('onTagClick', this.activeTag && this.activeTag.title)
    },
    allTagsClear() {
      this.temporaryValuesName = _cloneDeep(this.valuesName)
      this.valuesName = {}

      handleConfirmAction(
        this.clearTemporaryValues,
        this.revertClearedValues,
        this.placeholders.messages.accidentally_cleared
      )
    },
    clearTemporaryValues() {
      this.temporaryValuesName = {}
    },
    revertClearedValues() {
      this.valuesName = _cloneDeep(this.temporaryValuesName)
    },
  },
  template: `<mc-filter-tags v-bind="tagBind" @tag-change="onTagsChange" @tag-click="onTagClick" @clear="allTagsClear" />`,
})

