import { text, select, boolean, array, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import McDatePicker from "./McDatePicker";

export default {
  title: "Elements/McDatePicker",
  component: McDatePicker,
  parameters: {
    componentSubtitle: "Status: In progress",
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=0%3A1"
    }
  }
};

const types = {
  date: "date",
  datetime: "datetime",
  year: "year",
  month: "month",
  time: "time",
  week: "week"
};

const langs = {
  en: "en",
  ru: "ru",
  es: "es"
};

const getUniqueProps = key => {
  return {
    type: {
      default: select("type", types, "date", key)
    },
    helpText: {
      default: text("helpText", "Вспомогательный текст", key)
    },
    disabled: {
      default: boolean("disabled", false, key)
    },
    range: {
      default: boolean("range", false, key)
    },
    clearable: {
      default: boolean("clearable", true, key)
    },
    editable: {
      default: boolean("editable", true, key)
    },
    placeholder: {
      default: text("placeholder", "Введите", key)
    },
    name: {
      default: text("name", "DatepickerName", key)
    },
    lang: {
      default: select("lang", langs, "en", key)
    },
    format: {
      default: text("format", "DD.MM.YYYY", key)
    },
    toFormat: {
      default: text("toFormat", "YYYY-MM-DD", key)
    },
    popupStyle: {
      default: object("popupStyle", {}, key)
    },
    placeholders: {
      default: object(
        "placeholders",
        {
          week: "Неделя",
          month: "Месяц",
          quarter: "Квартал",
          year: "Год",
          confirm: "Применить"
        },
        key
      )
    }
  };
};

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
    inline: ctx.inline,
    popupStyle: ctx.popupStyle,
    placeholders: ctx.placeholders
  };
};

const actionsData = {
  handleClick: action("clicked"),
  handlerDisabledDate(date) {
    return date <= new Date().setTime(Date.now() - 24 * 3600 * 1000);
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
        disabledDate: this.handlerDisabledDate
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
    }
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
