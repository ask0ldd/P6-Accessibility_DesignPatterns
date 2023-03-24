class StickyBar{
    #photographerModel
    #MediaLibrary
    #stickyBarNode

    constructor(stickyBarSelector){
        this.#stickyBarNode = document.querySelector(stickyBarSelector)
        if(this.#stickyBarNode == null) throw new Error("Non existing node.")
    }

    static bindtoMediaLibrary(medialLibrary){
        this.#mediaLibrary = medialLibrary
    }

    static bindtoPhotographerModel(photographerModel){
        this.#photographerModel = photographerModel
    }

    static update(){
        if(this.#photographerModel == undefined) throw new Error("The sticky bar needs to be binded to a photographer model. use the bindtoPhotographerModel method.")
        if(this.#mediaLibrary == undefined) throw new Error("The sticky bar needs to be binded to a media library. Use the bindtoMediaLibrary method.")
    }

}