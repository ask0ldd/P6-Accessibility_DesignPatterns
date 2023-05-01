/* eslint-disable no-unused-vars, no-undef */
import gallery from "./gallery.js"
import mediaLibrary from "../models/mediaLibrary.js"
class CustomSelect extends HTMLElement{
    #shadowDOM
    #customSelectLabel
    #optionsContainer
    #customSelectOptions
    #optionsList
    #isOptionsListOpen
    // #customSelectValueChangeEvent

    constructor(){
        super()
        this.#shadowDOM = this.attachShadow({ mode: "open" })
        this.#isOptionsListOpen = false

        // build the options out of a hardcoded array
        this.#optionsList = this.buildOptionsList()

        // <custom-select> : value attribute = default selected option
        const selectedOptionValue = this.#optionsList.filter(option => option.selected === true)[0].value
        this.setAttribute('value', selectedOptionValue)

        // build the view and push it to the ShadowDOM
        const view = this.#buildView(this.#optionsList)
        this.#shadowDOM.append(view)

        this.setEventsListeners()
    }

    setEventsListeners(){
        // opening / closing options list
        this.#customSelectLabel = this.#shadowDOM.querySelector(".customSelectLabel")
        this.#customSelectLabel.addEventListener('click', () => this.#optionsListOpenClose())

        // keyboard handling
        window.addEventListener('keydown', e => this.#keyboardListener(e))

        // adding event listeners to each option of the list : select / highlight
        this.#optionsContainer = this.#shadowDOM.querySelector('.customSelectOptionsContainer')
        this.#customSelectOptions = Array.from(this.#shadowDOM.querySelectorAll('.customSelectOption'))
        this.#customSelectOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.#setAsSelected(option)
                this.#setAsHighlighted(option)
                this.#optionsListOpenClose()
            })
            option.addEventListener('mouseover', () => this.#setAsHighlighted(option))
        })

        // clicking outside of the open list should close it
        document.querySelector('custom-select').addEventListener('focusout', () => {
            if(this.#optionsContainer.style.display !== 'none') this.#closeList()
        })

        // when the value of the custom select change, an event is triggered to call for a medialibrary resorting / moved from pages/photographer
        document.querySelector('custom-select').addEventListener('valueChange', (e) => {
            mediaLibrary.sort(e.detail.customSelectValue)
            gallery.render(mediaLibrary.getAllMedias())
        })
    }

    buildOptionsList(){
        return [
            {
                value : 'likesDesc',
                label : 'Popularité',
                selected : true
            },
            {
                value : 'dateDesc',
                label : 'Date',
                selected : false
            },
            {
                value : 'titleAsc',
                label : 'Titre',
                selected : false
            },
        ]
    }

    get ShadowDOMNode(){
        return this.#shadowDOM
    }

    #buildView(selectOptions){
        const viewContainer = document.createElement("template")
        const selectedOptionId = selectOptions.filter(option => option.selected === true)
        viewContainer.innerHTML = `
        <link rel="stylesheet" href="css/customSelect.css"/>
        <div class="customSelectContainer">
            <span tabindex="0" name="customSelectLabel"  aria-controls="customListbox" id="customSelectLabel" role="combobox" 
            aria-haspopup="listbox" aria-activedescendant="${selectedOptionId[0].value}" aria-expanded="false" class="customSelectLabel">Popularité
            <img class="customSelectArrow" src="./assets/icons/select-arrow.svg"/></span>
            <ul tabindex="-1" id="customListbox" aria-labelledby="customSelectLabel" class="customSelectOptionsContainer" role="listbox">`+
            selectOptions.reduce((accu, option) => 
            accu + `<li id="${option.value}"
            role="option" data-value="${option.value}" value="${option.value}"
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
        if(e.code == "Enter" || e.code == "NumpadEnter") return this.#optionsListOpenClose()
        if(this.#isOptionsListOpen === true){
            // e.preventdefault to avoid screen scrolling when using the arrow keys to select an option
            if(e.code == "ArrowUp" && this.#isOptionsListOpen === true) {e.preventDefault(); return this.#previousOption()} 
            if(e.code == "ArrowDown" && this.#isOptionsListOpen === true) {e.preventDefault(); return this.#nextOption()}
            // if the list is open, any key pressed besides arrowup and arrowdown should close it
            return this.#closeList()
        }
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
        const arrow = this.#shadowDOM.querySelector(".customSelectArrow")
        const isListClosed = this.#optionsContainer.style.display === "none" || this.#optionsContainer.style.display === ""
        if(isListClosed) {
            this.#optionsContainer.style.display = 'flex'
            arrow.style.transform = "rotate(0deg)"
            this.#customSelectLabel.setAttribute("aria-expanded", true)
            this.#shadowDOM.querySelector('.customSelectContainer').style.borderRadius = "5px 5px 0 0"
            this.#isOptionsListOpen = true
        }
        else{ 
            this.#closeList()
        }                  
    }

    #closeList(){
        this.#optionsContainer.style.display = 'none'
        this.#shadowDOM.querySelector(".customSelectArrow").style.transform = "rotate(180deg)"
        this.#customSelectLabel.setAttribute("aria-expanded", false)
        this.#shadowDOM.querySelector('.customSelectContainer').style.borderRadius = "5px"
        this.#customSelectLabel.focus()
        this.#isOptionsListOpen = false
    }

    // sets an option as selected
    #setAsSelected(customOption){
        this.#customSelectOptions.forEach(option => {
            option.classList.remove("selectedOption")
            option.setAttribute("aria-selected", false)
        })
        customOption.classList.add("selectedOption")
        customOption.setAttribute("aria-selected", true)
        this.#updateLabel(customOption.innerText)
        
        const filterValue = customOption.getAttribute("value")
        this.#updateCustomSelectValueAttribute(filterValue)
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

    #updateCustomSelectValueAttribute(value){
        this.setAttribute('value', value)
        // event sending the value of the custom select
        const customSelectValueChangeEvent = new CustomEvent("valueChange", {
            detail: {
                customSelectValue : value
            },
            bubbles: true,
            cancelable: true,
            composed: true, // true : the event bubbles through the shadowDOM
        })
        this.dispatchEvent(customSelectValueChangeEvent);
    }

}

customElements.define("custom-select", CustomSelect)