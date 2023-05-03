import photographerFactory from "../factories/photographer.js"

export default class PhotographerHeader {
    #containerNode
    #photographerSectionDOM

    constructor(photographerInfos){
        this.#containerNode = document.querySelector("#main")
        const photographerModel = photographerFactory(photographerInfos, "photographer.html")
        this.#photographerSectionDOM = photographerModel.getUserCardDOM()
        return this
    }

    render(){
        this.#containerNode.prepend(this.#photographerSectionDOM)
    }
}