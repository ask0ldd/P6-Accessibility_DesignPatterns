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
    return validators.name(firstname) && validators.name(name) && validators.email(email) && validators.message(message)
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
    }

    open(){
        this.modaleNode.showModal()
        this.modaleNode.style.display = "flex"
    }

    close(){
        this.modaleNode.close()
        this.modaleNode.style.display = "none"
    }

    submitForm(e){
        e.preventDefault()
        const formdata = new FormData(this.formNod)
        if(validators.testAll(formdata.get('prenom'), formdata.get('nom'), formdata.get('email'), formdata.get('message')) === false ) return false
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