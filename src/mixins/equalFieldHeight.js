export default {
    /** Миксин для выравнивания высоты заголовка соседних инпутов, работает для элементов ниже
     * для добавления нового, надо добавить на сам элемент ref=field + включить в массив elements
     */
    data: () => ({
        elements: ['.mc-field-text', '.mc-field-select', '.mc-date-picker'],
    }),
    mounted() {
        this.calcNeighbors()
        window.addEventListener('resize', this.calcNeighbors)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calcNeighbors)
    },
    /**
     * Миксин для высчета высоты соседнего элемента инпута, чтобы не прыгала высота заголовка при большой строке
     * функции считают максимальную высоту mc-title и устанавливают min-height равную большему значению
     * */
    methods: {
        setElemMinHeight(elem, height) {
            if(elem) {
                elem.style.alignItems = 'self-end'
                elem.style.minHeight = `${height}px`
            }
        },
        // считаем количество соседей инпута и выравниваем высоту по максимальному
        calcNeighbors() {
            const neighbors = []
            // берем обертку родителя, чтобы учесть кейсы, когда элемент внутри элемента обертки
            const wrapper = this.$refs?.field?.parentElement?.parentElement
            if (wrapper) {
                const elementTop = this.$refs?.field?.getBoundingClientRect()?.top
                this.elements.forEach(elem => {
                    const selectedElements = wrapper.querySelectorAll(elem)
                    selectedElements?.forEach(selectedElem => {
                        // проходимся по элементам, если находятся на одной высоте, то закидываем в массив соседей
                        selectedElem?.getBoundingClientRect()?.top === elementTop && neighbors.push(selectedElem)
                    })
                })
                this.calcEqualHeaderHeight(this.$refs.field, neighbors)
            }
        },
        // Принимает ссылку на элемент инпута и массив соседей и вычисляем максимальную высоту заголовка
        calcEqualHeaderHeight(elemRef, neighbors) {
            const elemTitle = elemRef?.querySelector('.mc-title'),
                neighborsTops = []

            neighbors.forEach(neighbor => {
                neighborsTops.push(neighbor.querySelector('.mc-title__text')?.clientHeight)
            })
            const highestHeight = Math.max(...neighborsTops)

            this.setElemMinHeight(elemTitle, highestHeight)
        },
    },
}
