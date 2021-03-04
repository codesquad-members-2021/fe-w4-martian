export const _ = {
    $: (selector, base = document) => base.querySelector(selector),

    $A: (selector, base = document) => base.querySelectorAll(selector)
}