/* eslint-disable no-unused-vars */

export default class formModale {
    modaleNode
    formNod

    constructor(modaleSelector, formSelector){
        this.modaleSelector = modaleSelector
        this.modaleNode = document.querySelector(modaleSelector)
        this.formSelector = formSelector
        this.formNod = document.querySelector(formSelector)
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