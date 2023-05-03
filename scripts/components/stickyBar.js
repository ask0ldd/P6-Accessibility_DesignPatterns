/* eslint-disable no-unused-vars */
class StickyBar{
    #mediaLibrary
    #stickyBarNode
    #photographerFees

    constructor(stickyBarSelector){
        this.#stickyBarNode = document.querySelector(stickyBarSelector)
        if(this.#stickyBarNode == null) throw new Error("Non existing node.")
    }

    // amount of likes source, used during the refresh process
    bindtoMediaLibrary(mediaLibrary){
        this.#mediaLibrary = mediaLibrary
        return this
    }

    setPhotographerFees(fees){
        this.#photographerFees = fees != null ? parseInt(fees) : 0
        return this
    }

    // refresh the amount of likes displayed into the sticky bar
    render(){
        if(this.#photographerFees === undefined) throw new Error("The photographer's daily fees needs to be passed to the sticky bar via the setFees method.")
        if(this.#mediaLibrary === undefined) throw new Error("The sticky bar needs to be binded to a media library. Use the bindtoMediaLibrary method.")
        document.querySelector("#sticky-daily-fees").innerHTML = this.#photographerFees + '€ / jour'
        document.querySelector("#sticky-total-likes").innerHTML = this.#mediaLibrary.totalLikes
    }

    update(){
        document.querySelector("#sticky-total-likes").innerHTML = this.#mediaLibrary.totalLikes
    }

    hide(){
        this.#stickyBarNode.style.display = "none"
    }

}

const stickybar = new StickyBar(".sticky-bar")

export default stickybar