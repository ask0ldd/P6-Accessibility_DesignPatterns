/* eslint-disable no-unused-vars */

const validators = {}

validators.name = (value) => {
    const nameRegex = new RegExp ("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
    return nameRegex.test(value.trim())
}

validators.email = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value.trim())
}

validators.message = (value) => {
    return value.trim().length > 6
}

validators.testAll = (firstname, name, email, message) => {
    //return validators.name(firstname) && validators.name(name) && validators.email(email) && validators.message(message)
    return {
        result : validators.name(firstname) && validators.name(name) && validators.email(email) && validators.message(message),
        firstname : validators.name(firstname),
        name : validators.name(name),
        email : validators.email(email),
        message : validators.message(message),
    }
}

export default class formModale {
    modaleNode
    formNod

    constructor(modaleSelector, formSelector){
        this.modaleSelector = modaleSelector
        this.modaleNode = document.querySelector(modaleSelector)
        this.formSelector = formSelector
        this.formNod = document.querySelector(formSelector)
        this.modaleNode.addEventListener('click', (event)=> {
            if(event.target==this.modaleNode) this.close()
        })
        this.formNod.addEventListener("submit", e => this.submitForm(e))
        this.modaleNode.addEventListener('keydown', e => {if(e.code == "Escape") return this.close()})
    }

    open(){
        this.modaleNode.showModal()
        this.modaleNode.style.display = "flex"
    }

    close(){
        // hiding errors p
        document.querySelectorAll('form p').forEach( p => p.style.display = "none")
        this.modaleNode.close()
        this.modaleNode.style.display = "none"
    }

    submitForm(e){
        e.preventDefault()
        const formdata = new FormData(this.formNod)
        const validatorsTests = validators.testAll(formdata.get('prenom'), formdata.get('nom'), formdata.get('email'), formdata.get('message'))
        if(!validatorsTests.result){
            if(!validatorsTests.firstname) document.querySelector('#prenom-error').style.display = "block"
            if(!validatorsTests.name) document.querySelector('#nom-error').style.display = "block"
            if(!validatorsTests.email) document.querySelector('#email-error').style.display = "block"
            if(!validatorsTests.message) document.querySelector('#message-error').style.display = "block"
            return false
        }
        console.log('PRENOM : ',formdata.get('prenom'))
        console.log('NOM : ',formdata.get('nom'))
        console.log('EMAIL : ',formdata.get('email'))
        console.log('MESSAGE : ',formdata.get('message'))
        this.formNod.reset()
        this.close()
    }

    get formNode(){
        return this.formNod
    }
}