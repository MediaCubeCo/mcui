<template>
    <div class="mc-filter">
        <div class="mc-filter__header">
            <mc-tooltip :content="placeholders.main_tooltip" placement="top" size="s">
                <mc-button
                    :variation="visibilityToggleVariation"
                    :disabled="disabledOpen"
                    :bg-flat="isOpen"
                    size="m-compact"
                    @click="isOpen = !isOpen"
                >
                    <mc-svg-icon slot="icon-prepend" name="filter_list" />
                </mc-button>
            </mc-tooltip>
            <div v-if="presets[name]" class="mc-filter__presets">
                <div ref="dragArea" class="mc-filter__presets-inner" @mousedown="onMouseDown">
                    <mc-button
                        v-for="preset in presets[name]"
                        :key="preset.name"
                        :variation="getPresetButtonVariation(preset)"
                        secondary-color="purple"
                        @mouseup="() => handlePresetMouseUp(preset)"
                    >
                        {{ preset.name }}
                    </mc-button>
                </div>
            </div>
        </div>
        <component :is="usePortal ? 'portal' : 'div'" to="filterTarget">
            <div v-if="isOpen" class="mc-filter__body">
                <div class="mc-filter__body-top">
                    <div class="mc-filter__body-top-left">
                        <mc-field-select
                            v-model="selectedOptionFilter"
                            :title="placeholders.value"
                            :options="regularFilters"
                            :placeholder="placeholders.choose"
                            :hide-selected="false"
                            class="mc-filter__main-select"
                            name="filter_value_name"
                        />
                        <template v-if="currentFilter">
                            <component
                                :is="computedComponentTypeName"
                                :value="currentCondition"
                                :filter="currentFilter"
                                :placeholders="placeholders"
                                :current-values="!activeTag ? currentValues : {}"
                                @input="handleConditionChange"
                            />
                            <mc-button v-if="hasButtonAdd" variation="purple-outline" @click.native="handleStoreTag">
                                {{ placeholders.actions[activeTag ? 'save' : 'add'] }}
                            </mc-button>
                        </template>
                    </div>
                    <div v-if="false" class="mc-filter__body-top-right">
                        <mc-cell>
                            <mc-title slot="title">{{ placeholders.fast_filters }}</mc-title>
                        </mc-cell>
                    </div>
                </div>
                <mc-filter-tags
                    :value="currentValuesName"
                    :filters="filters"
                    :placeholders="placeholders"
                    :active-tag="activeTag"
                    @tag-change="onTagsChange"
                    @tag-click="onTagClick"
                    @clear="allTagsClear"
                />
                <section class="mc-filter__body-fast-tags-wrapper">
                    <mc-tooltip
                        v-for="(tag, i) in fastFilters"
                        :key="i"
                        :content="tag.description || ''"
                        placement="top"
                        size="s"
                    >
                        <mc-chip
                            variation="gray-outline"
                            text-color="black"
                            size="s"
                            @click.native="handlerSetFastFilter(tag)"
                        >
                            {{ tag.name }}
                        </mc-chip>
                    </mc-tooltip>
                </section>
                <div class="mc-filter__body-bottom">
                    <div class="mc-filter__body-bottom-left">
                        <mc-button
                            :disabled="buttonConfirmIsDisable"
                            :loading="buttonConfirmIsLoading"
                            size="s"
                            @click.native="handleConfirm"
                        >
                            {{ placeholders.actions.confirm }}
                        </mc-button>
                        <mc-button
                            v-if="activePreset"
                            variation="red-outline"
                            size="s"
                            @click.native="() => handleDeletePreset(activePreset)"
                        >
                            {{ placeholders.actions.delete_preset }}
                            <mc-svg-icon slot="icon-append" name="delete" size="250" color="red" />
                        </mc-button>
                    </div>
                    <div class="mc-filter__body-bottom-right">
                        <mc-title class="mc-filter__preset-input-title">
                            {{ placeholders.create_preset }}
                            <mc-tooltip
                                slot="icon-append"
                                :content="placeholders.enter_preset_tooltip"
                                placement="top"
                                size="s"
                            >
                                <mc-svg-icon name="help" size="250" color="outline-gray" />
                            </mc-tooltip>
                        </mc-title>
                        <mc-field-text
                            v-model="newPresetName"
                            :placeholder="placeholders.enter_preset_name"
                            :max-length="20"
                            class="mc-filter__preset-input"
                            name="preset_name"
                        />
                        <mc-button
                            :disabled="buttonCreateIsDisable"
                            variation="purple-outline"
                            size="s"
                            @click.native="handleCreatePreset"
                        >
                            {{ placeholders.actions.create }}
                        </mc-button>
                    </div>
                </div>
            </div>
        </component>
    </div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _uniq from 'lodash/uniq'
import _cloneDeep from 'lodash/cloneDeep'
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'
import McButton from '../../elements/McButton/McButton'
import McTitle from '../../elements/McTitle/McTitle'
import McFieldSelect from '../../elements/McField/McFieldSelect/McFieldSelect'
import McFieldText from '../../elements/McField/McFieldText/McFieldText'
import McCell from '../../patterns/McCells/McCell/McCell'
import McTooltip from '../../elements/McTooltip/McTooltip'
import McFilterTypeRelation from './McFilterTypeRelation/McFilterTypeRelation'
import McFilterTypeText from './McFilterTypeText/McFilterTypeText'
import McFilterTypeRange from './McFilterTypeRange/McFilterTypeRange'
import McFilterTypeDate from './McFilterTypeDate/McFilterTypeDate'
import McFilterTags from './McFilterTags/McFilterTags'
import McChip from '../../elements/McChip/McChip'

export default {
    name: 'McFilter',
    components: {
        McFilterTags,
        McFilterTypeRelation,
        McFilterTypeText,
        McFilterTypeRange,
        McFilterTypeDate,
        McSvgIcon,
        McButton,
        McTitle,
        McFieldSelect,
        McFieldText,
        McCell,
        McTooltip,
        McChip,
    },
    props: {
        /**
         *  Имя фильтра
         *  (для записи данных в стор)
         */
        name: {
            type: String,
            required: true,
        },
        /**
         *  Значение фильтра
         */
        value: {
            type: Object,
            required: true,
        },
        /**
       *  Типы фильтров
       *
       *  [{
                name: Filter title,
                value: [String] - Filter value(key),
                type: [String] - Filter type(relation / date / text / fast / labels),
                options: [Array] - Filter options,
                getAjaxOne: [Function] - Method for get selected options when filter initialize,
                getAjaxOptions: [Function] - Method for get options by API,
                [relation]: [String] - Filter relation, only for fast filter,
                [default]: [String, Number, Boolean] - Only for fast filter type. Fast filter haven't options, we set default value
                [description]: [String] - Only for fast filter type. Description of fast filter
            }, ...]
       */
        filters: {
            type: Array,
            required: true,
        },
        /**
         *  Лоадинг кнопки применить фильтр
         */
        buttonConfirmIsLoading: {
            type: Boolean,
            default: false,
        },
        /**
         *  Использовать ли портал (для рендеринга вне компонента)
         *  Если да то необходим пакет portal-vue и <portal-target name="filterTarget" /> для рендеринга
         */
        usePortal: {
            type: Boolean,
            default: true,
        },
        /**
         *  Доступен ли фильтр для открытия
         */
        disabledOpen: {
            type: Boolean,
            default: false,
        },
        /**
         *  Переводы локализаций
         */
        placeholders: {
            type: Object,
            default() {
                return {
                    main_tooltip: '',
                    value: 'Value',
                    condition: 'Condition',
                    create_preset: 'Create new preset',
                    fast_filters: 'Fast filters',
                    added_filters: 'Added filters',
                    enter_preset_name: 'Enter preset name',
                    enter_preset_tooltip: 'Сохранение выбранных параметров фильтра в пользовательский пресет',
                    from: 'From',
                    to: 'To',
                    enter: 'Enter',
                    choose: 'Choose',
                    actions: {
                        add: 'Add',
                        save: 'Save',
                        clear: 'Clear',
                        create: 'Create',
                        delete_preset: 'Delete preset',
                        is: 'This',
                        is_not: 'Is not',
                        empty: 'Empty',
                        confirm: 'Confirm',
                    },
                    calendar: {
                        week: 'Week',
                        month: 'Month',
                        quarter: 'Quarter',
                        year: 'Year',
                        confirm: 'Confirm',
                    },
                    messages: {
                        same_filter: 'Уже есть фильтр с таким параметром',
                        same_preset_name: 'Уже есть фильтр с таким именем',
                        accidentally_cleared: 'Случайно очистили?',
                        accidentally_deleted: 'Случайно удалили?',
                        more_than: 'Значение "от" не может быть больше значения "до"',
                    },
                }
            },
        },
    },
    data() {
        return {
            isOpen: false,
            currentValues: {},
            currentValuesName: {},
            temporaryValues: {},
            temporaryValuesName: {},
            selectedOptionFilter: null,
            currentCondition: null,
            currentConditionName: null,
            buttonConfirmIsDisable: false,
            newPresetName: '',
            dragOptions: {
                scrollPos: 0,
                startClientPos: 0,
                distance: 0,
                isDrag: false,
                mouseIsDown: false,
            },
            presets: {},
            activePreset: null,
            temporaryActivePreset: null,
            activeTag: null,
        }
    },
    computed: {
        fastFilters() {
            const selected = (this.currentValues && Object.keys(this.currentValues)) || []
            return this.filters.filter(f => f.type === 'fast' && !selected.includes(f.value))
        },
        regularFilters() {
            return this.filters.filter(f => f.type !== 'fast')
        },
        visibilityToggleVariation() {
            return this.isOpen || !this.buttonConfirmIsDisable ? 'purple-invert' : 'black-flat'
        },
        currentFilter() {
            return this.filters.find(f => f.value === this.selectedOptionFilter)
        },
        computedComponentTypeName() {
            if (this.currentFilter && this.currentFilter.type === 'fast') return null
            return `mc-filter-type-${this.currentFilter.type}`
        },
        hasButtonAdd() {
            return !_isEmpty(this.currentCondition)
        },
        buttonCreateIsDisable() {
            return !this.newPresetName.trim()
        },
    },
    watch: {
        value: {
            handler(val) {
                this.currentValues = { ...val.filter }
                if (val.filter_name) {
                    try {
                        this.currentValuesName = JSON.parse(decodeURI(atob(val.filter_name)))
                    } catch (e) {
                        console.error(`Can't parse filters`)
                    }
                }
                this.buttonConfirmIsDisable = _isEmpty(val.filter) || _isEmpty(val.filter_name)
            },
            immediate: true,
            deep: true,
        },
        currentFilter: {
            handler() {
                this.handleConditionChange()
            },
            deep: true,
        },
        currentValues(newVal, oldVal) {
            if (_isEmpty(oldVal) && !_isEmpty(newVal)) {
                this.buttonConfirmIsDisable = false
            }
            if (_isEmpty(this.value.filter) && _isEmpty(newVal)) {
                this.buttonConfirmIsDisable = true
            }

            if (this.activePreset) {
                const mappedPresets = this.presets[this.name].map(p => {
                    if (p.name === this.activePreset.name) {
                        return {
                            name: p.name,
                            filter: _cloneDeep(this.currentValues),
                            filter_name: _cloneDeep(this.currentValuesName),
                        }
                    }
                    return p
                })
                this.presets[this.name] = [...mappedPresets]
                window.localStorage.mcFilterPresets = JSON.stringify({
                    ...this.presets,
                })
            }
        },
    },
    mounted() {
        this.updatePresets()
        document.documentElement.addEventListener('mousemove', this.onMouseMove)
        document.documentElement.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('storage', this.updatePresets)
    },
    beforeDestroy() {
        document.documentElement.removeEventListener('mousemove', this.onMouseMove)
        document.documentElement.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('storage', this.updatePresets)
    },
    methods: {
        updatePresets() {
            this.presets = JSON.parse(window.localStorage.mcFilterPresets || '{}')
            console.log('update presets', this.presets)
        },
        handlerSetFastFilter(tag) {
            const filterValue = tag.relation ? { [tag.relation]: tag.default } : tag.default
            this.selectedOptionFilter = tag.value
            this.handleConditionChange(filterValue, tag.name)
            this.handleStoreTag()
        },
        onMouseDown(e) {
            this.dragOptions.startClientPos = e.clientX
            this.dragOptions.mouseIsDown = true
            this.dragOptions.scrollPos = this.$refs.dragArea.scrollLeft
        },
        onMouseMove(e) {
            if (!this.dragOptions.mouseIsDown) return

            this.dragOptions.distance = e.clientX - this.dragOptions.startClientPos
            if (Math.abs(this.dragOptions.distance) > 2 && !this.dragOptions.isDrag) {
                this.dragOptions.isDrag = true
            }
            if (this.dragOptions.isDrag) {
                this.$refs.dragArea.scrollTo({
                    left: this.dragOptions.scrollPos - this.dragOptions.distance,
                })
            }
            if (Math.abs(this.scrollPos)) {
                this.dragOptions.scrollPos = 0
            }
        },
        onMouseUp() {
            if (this.dragOptions.isDrag) {
                this.dragOptions.isDrag = false
            }
            this.dragOptions.mouseIsDown = false
        },
        handlePresetMouseUp(preset) {
            if (this.dragOptions.isDrag) return
            if (this.activePreset && this.activePreset.name === preset.name) {
                this.activePreset = null
                this.currentValues = {}
                this.currentValuesName = {}
            } else {
                this.activePreset = preset
                this.currentValues = _cloneDeep(preset.filter)
                this.currentValuesName = _cloneDeep(preset.filter_name)
            }
            if (!this.isOpen) {
                this.handleConfirm()
            }
        },
        handleConditionChange(val = null, valName = null) {
            this.currentCondition = val
            this.currentConditionName = valName || val
        },
        handleStoreTag() {
            this.activeTag ? this.editTag() : this.addTag()
        },
        editTag() {
            switch (this.currentFilter.type) {
                case 'relation': {
                    this.editRelationValue()
                    break
                }
                default: {
                    this.addSimpleValue()
                    break
                }
            }
            this.activeTag = null
        },
        addTag() {
            switch (this.currentFilter.type) {
                case 'relation': {
                    this.addRelationValue()
                    break
                }
                default: {
                    this.addSimpleValue()
                    break
                }
            }
            this.activeTag = null
        },
        editRelationValue() {
            const tagRelationValue = this.activeTag.relationKey === 'exists' ? [0] : [this.activeTag.value]
            const tagRelation = {
                [this.activeTag.category]: {
                    [this.activeTag.relationKey]: tagRelationValue,
                },
            }
            const selectedRelation = {
                [this.selectedOptionFilter]: _cloneDeep(this.currentCondition),
            }
            if (_isEqual(selectedRelation, tagRelation)) {
                /**
                 * Событие по возникшей ошибке
                 */
                this.$emit('error', this.placeholders.messages.same_filter)
                return
            }
            const { category, categoryName } = this.getCategoriesWithNewRelation()
            if (this.activeTag.relationKey === 'exists') {
                delete category[this.activeTag.relationKey]
                delete categoryName[this.activeTag.relationKey]
            } else {
                const numerableValues = category[this.activeTag.relationKey]
                const index = numerableValues.indexOf(this.activeTag.value)
                if (index !== -1) {
                    category[this.activeTag.relationKey].splice(index, 1)
                    _isEmpty(category[this.activeTag.relationKey]) && delete category[this.activeTag.relationKey]

                    delete categoryName[this.activeTag.relationKey][this.activeTag.value]
                    _isEmpty(categoryName[this.activeTag.relationKey]) &&
                        delete categoryName[this.activeTag.relationKey]
                }
            }

            this.setFilterValues(category, categoryName)
        },
        addRelationValue() {
            const { category, categoryName } = this.getCategoriesWithNewRelation()
            this.setFilterValues(category, categoryName)
        },
        getCategoriesWithNewRelation() {
            const relationKeys = Object.keys(this.currentCondition)
            const values = _cloneDeep(this.currentValues)
            const valuesName = _cloneDeep(this.currentValuesName)
            const selectedCategory = values[this.selectedOptionFilter]
            const selectedCategoryName = valuesName[this.selectedOptionFilter]

            selectedCategory &&
                relationKeys.forEach(k => {
                    if (k === 'exists') {
                        selectedCategory[k] = [0]
                        selectedCategoryName[k] = [0]
                    } else {
                        if (k in selectedCategory) {
                            selectedCategory[k] = _uniq([...selectedCategory[k], ...this.currentCondition[k]])
                            selectedCategoryName[k] = {
                                ...selectedCategoryName[k],
                                ...this.currentConditionName[k],
                            }
                        } else {
                            selectedCategory[k] = this.currentCondition[k]
                            selectedCategoryName[k] = this.currentConditionName[k]
                        }
                    }
                })
            return { category: selectedCategory, categoryName: selectedCategoryName }
        },
        setFilterValues(val, valName) {
            const newVal = {
                ...this.currentValues,
                [this.selectedOptionFilter]: val || this.currentCondition,
            }
            if (_isEqual(this.currentValues, newVal)) {
                /**
                 * Событие по возникшей ошибке
                 */
                this.$emit('error', this.placeholders.messages.same_filter)
                return
            }
            this.currentValues = newVal
            this.currentValuesName = {
                ...this.currentValuesName,
                [this.selectedOptionFilter]: valName || this.currentConditionName,
            }

            this.setEmptyCondition()
        },
        setEmptyCondition() {
            switch (this.currentFilter?.type) {
                case 'relation':
                case 'date':
                    this.handleConditionChange()
                    break
                case 'text':
                    this.handleConditionChange('')
                    break
                case 'range':
                    this.handleConditionChange({})
                    break
                default:
                    break
            }
        },
        addSimpleValue() {
            if (this.currentFilter.type === 'range' && Object.keys(this.currentCondition).length === 2) {
                if (this.currentCondition.more > this.currentCondition.less) {
                    /**
                     * Событие по возникшей ошибке
                     */
                    this.$emit('error', this.placeholders.messages.more_than)
                    return
                }
            }
            this.setFilterValues(this.currentCondition, this.currentCondition)
        },
        onTagsChange(val) {
            this.activeTag = null
            if (_isEmpty(val)) {
                this.currentValues = {}
                this.currentValuesName = {}
                return
            }
            this.currentValuesName = _cloneDeep(val)
            this.setRelationsToArrayFormat(val)
        },
        allTagsClear() {
            this.temporaryValues = _cloneDeep(this.currentValues)
            this.temporaryValuesName = _cloneDeep(this.currentValuesName)
            this.currentValues = {}
            this.currentValuesName = {}
            /**
             * Событие по очистке выбранных фильтров из поля
             */
            this.$emit('clear', this.placeholders.messages.accidentally_cleared)
        },
        clearTemporaryValues() {
            this.temporaryValues = {}
            this.temporaryValuesName = {}
        },
        revertClearedValues() {
            this.currentValues = _cloneDeep(this.temporaryValues)
            this.currentValuesName = _cloneDeep(this.temporaryValuesName)
        },
        setRelationsToArrayFormat(obj) {
            const newObj = _cloneDeep(obj)
            const relationKeys = ['is', 'is_not']
            for (let [categoryKey, categoryVal] of Object.entries(obj)) {
                if (categoryVal.constructor === Object) {
                    for (let [key, val] of Object.entries(categoryVal)) {
                        if (relationKeys.includes(key) && val.constructor === Object) {
                            newObj[categoryKey][key] = [...Object.keys(val)]
                        }
                    }
                }
            }
            this.currentValues = newObj
        },
        onTagClick(tag) {
            this.activeTag = _isEqual(this.activeTag, tag) ? null : tag
            if (!this.activeTag) {
                this.setEmptyCondition()
                return
            }
            let condition = null
            let conditionName = null
            if (tag.relationKey) {
                condition = {
                    [tag.relationKey]: tag.relationKey === 'exists' ? [0] : [String(tag.value)],
                }
                conditionName = {
                    [tag.relationKey]: tag.relationKey === 'exists' ? [0] : { [tag.value]: tag.title },
                }
            } else {
                condition = tag.value?.constructor === Object ? tag.value : String(tag.value)
                conditionName = tag.value
            }

            this.selectedOptionFilter = tag.category
            this.$nextTick(() => {
                this.currentCondition = condition
                this.currentConditionName = conditionName
            })
        },
        handleConfirm() {
            const encodedData = btoa(encodeURI(JSON.stringify(this.currentValuesName)))
            /**
             * Событие по изменению значения фильтра
             */
            this.$emit('input', {
                filter: this.currentValues,
                filter_name: encodedData,
            })
            this.$emit('confirm')
            if (_isEmpty(this.currentValues)) {
                this.buttonConfirmIsDisable = true
            }
        },
        handleDeletePreset(preset) {
            const filteredPresets = this.presets[this.name].filter(p => p.name !== preset.name)
            this.presets[this.name] = [...filteredPresets]
            this.temporaryActivePreset = _cloneDeep(this.activePreset)
            this.activePreset = null
            this.currentValues = {}
            this.currentValuesName = {}
            /**
             * Событие по удалению пресета
             */
            this.$emit('delete-preset', this.placeholders.messages.accidentally_deleted)
        },
        savePresetsToLocalStorage() {
            window.localStorage.mcFilterPresets = JSON.stringify({ ...this.presets })
        },
        getPresetsFromLocalStorage() {
            this.activePreset = _cloneDeep(this.temporaryActivePreset)
            this.currentValues = _cloneDeep(this.activePreset.filter)
            this.currentValuesName = _cloneDeep(this.activePreset.filter_name)
            this.temporaryActivePreset = null
            this.presets = JSON.parse(window.localStorage.mcFilterPresets || '{}')
        },
        handleCreatePreset() {
            if (
                this.presets[this.name] &&
                this.presets[this.name].find(p => p.name?.trim() === this.newPresetName?.trim())
            ) {
                this.$emit('error', this.placeholders.messages.same_preset_name)
                return
            }
            const preset = {
                name: this.newPresetName?.trim(),
                filter: _cloneDeep(this.currentValues),
                filter_name: _cloneDeep(this.currentValuesName),
            }
            if ('mcFilterPresets' in window.localStorage) {
                const presets = JSON.parse(window.localStorage.mcFilterPresets)
                if (this.name in presets) {
                    this.presets[this.name] = [preset, ...this.presets[this.name]]
                } else {
                    this.presets[this.name] = [preset]
                }
            } else {
                this.presets[this.name] = [preset]
            }
            window.localStorage.mcFilterPresets = JSON.stringify({ ...this.presets })
            this.newPresetName = ''
            this.activePreset = { ...preset }
        },
        getPresetButtonVariation(preset) {
            return this.activePreset && this.activePreset.name === preset.name ? 'purple-invert' : 'gray-outline'
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
.mc-filter {
    $block-name: &;
    flex-grow: 1;
    min-width: 0;
    &__header {
        display: flex;
        @include child-indent-right($space-100);
    }

    &__presets {
        position: relative;
        flex-grow: 1;
        min-width: 0;
        &::after {
            @include pseudo();
            @include position(null, 0 0 0 null);
            width: $size-1000;
            background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, $color-white);
            pointer-events: none;
        }

        &-inner {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            @include child-indent-right($space-100);
            @include hide-scrollbar();
            &::after {
                @include pseudo(block, static);
                min-width: $space-300;
            }
        }
    }

    &__body {
        padding: $space-200 $space-200 $space-300 $space-200;
        background-color: $color-hover-gray;
        @include child-indent-bottom($space-200);
        &-top {
            display: flex;
            @include child-indent-right($space-400);

            &-left,
            &-right {
                @include child-indent-right($space-100);
            }
            &-left {
                display: flex;
                align-items: flex-end;
            }
        }
        &-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            @include child-indent-right($space-400);

            &-left {
                > *:not(:first-child) {
                    margin-inline-start: $space-200;
                }
            }
            &-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                @include child-indent-right($space-100);
            }
            .mc-button {
                &--disabled {
                    opacity: 1;
                    background-color: fade-out($color-dark-gray, 0.8);
                    color: $color-dark-gray;
                    border-color: fade-out($color-dark-gray, 1);
                    .mc-button__background {
                        display: none;
                    }
                }
            }
        }
        &-fast-tags-wrapper {
            margin: -($space-50);
            & > .mc-tooltip-target {
                .mc-chip {
                    cursor: pointer;
                    margin: calc(#{$space-100} / 2) calc(#{$space-50} / 2);
                    &:hover {
                        background-color: $color-outline-gray;
                    }
                }
            }
        }
    }
    &__main-select,
    &__preset-input {
        width: 270px;
    }
    &__preset-input-title {
        width: auto;
    }
}
</style>
