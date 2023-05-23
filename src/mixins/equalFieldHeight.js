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
        calcEqualHeaderHeight(elemRef) {
            const nextElem = elemRef?.nextElementSibling || elemRef?.parentElement?.nextElementSibling,
                elemTitle = elemRef?.querySelector('.mc-title'),
                nextElemTitle = nextElem?.querySelector('.mc-title'),
                firstTitleHeight = elemTitle?.clientHeight,
                nextTitleHeight = nextElemTitle?.clientHeight,
                highestHeight = firstTitleHeight > nextTitleHeight ? firstTitleHeight : nextTitleHeight

            this.setElemMinHeight(elemTitle, highestHeight)
            this.setElemMinHeight(nextElemTitle, highestHeight)
        }
    }
}
