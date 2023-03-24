class StickyBar{
    #photographerInfos
    #mediaLibrary
    #stickyBarNode

    constructor(stickyBarSelector){
        this.#stickyBarNode = document.querySelector(stickyBarSelector)
        if(this.#stickyBarNode == null) throw new Error("Non existing node.")
        return this
    }

    bindtoMediaLibrary(mediaLibrary){
        this.#mediaLibrary = mediaLibrary
        return this
    }

    bindtoPhotographerModel(photographerInfos){
        this.#photographerInfos = photographerInfos
        return this
    }

    update(){
        if(this.#photographerInfos == undefined) throw new Error("The sticky bar needs to be binded to a photographer model. use the bindtoPhotographerModel method.")
        if(this.#mediaLibrary == undefined) throw new Error("The sticky bar needs to be binded to a media library. Use the bindtoMediaLibrary method.")
        document.querySelector("#sticky-daily-fees").innerHTML=this.#photographerInfos.price
        document.querySelector("#sticky-total-likes").innerHTML=this.#mediaLibrary.totalLikes+' / jour'
    }

}