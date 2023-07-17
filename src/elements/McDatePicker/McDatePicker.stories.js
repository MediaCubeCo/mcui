import { text, select, boolean, array, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import McDatePicker from './McDatePicker'
import { LANGS } from '../../helpers/storybookVariables'

export default {
    title: 'Elements/McDatePicker',
    component: McDatePicker,
    parameters: {
        componentSubtitle: 'Status: In progress',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=0%3A1',
        },
    },
}

const types = {
    date: 'date',
    datetime: 'datetime',
    year: 'year',
    month: 'month',
    time: 'time',
    week: 'week',
}

const minutes = Array.from({ length: 60 }).map((_, i) => i)
const hours = Array.from({ length: 24 })
    .map((_, i) => i)
    .filter(m => m >= 3)

const getUniqueProps = key => {
    return {
        type: {
            default: select('type', types, 'datetime', key),
        },
        helpText: {
            default: text('helpText', 'Вспомогательный текст', key),
        },
        disabled: {
            default: boolean('disabled', false, key),
        },
        range: {
            default: boolean('range', false, key),
        },
        clearable: {
            default: boolean('clearable', true, key),
        },
        editable: {
            default: boolean('editable', true, key),
        },
        placeholder: {
            default: text('placeholder', 'Введите', key),
        },
        name: {
            default: text('name', 'DatepickerName', key),
        },
        lang: {
            default: select('lang', LANGS, 'en', key),
        },
        format: {
            default: text('format', 'DD.MM.YYYY HH:mm:SS', key),
        },
        toFormat: {
            default: text('toFormat', 'YYYY-MM-DD HH:mm:SS', key),
        },
        popupStyle: {
            default: object('popupStyle', {}, key),
        },
        minutes: {
            default: array('minutes', minutes, ',', key),
        },
        hours: {
            default: array('hours', hours, ',', key),
        },
        minWidth: {
            default: text('minWidth', '240px', key),
        },
        useFormat: {
            default: boolean('useFormat', false, key),
        },
        useTimezone: {
            default: boolean('useTimezone', false, key),
        },
        timezone: {
            default: text('timezone', 'UTC', key),
        },
        setDefaultToday: {
            default: boolean('setDefaultToday', true, key),
        },
        placeholders: {
            default: object(
                "placeholders",
                {
                    week: "Неделя",
                    month: "Месяц",
                    quarter: "Квартал",
                    year: "Год",
                    confirm: "Применить",
                    },
                key
            ),
        },
    }
}

const getCommonTags = ctx => {
    return {
        type: ctx.type,
        title: ctx.title,
        helpText: ctx.helpText,
        disabled: ctx.disabled,
        clearable: ctx.clearable,
        editable: ctx.editable,
        placeholder: ctx.placeholder,
        name: ctx.name,
        lang: ctx.lang,
        errors: ctx.errors,
        format: ctx.format,
        toFormat: ctx.toFormat,
        range: ctx.range,
        minutes: ctx.minutes,
        hours: ctx.hours,
        timezone: ctx.timezone,
        useFormat: ctx.useFormat,
        useTimezone: ctx.useTimezone,
        customPresets: ctx.customPresets,
        inline: ctx.inline,
        minWidth: ctx.minWidth,
        appendToBody: ctx.appendToBody,
        setDefaultToday: ctx.setDefaultToday,
        popupStyle: ctx.popupStyle,
        placeholders: ctx.placeholders,
    }
}

const actionsData = {
  handleClick: action("clicked"),
  handlerDisabledDate(date) {
    return date <= new Date().setTime(Date.now() - 24 * 3600 * 1000);
  },
  handlerDisabledTime(date) {
    return date <= new Date().setHours(new Date().getHours() - 3);
  }
};

export const Default = () => ({
  components: { McDatePicker },
  data() {
    return {
      date: null
    };
  },
  computed: {
    tagBind() {
      return {
        ...getCommonTags(this),
        disabledDate: this.handlerDisabledDate,
        disabledTime: this.handlerDisabledTime,
      };
    }
  },
  props: {
    ...getUniqueProps("default"),
    title: {
      default: text("title", "Default", "default")
    },
    errors: {
      default: array(
        "errors",
        ["Необходимо выбрать период", "Нужно больше золота"],
        ",",
        "default"
      )
    },
    appendToBody: boolean("appendToBody", true, "default"),
  },
  methods: actionsData,
  template: `<mc-date-picker v-model="date" v-bind="tagBind" />`
});

// mc-date-picker range
export const Range = () => ({
  components: { McDatePicker },
  data() {
    return {
      date: null
    };
  },
  computed: {
    tagBind() {
      return {
        ...getCommonTags(this),
        disabledDate: this.handlerDisabledDate
      };
    }
  },
  props: {
    ...getUniqueProps("range"),
    title: {
      default: text("title", "Range", "range")
    },
    errors: {
      default: array("errors", [], ",", "range")
    },
    customPresets: {
      default: object('customPresets', [
        {
          title: "Custom",
          period: ["2025-05-01", "2025-05-31"],
        }
      ], "range")
    },
    range: {
      default: true
    }
  },
  methods: actionsData,
  template: `<mc-date-picker v-model="date" v-bind="tagBind" />`
});

// mc-date-picker inline
export const Inline = () => ({
  components: { McDatePicker },
  data() {
    return {
      date: null
    };
  },
  computed: {
    tagBind() {
      return {
        ...getCommonTags(this)
      };
    }
  },
  props: {
    ...getUniqueProps("inline"),
    inline: {
      default: true
    },
    helpText: {
      default: ""
    }
  },
  template: `<mc-date-picker v-model="date" v-bind="tagBind" />`
});
