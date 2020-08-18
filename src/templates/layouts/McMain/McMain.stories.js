import { text, object, boolean } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"
import authUser from '../../../mocks/authUser'
import menuLangs from '../../../mocks/menuLangs'
import menuApps from "../../../mocks/menuApps"

import McMain from "./McMain"
import McSideBar from "../../../patterns/McSideBar/McSideBar/McSideBar"
import McTopBar from "../../../patterns/McTopBar/McTopBar"
import McTitle from "../../../elements/McTitle/McTitle"
import McButton from "../../../elements/McButton/McButton"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import menuMain from "../../../mocks/menuMain"

const wrapper = () => {
  return {
    template: `<div style="width: 100%; height: 100vh; margin: -3rem 0;">
        <story />
    </div>`,
  }
}


export default {
  title: 'Templates/McMain',
  component: McMain,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
  decorators: [wrapper],
}

const getUniqueProps = key => {
  return {
    logoTitle: {
      default: text('logoTitle', 'Dashboard', key),
    },
    logoSrc: {
      default: text('logoSrc', '/img/mc_dashboard.svg', key),
    },
    menuMainTitle: {
      default: text('menuMainTitle', 'Sections', key),
    },
    chatraConfig: {
      default: object('chatraConfig', {id: 'dzDw7eBbL2ramxx25', title: 'Have questions?'}, key),
    },
    hideText: {
      default: text('hideText', 'Hide', key),
    },
    compact: {
      default: boolean('compact sideBar', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    // user: ctx.user,
    // menuLangs: ctx.menuLangs,
  }
}

const actionsData = {
  handleCompact: action('compact'),
}

export const Default = () => ({
  components: { McMain, McSideBar, McTopBar, McTitle, McButton, McSvgIcon },
  computed: {
    sideBarTagBind() {
      // return getCommonTags(this)
      return {
        logoTitle: this.logoTitle,
        logoSrc: this.logoSrc,
        menuMainTitle: this.menuMainTitle,
        menuMain: this.menuMain,
        menuApps: this.menuApps,
        chatraConfig: this.chatraConfig,
        userbackConfig: this.userbackConfig,
        user: this.user,
        hideText: this.hideText,
        compact: this.compact,
      }
    },
    userbackConfig() {
      return {
        title: 'Found a mistake?',
        token: '8681|15392|h5ECyqaZJTTOk6kDQJmgij6b7db2iXwCuwM21iQ6HIcautJRR2',
        // more info https://help.userback.io/hc/en-us/articles/115005681028-Javascript-API
        settings: {
          lang: 'en',
          main_button_text: 'submit',
          rating_help_message: 'rate',
        },
        categories: 'Admin',
      }
    },
    menuMain() {
      return menuMain
    },
    menuLangs() {
      return menuLangs
    },
    menuApps() {
      return menuApps
    },
    user() {
      return {
        ...authUser,
        name: `${authUser.first_name}${authUser.last_name ? ` ${authUser.last_name}` : ''}`,
      }
    }
  },
  props: {
    ...getUniqueProps('default'),
  },
  methods: actionsData,
  template: `<mc-main>
    <mc-top-bar slot="top-bar" :user="user" :menu-langs="menuLangs">
      <mc-title slot="left" variation="subtitle" max-width="auto">Left Section Title</mc-title>
      <mc-button slot="left" size="xs-compact" rounded variation="black-flat">
        <mc-svg-icon slot="icon-prepend" name="add" />
      </mc-button>
      <mc-svg-icon slot="right" name="search" />
    </mc-top-bar>
    <mc-side-bar slot="left-bar" v-bind="sideBarTagBind" @compact="handleCompact" />
    <mc-title :ellipsis="false">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus commodi eos neque odit tempora vitae. Cumque cupiditate delectus ducimus ipsum iste iusto magnam neque nostrum reiciendis voluptatum! Alias dolore dolorem est et fugit inventore iusto libero maiores minima minus necessitatibus nostrum numquam, obcaecati quod rem, repudiandae sunt temporibus tenetur. Amet assumenda commodi consequuntur dicta eius est eum exercitationem, expedita facere fugiat illo impedit in ipsa ipsum magni minima nam nemo odio omnis porro quae quia quisquam quos, recusandae reprehenderit, saepe sequi similique temporibus vel vero. Accusantium adipisci animi aspernatur beatae debitis delectus dignissimos enim et illum, maiores maxime molestiae obcaecati officiis praesentium quidem quis sit suscipit totam veniam, voluptatibus! Ab adipisci amet beatae, corporis delectus ducimus ea esse expedita illo illum magnam magni, perferendis quas qui quidem repellat, similique ullam voluptatem? Ab accusamus assumenda aut commodi doloremque earum eveniet excepturi illum laboriosam minus modi, nihil, non numquam provident quis rem soluta tempore tenetur totam ullam, veniam veritatis voluptates? Accusantium assumenda at delectus dolor esse, nam nesciunt repellat temporibus. Dignissimos itaque labore qui repellendus temporibus. Alias architecto, commodi consequuntur deserunt distinctio dolores eligendi iusto magnam mollitia, nihil perferendis porro quisquam sed sint sunt. Culpa dicta earum eligendi provident unde ut. Accusamus aperiam, architecto deleniti dolores eaque iure nihil repellat suscipit. Asperiores autem dolores eos error facilis, fuga id modi molestias neque perspiciatis quaerat reiciendis reprehenderit vel velit voluptates? A, autem expedita fugiat libero nostrum perferendis porro qui rerum voluptas. Ab aliquam amet aperiam asperiores commodi corporis cumque dolorum eaque error excepturi expedita explicabo, fuga illo mollitia nam non pariatur quaerat quas rem tenetur. Accusamus amet aspernatur corporis et excepturi explicabo facere id, incidunt ipsam, maiores nam pariatur quidem, repudiandae sequi sint ut voluptates. Accusamus aliquam, aperiam asperiores assumenda at cumque dolorum ducimus facilis illo maiores nemo nostrum omnis optio praesentium, quidem similique soluta! Architecto aspernatur deleniti dicta nihil obcaecati! Animi commodi delectus fuga soluta sunt. Deserunt eligendi laudantium molestiae nisi sapiente tempore? Accusamus ad consectetur consequuntur dicta dolores et expedita facere ipsa itaque iusto magni minus nemo nulla officia perferendis quae sequi, sint soluta suscipit voluptatem! Ab alias, aperiam culpa dolorum eaque eligendi eveniet ex ipsam iste libero maxime, minima modi nobis numquam omnis, quia quis quod repellendus repudiandae sed tempora tempore ut vero voluptas voluptates. Aliquam asperiores consectetur, consequuntur corporis et eum exercitationem facilis ipsam ipsum labore natus neque optio quod similique, sit. Eum hic ipsam laborum libero magni pariatur placeat quo! Accusantium atque aut beatae blanditiis consequuntur deserunt dignissimos dolor dolorum, eligendi est et incidunt laboriosam nemo nobis non officia perferendis porro quibusdam! Alias architecto autem, commodi deleniti dicta dolore molestias non officia quae velit. Accusamus aliquid blanditiis cumque deleniti dolor dolore doloremque dolores eaque eius eligendi hic impedit in ipsa laboriosam nam nesciunt nisi omnis quae quidem quis ratione recusandae rerum, suscipit velit, vero voluptas voluptatibus voluptatum. Ab alias atque beatae consectetur consequatur cum dicta dolores ea earum, ex expedita explicabo facilis fugiat harum maiores, minima nulla porro quos recusandae repellat soluta sunt tempora tempore tenetur ut vero voluptas? A adipisci alias aliquam aut commodi corporis cumque dignissimos doloremque ea earum eius esse et ex exercitationem explicabo harum illum in incidunt iure laboriosam molestiae molestias, mollitia nam porro qui quidem quis quo suscipit tempore temporibus ullam, veniam veritatis voluptatibus. A ab accusantium, adipisci alias animi, aperiam asperiores aut autem deleniti earum eius eos explicabo in laboriosam laudantium magni, modi necessitatibus nobis numquam obcaecati officia omnis pariatur quidem quis quod reiciendis reprehenderit sunt tenetur unde ut veniam voluptas voluptatem voluptatum. Aperiam architecto corporis cupiditate distinctio dolorum, et inventore odio odit officiis quia! Accusantium aut dolores eveniet facere maiores mollitia provident voluptatem voluptatum. Ad assumenda dignissimos eius est explicabo id illo incidunt labore magnam nam nemo nesciunt, numquam perspiciatis porro quasi ratione rem saepe tenetur unde voluptas. A adipisci animi aperiam aut consectetur consequuntur delectus distinctio eaque, enim illum magnam magni nihil, numquam repellendus, tenetur ullam voluptates. Ad aliquam autem enim et fugit in ipsam nesciunt obcaecati omnis perferendis, porro quaerat quas reprehenderit ut veritatis. Accusamus, assumenda consectetur ex exercitationem libero natus neque nobis officia repudiandae sapiente. Accusamus ad aliquam autem culpa dolorem eaque fuga, illo, illum ipsum laboriosam nulla pariatur porro quidem quo repellendus reprehenderit sit suscipit voluptates. Amet culpa cumque deleniti distinctio dolorem doloremque eius eveniet id ipsa magnam nam, natus pariatur perferendis provident quaerat. Architecto at atque corporis cumque dicta doloremque eveniet illo labore magni minus modi molestiae nihil omnis praesentium quaerat rem repudiandae sequi similique soluta, tempore tenetur unde voluptates? Asperiores consectetur culpa deleniti dolores odit quo recusandae similique tempora temporibus, veniam. Ea explicabo harum odio possimus soluta, ut! Aperiam blanditiis exercitationem id ipsam laborum laudantium perspiciatis temporibus ullam voluptate voluptates. A alias aliquam animi aspernatur atque blanditiis consectetur eaque exercitationem expedita, facilis harum id illum labore laudantium nam necessitatibus neque nesciunt perferendis possimus quibusdam quis sint voluptate voluptatem. Deserunt distinctio dolor ducimus eligendi et, explicabo fugit incidunt ipsa ipsam minima nam nostrum officia placeat, reiciendis velit? Commodi deserunt dicta eligendi error modi obcaecati praesentium quia quibusdam repellendus saepe! Aperiam doloribus maxime mollitia, odit quis sapiente similique? Commodi doloribus labore, nobis quibusdam voluptate voluptatum. Accusamus adipisci alias cumque ea excepturi impedit inventore ipsum iste iusto magnam nemo neque nesciunt nostrum quaerat quasi reiciendis, repellendus vel velit voluptates voluptatum! Aut eius fugit ipsum nostrum omnis repellendus soluta ut! Ipsa odit, ullam! Architecto at blanditiis, corporis deleniti deserunt eius eum ex exercitationem harum in itaque laudantium maxime nemo nulla numquam placeat praesentium provident qui quibusdam quisquam quos reiciendis repudiandae saepe sit temporibus totam vitae! Dolor doloremque est et maiores nobis officiis porro reiciendis ut? A amet blanditiis cumque cupiditate deserunt dicta dolore dolorum ducimus eaque earum eligendi esse ex ipsam ipsum iure, modi molestias mollitia nostrum officiis pariatur possimus quaerat quas quidem quo quos ratione recusandae similique? Ab corporis, debitis deserunt facere facilis in iure magni natus optio porro quae repellendus sunt voluptas! Alias commodi consequatur corporis delectus dignissimos doloribus, earum ex, explicabo id illo laborum magni necessitatibus nihil officia praesentium rem soluta tempora tempore temporibus unde!
    </mc-title>
  </mc-main>`,
})

