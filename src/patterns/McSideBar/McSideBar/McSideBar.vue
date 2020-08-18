<template>
  <div class="mc-side-bar" :class="classes">
    <mc-side-bar-top :logo-title="logoTitle" :logo-src="logoSrc" :compact="prettyCompact" />
    <mc-side-bar-center
        :title="menuMainTitle"
        :menu-main="menuMain"
        :menu-additional="menuAdditional"
        :chatra-config="chatraConfig"
        :userback-config="userbackConfig"
        :user="user"
        :compact="prettyCompact"
    />
    <mc-side-bar-bottom :hide-text="hideText" :compact="prettyCompact" @toggle-size="handleToggleSize"/>
  </div>
</template>

<script>
import McSideBarTop from "../McSideBarTop/McSideBarTop"
import McSideBarCenter from "../McSideBarCenter/McSideBarCenter"
import McSideBarBottom from "../McSideBarBottom/McSideBarBottom"
export default {
  name: "McSideBar",
  components: {
    McSideBarTop,
    McSideBarCenter,
    McSideBarBottom,
  },
  props: {
    /**
     *  Название сервиса
     *
     */
    logoTitle: {
      type: String,
      default: "Dashboard",
    },
    /**
     *  Путь до изображения
     *
     */
    logoSrc: {
      type: String,
      default: "",
    },
    /**
     *  Заголовок
     *  центрального блока
     */
    menuMainTitle: {
      type: String,
      default: "",
    },
    /**
     *  Центральное меню
     *
     */
    menuMain: {
      type: Array,
      default: () => [],
    },
    /**
     *  Меню при клике на +
     *
     */
    menuAdditional: {
      type: Array,
      default: () => [],
    },
    /**
     *  Id чатры
     *
     */
    chatraConfig: {
      type: Object,
      default: null,
    },
    /**
     *  Userback Config
     *
     */
    userbackConfig: {
      type: Object,
      default: null,
    },
    /**
     *  Данные пользователя
     *
     */
    user: {
      type: Object,
      default: null,
    },
    /**
     *  Текст кнопки
     *  сворачивания меню
     */
    hideText: {
      type: String,
      default: "",
    },
    /**
     *  Компактный вид
     */
    compact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prettyCompact: this.compact,
      hasCompactClass: this.compact,
    }
  },
  watch: {
    hasCompactClass(newValue) {
      if (newValue) {
          setTimeout(()=> {
            this.prettyCompact = newValue
          }, 280)
      } else {
        this.prettyCompact = newValue
      }
    },
    compact(newValue) {
      this.hasCompactClass = newValue
    }
  },
  computed: {
    classes() {
      return {
        "mc-side-bar--compact": this.hasCompactClass,
      }
    },
  },
  methods: {
    handleToggleSize() {
      this.hasCompactClass = !this.hasCompactClass
      this.$emit('compact', this.hasCompactClass)
    }
  },
}
</script>

<style lang="scss">
.mc-side-bar {
  $block-name: &;

  display: flex;
  flex-direction: column;
  width: 216px;
  background-color: $color-black;
  padding: $space-150 $space-100 $space-400;
  transition: width 300ms ease;
  overflow: hidden;
  @include child-indent-bottom($space-400);

  &--compact {
    width: $space-700;
  }
}
</style>