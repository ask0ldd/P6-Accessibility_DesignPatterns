/* eslint-disable no-unused-vars, no-undef */
class Gallery {
    
    #galleryNode

    constructor(gallerySelector){
        this.#galleryNode = document.querySelector(gallerySelector)

    }

    displayError(){
        // const gallerySection = document.querySelector(".gallery")
        this.#galleryNode.innerHTML = "Error : Unknown photographer."
        this.#galleryNode.classList.add('galleryError')    
    }

    render(medias){
        // push the media views to the DOM
        this.#galleryNode.innerHTML = ""
        medias.forEach(media => {
            const mediaCardDOM = media.getMediaCardDOM() // TODO error testing
            this.#galleryNode.appendChild(mediaCardDOM)
        })
    }


}

const gallery = new Gallery(".gallery")

export default gallery