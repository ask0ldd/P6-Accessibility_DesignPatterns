class Lightbox {

    #mediasLibrary
    #currentLibraryIndex
    #modaleNode

    constructor(modaleNode, medias){
        window.addEventListener('keydown', e => this.#keyboardListener(e))
        this.#modaleNode = modaleNode
        this.#currentLibraryIndex = 0
        if(medias) this.updateMediasLibrary(medias)
    }

    updateMediasLibrary(medias){
        if(medias) this.#mediasLibrary = medias
    }

    getMediaIndex(mediaId){
        // throw error if media doesn't exist
    }

    setCurrentMedia(mediaId){

    }

    prevMedia(){

    }

    nextMedia(){

    }

    #keyboardListener(e) // ACCESSIBILITY : keyboard navigation
    {
        if(e.keyCode == 27) return this.close() 
        if(e.keyCode == 39) return this.nextMedia()
        if(e.keyCode == 37) return this.prevMedia()
    }

    #scrollLock(bool = false)
    {
        if(bool)
        {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
            window.onscroll = () => {
                window.scrollTo(scrollLeft, scrollTop)
            }
        }else{
            window.onscroll = () => {}
        }
    }

    open(mediaId){
        this.#scrollLock(true)
        this.#currentLibraryIndex = this.getMediaIndex(mediaId)
        this.#modaleNode.showModal()
        this.#modaleNode.style.display = "flex"
    }

    close(){
        this.#scrollLock(false)
        this.#modaleNode.style.display = "none"
        this.#modaleNode.close()
    }
}