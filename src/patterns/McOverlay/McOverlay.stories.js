import { select } from '@storybook/addon-knobs'
import { getTokensByType, getTokenGroup } from '../../utils/getTokens'

const iconSizes = getTokenGroup('icon-sizes')
const colors = getTokensByType('color')

import McOverlay from './McOverlay'
import McTitle from '../../elements/McTitle/McTitle'

export default {
    title: 'Patterns/McOverlay',
    component: McOverlay,
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}

export const Default = () => ({
    components: {
        McOverlay,
        McTitle,
    },
    props: {
        size: {
            default: select('size', iconSizes, 500, 'default'),
        },
        backgroundColor: {
            default: select('backgroundColor', colors, 'white', 'default'),
        },
    },
    template: `
        <template>
            <main style="position: relative">
                <mc-title pre-line max-width="100%">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas semper nisi at finibus. Nunc dictum laoreet justo, vel efficitur mi pretium et. Donec a lacus neque. Curabitur sapien augue, sagittis in ligula suscipit, placerat ultricies urna. Proin rhoncus nisl ac libero ullamcorper rutrum. Maecenas enim nunc, molestie ac odio sed, fermentum iaculis mi. Phasellus dui nibh, interdum nec viverra in, fringilla quis orci. Curabitur eu turpis vitae justo congue ullamcorper vulputate sit amet nibh. Cras lorem neque, ullamcorper non faucibus a, accumsan nec sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis aliquet sapien pulvinar pretium consequat. Ut sollicitudin blandit mi, vel vulputate nunc consectetur at. Vestibulum at augue non sem consectetur lacinia. Etiam quis sem sollicitudin, fermentum felis sed, suscipit elit. Suspendisse lacus diam, hendrerit a eros a, hendrerit hendrerit diam.

                    Maecenas at libero vel ligula cursus lobortis sed in sem. Nunc facilisis tempus malesuada. In eu elit nisl. Fusce cursus accumsan aliquam. Morbi ullamcorper vel libero vel feugiat. Mauris lectus risus, porta eu massa et, congue mollis libero. Mauris egestas lacinia nibh, ac lacinia lectus ultricies eget.

                    Proin auctor ornare nunc, quis sagittis ante faucibus sed. Praesent elementum tortor sit amet leo hendrerit tempus. Nulla congue orci est, sed consectetur tellus aliquam ut. Cras consectetur arcu pellentesque eros aliquet, nec sagittis nibh iaculis. Aenean non sapien convallis, tristique nunc a, porta odio. Suspendisse interdum ligula id sem scelerisque, a lacinia orci placerat. Cras tortor libero, dapibus quis orci et, euismod imperdiet nunc. Sed in imperdiet turpis. Mauris hendrerit aliquet arcu, ut ultrices nibh maximus sit amet. Fusce purus odio, malesuada nec congue vitae, tincidunt sed sapien. Aenean at laoreet sem. Integer ut nulla eleifend quam fringilla efficitur. Ut aliquet rhoncus nisl.

                    Sed pretium nisl quis dapibus varius. Curabitur ac hendrerit magna. Quisque egestas gravida consectetur. Suspendisse et euismod eros. Sed eget enim lectus. Pellentesque scelerisque nulla non mi venenatis, at pulvinar est dapibus. Suspendisse sodales, dolor at commodo iaculis, est lectus blandit ante, sed rutrum augue nibh nec nunc. Nulla in euismod eros. Sed vitae turpis sollicitudin, sagittis odio non, ultrices mi. Proin et aliquet augue, eget porta sem. Integer id vulputate nisi. In lobortis pretium nisi non tristique. Donec ipsum dolor, dictum eget purus ut, mattis volutpat massa. In hac habitasse platea dictumst. Aenean dictum blandit arcu, vel vestibulum libero dignissim non.

                    Pellentesque feugiat sem lectus, sodales laoreet sem semper quis. Maecenas iaculis felis vel ipsum facilisis laoreet. Maecenas fermentum est sed tortor finibus, quis vestibulum quam auctor. Suspendisse potenti. In tincidunt felis erat, ac euismod augue tristique non. Etiam tincidunt est purus, a molestie dui sagittis eget. Nulla lacinia nulla metus, vel luctus metus pulvinar vitae. Phasellus tristique leo augue, eu luctus est tempus ac. Curabitur eget nulla quis enim accumsan bibendum. Nam tristique congue sollicitudin. Fusce viverra est orci, eu cursus libero semper a. Suspendisse sagittis enim tellus, sed lobortis justo cursus in. Maecenas auctor in lacus sed aliquet. In gravida nisl quis blandit tincidunt.
                </mc-title>
                <mc-overlay :size="size" :background-color="backgroundColor" />
            </main>
        </template>
    `,
})
