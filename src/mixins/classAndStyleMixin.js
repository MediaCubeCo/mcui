import _upperFirst from 'lodash/upperFirst'
const values = ['variation', 'weight']
const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
const validators = {
    variation: v => ['h1', 'h2', 'h3', 'h4', 'subtitle', 'body', 'overline', 'article', 'info'].includes(v),
    weight: v => ['normal', 'medium', 'semi-bold', 'bold'].includes(v),
}
const variationProps = {}
values.forEach(value => {
    const validator = validators[value]
    sizes.forEach(size => {
        variationProps[`${value}-${size}`] = { type: String, validator }
    })
})
export default {
    props: {
        ...variationProps,
        variation: {
            type: String,
            default: 'body',
            validator: validators.variation,
        },
        weight: {
            type: String,
            validator: validators.weight,
        },
    },
    methods: {
        getClassNames(class_name, props = {}) {
            const classes = {
                [class_name]: true,
                [`${class_name}--variation-${props.variation}`]: props.variation,
                [`${class_name}--weight`]: !!props.weight,
            }

            values.forEach(value => {
                sizes.forEach(size => {
                    const sizeValue = props[`${value}${_upperFirst(size)}`]
                    if (sizeValue) {
                        classes[`${class_name}--${value}-${size}-${sizeValue}`] = true
                    }
                })
            })

            return Object.keys(classes).filter(key => classes[key])
        },
        getStyles(class_name, props = {}) {
            const styles = {}
            props.color && (styles[`--${class_name}-color`] = `var(--color-${props.color}, var(--color-black))`)
            props.weight &&
                (styles[`--${class_name}-weight`] = `var(--font-weight-${props.weight}, var(--font-weight-normal))`)
            return styles
        },
    },
}
