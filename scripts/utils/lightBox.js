class Lightbox {

    #currentLibraryIndex
    #modaleNode
    #mediaLibrary

    constructor(modaleNode){
        window.addEventListener('keydown', e => this.#keyboardListener(e))
        this.#modaleNode = modaleNode
        this.#currentLibraryIndex = 0
     }

    bindto(mediaLibrary){
        this.#mediaLibrary = mediaLibrary // act as a reference, not a copy, so keep being updated // maybe use an observer instead to link both parties?
        return this
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
        const mediaDOM = media.getShortMediaCardDOM()
        this.#modaleNode.innerHTML=""
        this.#modaleNode.appendChild(mediaDOM)
    }

    retrieveMediaFromLibrary(mediaId){
        const media = this.#mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        return media 
    }

    prevMedia(){
        this.#currentLibraryIndex-1>=0 ? this.#currentLibraryIndex-- : this.#currentLibraryIndex = this.#mediaLibrary.length-1
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
    }

    nextMedia(){
        this.#currentLibraryIndex+1 > this.#mediaLibrary.length-1 ? this.#currentLibraryIndex = 0 : this.#currentLibraryIndex++
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
    }

    open(mediaId){
        this.#scrollLock(true)
        this.#currentLibraryIndex = this.#mediaLibrary.getIndexOf(mediaId)
        const media = this.#mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        //const media = this.retrieveMediaFromLibrary(mediaId)
        this.updateDisplayedMedia(media)
        this.#modaleNode.showModal()
        this.#modaleNode.style.display = "flex"
        this.#modaleNode.style.justifyContent = "center"
    }

    close(){
        this.#scrollLock(false)
        this.#modaleNode.style.display = "none"
        this.#modaleNode.close()
    }
}