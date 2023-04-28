/* eslint-disable no-unused-vars, no-undef */
import { dropdownChange } from "../pages/photographer.js"
class CustomSelect extends HTMLElement{
    #shadowDOM
    #ghostSelectNode
    #customSelectOptions
    #customSelectLabel 

    constructor(){
        super()
        this.#ghostSelectNode = document.querySelector("#sort-select")
        this.#shadowDOM = this.attachShadow({ mode: "open" })
        // retrieve the options of the ghostSelect to build the customSelect view
        const masterOptions = this.#retrieveMasterSelectOptions()
        const view = this.#buildView(masterOptions)
        // view to the ShadowDOM
        this.#shadowDOM.append(view)

        // where the selected option is displayed on the custom select
        this.#customSelectLabel = this.#shadowDOM.querySelector(".customSelectLabel")
        this.#customSelectLabel.addEventListener('click', () => this.#optionsListOpenClose())

        window.addEventListener('keydown', e => this.#keyboardListener(e))

        this.#customSelectOptions = Array.from(this.#shadowDOM.querySelectorAll('.customSelectOption'))

        // click : select custom option / mouse over : highlight custom option
        this.#customSelectOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.#setAsSelected(option)
                this.#setAsHighlighted(option)
                this.#optionsListOpenClose()
            })
            option.addEventListener('mouseover', () => this.#setAsHighlighted(option))
        })
    }

    #retrieveMasterSelectOptions(){
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

    get ShadowDOMNode(){
        return this.#shadowDOM
    }

    #buildView(masterSelectOptions){
        const viewContainer = document.createElement("template")
        viewContainer.innerHTML = `
        <link rel="stylesheet" href="../css/customSelect.css"/>
        <div class="customSelectContainer">
            <span tabindex="0" aria-controls="customListbox" id="customSelectLabel" role="combobox" aria-haspopup="listbox" aria-activedescendant aria-expanded="false" class="customSelectLabel">Popularité<img class="customSelectArrow" src="./assets/icons/select-arrow.svg"/></span>
            <ul tabindex="-1" id="customListbox" aria-labelledby="customSelectLabel" class="customSelectOptionsContainer" role="listbox">`+
            masterSelectOptions.reduce((accu, option) => 
            accu + `<li id="${option.value}"
            role="option" data-value="${option.value}"
            class="customSelectOption ${ option.selected === true ? 'selectedOption' : ''  }" aria-selected="${option.selected === true ? true : false}">
            ${option.label}</li>`, '')
            +`</ul>
        </div>
        `

        // return the content of the view container (template)
        return viewContainer.content.cloneNode(true)
    }
    
    #updateLabel(text){
        this.#customSelectLabel.innerHTML = text + `<img class="customSelectArrow" src="./assets/icons/select-arrow.svg"/>`
    }

    // ACCESSIBILITY : keyboard navigation
    #keyboardListener(e)
    {
        if(document.activeElement !== document.querySelector('custom-select')) return false
        if(e.code == "Escape") this.#optionsListOpenClose()
        /*if(e.code == "Tab") this.#optionsListOpenClose()*/
        if(e.code == "Enter") this.#optionsListOpenClose()
        if(e.code == "ArrowUp") this.#previousOption()
        if(e.code == "ArrowDown") this.#nextOption()
    }

    #previousOption(){
        const currentHighlightedOption = this.#getHighlightedOption() || this.#getSelectedOption()
        const currentHighlightedOptionIndex = this.#customSelectOptions.indexOf(currentHighlightedOption)
        const previousOption = this.#customSelectOptions[currentHighlightedOptionIndex].previousSibling
        if(previousOption) {
            //this.#customSelectLabel.setAttribute('aria-activedescendant', previousOption.id)
            this.#setAsSelected(previousOption)
            this.#setAsHighlighted(previousOption)
        }
    }

    #nextOption(){
        const currentHighlightedOption = this.#getHighlightedOption() || this.#getSelectedOption()
        const currentHighlightedOptionIndex = this.#customSelectOptions.indexOf(currentHighlightedOption)
        const nextOption = this.#customSelectOptions[currentHighlightedOptionIndex].nextSibling
        if(nextOption) {
            //this.#customSelectLabel.setAttribute('aria-activedescendant', nextOption.id)
            this.#setAsSelected(nextOption)
            this.#setAsHighlighted(nextOption)
        }
    }

    #optionsListOpenClose(){
        const optionsContainer = this.#shadowDOM.querySelector(".customSelectOptionsContainer")
        const arrow = this.#shadowDOM.querySelector(".customSelectArrow")
        const isListClosed = optionsContainer.style.display === "none" || optionsContainer.style.display === ""
        if(isListClosed) { 
            optionsContainer.style.display = 'flex'
            arrow.style.transform = "rotate(0deg)"
            this.#customSelectLabel.setAttribute("aria-expanded", true)
        }
        else{ 
            optionsContainer.style.display = 'none'
            arrow.style.transform = "rotate(180deg)"
            this.#customSelectLabel.setAttribute("aria-expanded", false)
            this.#customSelectLabel.focus()
        }                  
    }

    // sets an option as selected
    #setAsSelected(customOption){
        this.#customSelectOptions.forEach(option => {
            option.classList.remove("selectedOption")
            option.setAttribute("aria-selected", false)
        })
        this.#ghostSelectNode.value = customOption.getAttribute("data-value")
        customOption.classList.add("selectedOption")
        customOption.setAttribute("aria-selected", true)
        this.#updateLabel(customOption.innerText)
        dropdownChange()
    }

    // sets an option as highlighted
    #setAsHighlighted(customOption){
        this.#customSelectOptions.forEach(option => {
            option.classList.remove("highlightedOption")
        })
        customOption.classList.add("highlightedOption")
        this.#customSelectLabel.setAttribute('aria-activedescendant', customOption.id)
    }

    #getSelectedOption(){
        return this.#shadowDOM.querySelector('.selectedOption')
    }

    #getHighlightedOption(){
        return this.#shadowDOM.querySelector('.highlightedOption')
    }
}

customElements.define("custom-select", CustomSelect)