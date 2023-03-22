class Lightbox {

    #mediasLibrary
    #currentMedia

    constructor(medias){
        if(medias) this.#mediaLibrary = medias
        this.#currentMedia = 0
    }

    /*addMediaLibrary(medias){

    }*/

    updateMediasLibrary(medias){
        if(medias) this.#mediaLibrary = medias
    }

    setCurrentMedia(mediaId){

    }

    prevMedia(){

    }

    nextMedia(){

    }

    show(){

    }

    hide(){

    }
}