/**
 * Миксин для работы ошибок с инпутами
 * Возвращает поле errorText на основе массива errors
 * is_error_visible - скрывает ошибки, если пользователь взаимодействует с полем
 * для того, чтобы работало - прокидывать вызов метода toggleErrorVisible внутрь события изменения инпута
 */

export default {
    data: () => ({
        is_error_visible: true,
    }),
    computed: {
        errorText() {
            if (this.errors === null || !this.errors.length || !this.is_error_visible) return null
            return this.errors.join(', ')
        },
    },
    watch: {
        errors() {
            this.is_error_visible = true
        },
    },
    methods: {
        toggleErrorVisible() {
            this.is_error_visible = false
        },
    },
}
