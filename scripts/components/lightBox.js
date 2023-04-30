/* eslint-disable no-unused-vars */
export default class Lightbox {

    #currentLibraryIndex
    #modaleNode
    #mediaLibrary

    constructor(modaleNode){
        window.addEventListener('keydown', e => this.#keyboardListener(e))
        this.#modaleNode = modaleNode
        this.#currentLibraryIndex = 0
        modaleNode.addEventListener('click', (event)=> {
            if(event.target==modaleNode) this.close()
        })
     }

    bindto(mediaLibrary){
        this.#mediaLibrary = mediaLibrary // act as a reference, not a copy, so keep being updated // maybe use an observer instead to link both parties?
        return this
    }

    #keyboardListener(e) // ACCESSIBILITY : keyboard navigation
    {
        if(e.code == "Escape") return this.close() 
        if(e.code == "ArrowRight") return this.nextMedia()
        if(e.code == "ArrowLeft") return this.prevMedia()
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

    // retrieveMediaFromLibrary(mediaId){
    retrieveMediaFromLibrary(){
        const media = this.#mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        return media 
    }

    prevMedia(){
        this.#currentLibraryIndex-1>=0 ? this.#currentLibraryIndex-- : this.#currentLibraryIndex = this.#mediaLibrary.length-1
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
        // focus() image for screen reader to describe image right after switching
        document.querySelector('#main-media').focus()
    }

    nextMedia(){
        this.#currentLibraryIndex+1 > this.#mediaLibrary.length-1 ? this.#currentLibraryIndex = 0 : this.#currentLibraryIndex++
        const media = this.retrieveMediaFromLibrary(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
        // focus() image for screen reader to describe image right after switching
        document.querySelector('#main-media').focus()
    }

    open(mediaId){
        this.#scrollLock(true)
        this.#currentLibraryIndex = this.#mediaLibrary.getIndexOf(mediaId)
        const media = this.#mediaLibrary.getMediaAtIndex(this.#currentLibraryIndex)
        this.updateDisplayedMedia(media)
        this.#modaleNode.showModal()
        this.#modaleNode.style.display = "flex"
        // focus() for screen reader to describe image right after opening the lightbox
        document.querySelector('#main-media').focus()
    }

    close(){
        this.#scrollLock(false)
        this.#modaleNode.close()
        this.#modaleNode.style.display = "none"
    }
}