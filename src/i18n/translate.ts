import { DirectiveFunction } from "vue";
import { DirectiveBinding } from "vue/types/options";
import VueI18n from "."

export const translate: DirectiveFunction = (el: Element, binding: DirectiveBinding) => {
    el.textContent = $translate(binding.value)
}

// Uses the entity_type as well as the registration description to lookup translations for entries from the LEAR database
export const $translate = (value: string): string => {
    const messages = VueI18n.messages
    const locale = VueI18n.locale
    const bindingValues = value.split(".")
    let transReturn
    // try old translation first
    if (bindingValues.length >= 2) {
        const translationAttempt = (messages[locale][bindingValues[0]] as { [key: string]: string | any })?.[bindingValues[1]]
        if (typeof (translationAttempt) === "string") {
            transReturn = translationAttempt
        } else {
            // we know we're working with an entity from LEAR
            const description = translationAttempt?.displayName ?? translationAttempt?.title
            if (typeof (description) === "string") {
                transReturn = description
            } else if (typeof (description) !== "undefined") {
                // we are working with a description object, indexed by entity type: BC, SP, etc.
                if (bindingValues.length >= 3) {
                    // if entity type is passed in as a binding value
                    transReturn = description[bindingValues[2]]
                } else {
                    transReturn = translationAttempt?.title
                }
            }
        }
    }
    return transReturn ?? value
}
