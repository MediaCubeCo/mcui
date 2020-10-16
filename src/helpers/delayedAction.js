import Vue from 'vue'
export const handleConfirmAction = (handler, cancelCallback, text = null, btnText = null) => {
    Vue.prototype.$toasted.show(text || 'Случайно удалили?', {
        position: 'bottom-center',
        duration: 3000,
        fullWidth: false,
        keepOnHover: true,
        className: ['mc-toast', 'mc-toast--primary'],
        theme: 'toasted-primary',
        iconPack: 'custom-class',
        icon: 'las la-info-circle',
        action: [
            {
                text: btnText || 'Cancel',
                class: 'mc-toast__action mc-toast__action--outline',
                onClick: (e, toastObject) => {
                    if (typeof cancelCallback === 'function') cancelCallback()
                    toastObject.goAway(0)
                },
            },
        ],
        onComplete() {
            handler()
        },
    })
}
