class Lightbox {

    #currentLibraryIndex
    #modaleNode

    constructor(modaleNode, medias){
        window.addEventListener('keydown', e => this.#keyboardListener(e))
        this.#modaleNode = modaleNode
        this.#currentLibraryIndex = 0
    }

    /*updateMediasLibrary(medias){
        if(medias) this.#mediasLibrary = medias // TODO use externalized mediaLibrary instead
    }*/

    /*getMediaIndex(mediaId){
        const media = this.#mediasLibrary.filter(media => media.id === mediaId)[0] // TODO use externalized mediaLibrary instead
        return this.#mediasLibrary.indexOf(media) // TODO use externalized mediaLibrary instead
        // TODO throw error if media doesn't exist
    }*/

    setCurrentMedia(mediaId){

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

    updateDisplayedMedia(media){
        const mediaDOM = media.getMediaCardDOM()
        this.#modaleNode.innerHTML=""
        this.#modaleNode.appendChild(mediaDOM)
    }

    retrieveMediaFromLibrary(mediaId){
        const media = mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        return media 
    }

    prevMedia(){
        //this.#currentLibraryIndex-1>=0 ? this.#currentLibraryIndex-- : this.#currentLibraryIndex = this.#mediasLibrary.length-1
        //this.updateDisplayedMedia(this.#currentLibraryIndex)
        this.#currentLibraryIndex-1>=0 ? this.#currentLibraryIndex-- : this.#currentLibraryIndex = mediaLibrary.length-1
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
    }

    nextMedia(){
        //this.#currentLibraryIndex+1 > this.#mediasLibrary.length-1 ? this.#currentLibraryIndex = 0 : this.#currentLibraryIndex++
        //this.updateDisplayedMedia(this.#currentLibraryIndex)
        this.#currentLibraryIndex+1 > mediaLibrary.length-1 ? this.#currentLibraryIndex = 0 : this.#currentLibraryIndex++
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
    }

    open(mediaId){
        this.#scrollLock(true)
        this.#currentLibraryIndex = mediaLibrary.getIndexOf(mediaId)
        const media = mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        //const media = this.retrieveMediaFromLibrary(mediaId)
        this.updateDisplayedMedia(media)
        this.#modaleNode.showModal()
        this.#modaleNode.style.display = "flex"
    }

    close(){
        this.#scrollLock(false)
        this.#modaleNode.style.display = "none"
        this.#modaleNode.close()
    }
}