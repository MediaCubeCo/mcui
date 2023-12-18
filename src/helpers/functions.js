import _cloneDeep from 'lodash/cloneDeep'

/**
 * Возвращаем строку, у которой первая буква будет заглавной
 * @param value
 * @returns {*|string}
 */
export function upperFirst(value) {
    return !value || typeof value !== 'string' ? value : `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

/**
 * Проверяем, является ли значение пустым
 * @param value
 * @return {boolean}
 */
export function isEmpty(value) {
    switch (true) {
        case [undefined, null].includes(value):
            return true
        case value.constructor === String:
            return !value.length
        case value.constructor === Object:
            return !Object.keys(value).length
        case value.constructor === Array:
            return !value.length
        case value instanceof Map || value instanceof Set:
            return !value.size
        default:
            return true
    }
}

/**
 * Глубокое копирование объектов и массивов
 * @param {Object | Array} value
 * @return {Object | Array}
 */
export function cloneDeep(value) {
    // TODO: find solution without lodash
    return _cloneDeep(value)
}

/**
 * Проверка на идентичность
 * @param first
 * @param second
 * @return {boolean}
 */
export function isEqual(first, second) {
    try {
        return JSON.stringify(first) === JSON.stringify(second)
    } catch (e) {
        console.error(e)
        return false
    }
}

/**
 * Фильтрация значений массива на основе работы функции-компаратора
 * @param {Array} array - массив исходных значений
 * @param {Function} comparator - функция-компаратор. Принимает 2 аргумента
 * (элемента массива). Должна вернуть truthy-значение, если элементы эквивалентны
 * @return {Array}
 */
export function uniqWith(array, comparator) {
    return array.filter((value, index, arr) => {
        return arr.findIndex(item => comparator(item, value)) === index
    })
}

/**
 * Функция декоратор, которая возвращает функцию с дебаунсом
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

export function throttle(fn, delay = 500) {
    let throttled = false
    let args = []
    return (...newArguments) => {
        args = newArguments
        if (throttled) return

        fn(...args)
        throttled = true
        setTimeout(() => (throttled = false), delay)
    }
}
