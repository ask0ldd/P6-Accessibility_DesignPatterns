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

    }

}