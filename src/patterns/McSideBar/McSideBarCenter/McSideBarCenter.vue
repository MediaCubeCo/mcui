<template>
  <div class="mc-side-bar-center">
    <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">{{title}}</mc-title>
    <div v-if="computedMenuMain && computedMenuMain.length" class="mc-side-bar-center__content">
      <mc-side-bar-button
          v-for="menuMainItem in computedMenuMain"
          :key="menuMainItem.id"
          :info="menuMainItem.info"
          :href="menuMainItem.href"
          :to="menuMainItem.to"
          :icon="menuMainItem.icon"
          :title="menuMainItem.name"
          :compact="compact"
          :exact="isExact"
      />
    </div>
    <mc-separator
        v-if="computedMenuMain && computedMenuMain.length"
        color="dark-gray"
        indent-top="150"
        indent-bottom="150"
        :indent-left="compact ? '0' : '100'"
        :indent-right="compact ? '0' : '100'"
    />
    <mc-side-bar-button
        v-if="chatraConfig"
        icon="chat_messages"
        :title="chatraConfig.title"
        :compact="compact"
        @click="handleToggleUserback"
    />
    <mc-side-bar-button
        v-if="userbackConfig"
        icon="bug_report"
        :title="userbackConfig.title"
        :compact="compact"
        @click="handleToggleUserback"
    />
  </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import _has from "lodash/has"
import McTitle from "../../../elements/McTitle/McTitle"
import McSideBarButton from "../McSideBarButton/McSideBarButton"
import McSeparator from "../../../elements/McSeparator/McSeparator"
export default {
  name: "McSideBarCenter",
  components: {
    McTitle,
    McSideBarButton,
    McSeparator,
  },
  props: {
    /**
     *  Заголовок
     */
    title: {
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
     *  Компактный вид
     */
    compact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuUserbackIsOpen: false,
    }
  },
  mounted() {
    this.userbackConfig && this.initUserback()
  },
  computed: {
    computedMenuMain() {
      return this.menuMain.map(i => {
        return {
          id: _XEUtils.uniqueId(),
          ...i,
        }
      })
    },
    isExact() {
      if (!this.$route || !this.$route.name) return false
      const hasIndex = this.$route.name.includes("index")
      return hasIndex && !this.$route.name.includes("id")
    },
    computedUserbackSettings() {
      return {
        language: _has(this.userbackConfig, "settings.lang")
            ? this.userbackConfig.settings.lang
            : "en",
        style: "text",
        position: "e",
        autohide: true, // не отображаем, т.к. привязка к кнопке в хедере
        logo: this.logoSrc,
        name_field: false, // не выводим так как будем передавать в кастомных даннных.
        name_field_mandatory: false, // не выводим так как будем передавать в кастомных даннных.
        email_field: false, // не выводим так как будем передавать в кастомных даннных.
        email_field_mandatory: false, // не выводим так как будем передавать в кастомных даннных.
        comment_field: true,
        comment_field_mandatory: true,
        display_category: false,
        display_feedback: false,
        main_button_text_colour: "#FFFFFF", // hex colour
        main_button_background_colour: "#4285F4", // hex colour
        rating_type: "emoji",
        ...(_has(this.userbackConfig, "settings") ? this.userbackConfig.settings : {}),
      }
    },
    computedUserbackCustomData() {
      const user = this.user
      const data = {
        user_id: user.id,
        email: user.email || "",
        name: user.name,
      }
      if (this.user.company) {
        const company = user.company
        data.company = `${company.first_name}${company.last_name ? ` ${company.last_name}` : ""}`
      }
      return data
    },
  },
  methods: {
    initUserback() {
      this.setUserbackData()
      ;(function(id) {
        const script = document.getElementById(id)
        script && script.remove()

        const container = document.getElementsByClassName("userback-button-container")[0]
        container && container.remove()

        const s = document.createElement("script")
        s.id = id
        s.async = 1
        s.src = "https://static.userback.io/widget/v1.js"
        const parent_node = document.head || document.body
        parent_node.appendChild(s)
      })("userback-sdk")
    },
    setUserbackData() {
      window.Userback = window.Userback || {}
      window.Userback.access_token = this.userbackConfig.token
      window.Userback.widget_settings = this.computedUserbackSettings
      window.Userback.categories = this.userbackConfig.categories
      if (this.user) {
        window.Userback.custom_data = this.computedUserbackCustomData
      }
    },
    handleToggleUserback() {
      this.menuUserbackIsOpen ? window.Userback.close() : window.Userback.open()
    },
  },
}
</script>

<style lang="scss">
.mc-side-bar-center {
  $block-name: &;
  //overflow: hidden;

  &__title {
    margin: $space-100;
  }

  &__content {
    @include child-indent-bottom($space-50);
  }
}
</style>