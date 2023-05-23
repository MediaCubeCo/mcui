export default {
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
        // Принимает ссылку на элемент инпута и проверяет высоту соседнего инпута или же, если элемент в обертке, то соседа родителя
        // Передаем количество соседей для цикла
        calcEqualHeaderHeight(elemRef, neighborsAmount) {
            const elemTitle = elemRef?.querySelector('.mc-title'),
                neighbors = [{
                    titleElem: elemTitle,
                    titleHeight: elemTitle?.clientHeight,
                }]
            let nextElem
            for(let index = 0; index < neighborsAmount; index++) {
                const elem = nextElem || elemRef
                nextElem = elem?.nextElementSibling || elem?.parentElement?.nextElementSibling
                const titleElem = nextElem?.querySelector('.mc-title')
                neighbors.push({
                    titleElem,
                    titleHeight: titleElem?.clientHeight,
                })
            }
            const highestHeight = Math.max(...neighbors.map(neighbor => neighbor.titleHeight))

            neighbors.forEach(neighbor => {
                this.setElemMinHeight(neighbor.titleElem, highestHeight)
            })
        },
    }
}
