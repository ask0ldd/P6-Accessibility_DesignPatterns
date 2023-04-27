/* eslint-disable no-unused-vars, no-undef */
class CustomSelect extends HTMLElement{
    #shadowDOM
    #ghostSelectNode
    #customSelectOptions
    #customSelectLabel 

    constructor(ghostSelectSelector){
        super()
        this.#ghostSelectNode = document.querySelector(ghostSelectSelector)
        this.#shadowDOM = this.attachShadow({ mode: "open" })
        // retrieve the options of the ghostSelect to build the customSelect view
        const masterOptions = this.#getMasterSelectOptions()

    }

    #getMasterSelectOptions(){
        const options = this.#ghostSelectNode.querySelectorAll("option")
        const formattedOptions = [...options].map(option => {
            return {
                value : option.value,
                label : option.label,
                selected : option.selected,
                originalElement : option
            }
        })

        return formattedOptions
    }

}