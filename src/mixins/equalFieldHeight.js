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
            const field = this.$refs.field
            if (field && field.parentElement.parentElement) {
                const elementTop = field.getBoundingClientRect().top
                this.elements.forEach(elem => {
                    const selectedElements = field.parentElement.parentElement.querySelectorAll(elem)
                    selectedElements.forEach(selectedElem => {
                        // проходимся по элементам, если находятся на одной высоте, то закидываем в массив соседей
                        selectedElem &&
                            selectedElem.getBoundingClientRect().top === elementTop &&
                            neighbors.push(selectedElem)
                    })
                })
                this.calcEqualHeaderHeight(field, neighbors)
            }
        },
        // Принимает ссылку на элемент инпута и массив соседей и вычисляем максимальную высоту заголовка
        calcEqualHeaderHeight(elemRef, neighbors) {
            const elemTitle = elemRef.querySelector('.mc-title'),
                neighborsTops = []

            neighbors.forEach(neighbor => {
                const text = neighbor.querySelector('.mc-title__text')
                text && neighborsTops.push(text.clientHeight)
            })
            const highestHeight = Math.max(...neighborsTops)

            this.setElemMinHeight(elemTitle, highestHeight)
        },
    },
}
