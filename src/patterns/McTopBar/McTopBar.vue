<template>
  <div class="mc-top-bar">
    <div class="mc-top-bar__inner">
      <div v-if="$slots.left" class="mc-top-bar__left">
        <slot name="left" />
      </div>
      <div class="mc-top-bar__right">
        <slot name="right" />
        <mc-button v-if="menuLangs && menuLangs.length" variation="black-flat" size="s" uppercase>
          {{ menuLangs[0].name }}
        </mc-button>
        <mc-avatar v-if="user" rounded size="400" :src="user.avatar" />
      </div>
    </div>
    <mc-separator color="hover-gray" indent-top="100" />
    <slot name="bottom" />
  </div>
</template>

<script>
import McAvatar from "../../elements/McAvatar/McAvatar"
import McButton from "../../elements/McButton/McButton"
import McSeparator from "../../elements/McSeparator/McSeparator"
export default {
  name: "McTopBar",
  components: {
    McAvatar,
    McButton,
    McSeparator,
  },
  props: {
    /**
     *  Данные пользователя
     *
     */
    user: {
      type: Object,
      default: null,
    },
    /**
     *  Меню языков
     *
     */
    menuLangs: {
      type: Array,
      default: () => [],
    },
  },

}
</script>

<style lang="scss">
.mc-top-bar {
  $block-name: &;

  width: 100%;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-100 $space-150 0 $space-150;
    @include child-indent-right($space-100);
  }

  &__left,
  &__right {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    @include child-indent-right($space-100);
  }

  &__right {
    min-width: 0;
    flex: 1 0 auto;
    justify-content: flex-end;
  }
}
</style>