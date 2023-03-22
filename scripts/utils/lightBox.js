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
        const media = this.#mediasLibrary.filter(media => media.id === mediaId)[0]
        return this.#mediasLibrary.indexOf(media)
        // TODO throw error if media doesn't exist
    }

    setCurrentMedia(mediaId){

    }

    prevMedia(){
        this.#currentLibraryIndex-1>=0 ? this.#currentLibraryIndex-- : this.#currentLibraryIndex = this.#mediasLibrary.length-1
        this.updateDisplayedMedia(this.#currentLibraryIndex)
    }

    nextMedia(){
        this.#currentLibraryIndex+1 > this.#mediasLibrary.length-1 ? this.#currentLibraryIndex = 0 : this.#currentLibraryIndex++
        this.updateDisplayedMedia(this.#currentLibraryIndex)
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

    updateDisplayedMedia(index){
        const mediaModel = mediaFactory(this.#mediasLibrary[this.#currentLibraryIndex])
        const mediaDOM = mediaModel.getMediaCardDOM()
        this.#modaleNode.innerHTML=""
        this.#modaleNode.appendChild(mediaDOM)
    }

    open(mediaId){
        this.#scrollLock(true)
        // get
        this.#currentLibraryIndex = this.getMediaIndex(mediaId)
        this.updateDisplayedMedia(this.#currentLibraryIndex)
        this.#modaleNode.showModal()
        this.#modaleNode.style.display = "flex"
    }

    close(){
        this.#scrollLock(false)
        this.#modaleNode.style.display = "none"
        this.#modaleNode.close()
    }
}