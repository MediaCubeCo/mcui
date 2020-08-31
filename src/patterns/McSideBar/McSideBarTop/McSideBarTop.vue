<template>
  <div class="mc-side-bar-top">
    <mc-dropdown v-model="dropIsOpen">
      <mc-preview slot="activator">
        <img
            v-if="logoSrc"
            slot="left"
            class="mc-side-bar-top__img"
            :src="logoSrc"
            width="24"
            height="24"
            :alt="logoTitle"
        />
        <mc-svg-icon v-else-if="logoIcon" slot="left" class="rotate" name="mc_dashboard" />
        <mc-button slot="top" variation="white-link" :size="compact ? 'l-compact' : 'l'">
          <template v-if="!compact">
            {{ logoTitle }}
          </template>
          <mc-svg-icon slot="icon-append" class="rotate" name="arrow_drop_down" color="gray" />
        </mc-button>
      </mc-preview>

      <mc-dropdown-panel>
        <mc-button
          v-for="menuAppsItem in computedMenuApps"
          full-width
          text-align="left"
          variation="black-flat"
          :key="`menu-apps-item-${menuAppsItem.key}`"
          :href="menuAppsItem.href"
          :to="menuAppsItem.to"
          :is-active="menuAppsItem.isActive"
        >
            <mc-svg-icon slot="icon-prepend" :name="menuAppsItem.icon" />
          {{ menuAppsItem.name }}
        </mc-button>
      </mc-dropdown-panel>
    </mc-dropdown>
  </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import McDropdown from "../../McDropdown/McDropdown"
import McDropdownPanel from "../../McDropdown/McDropdownPanel/McDropdownPanel"
import McButton from "../../../elements/McButton/McButton"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import McPreview from "../../McPreview/McPreview"

export default {
  name: "McSideBarTop",
  components: {
    McDropdown,
    McDropdownPanel,
    McButton,
    McPreview,
    McSvgIcon,
  },
  data() {
    return {
      dropIsOpen: false,
    }
  },
  props: {
    /**
     *  Меню приложений
     *
     */
    menuApps: {
      type: Array,
      default: () => [],
    },
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
     */
    logoSrc: {
      type: String,
      default: "",
    },
    /**
     *  Имя иконки
     *  заголовка
     */
    logoIcon: {
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
  computed: {
    computedMenuApps() {
      const apps = []
      this.menuApps.forEach(app => {
        if (app.isVisible) {
          apps.push({
            key: _XEUtils.uniqueId(),
            ...app,
          })
        }
      })
      return apps
    }
  },
}
</script>

<style lang="scss">
.mc-side-bar-top {
  $block-name: &;
  @include reset-text-indents();

  .mc-dropdown__toggle {
    &:hover {
      cursor: pointer;
    }
    .mc-preview__left {
      margin-right: 0;
    }
    .mc-button {
      line-height: $line-height-250;
      &__text {
        margin-left: $space-100;
      }
      &__append {
        margin-left: 0;
      }
      .rotate {
        @include size($size-200);
      }
    }
  }
}
</style>