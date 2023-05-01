import mediaLibrary from "../models/mediaLibrary.js"

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
        // clicking the like buttons > like added to the target media into the medialibrary
        const likeButtons = document.querySelectorAll('.heart-button')
        likeButtons.forEach(button => button.addEventListener('click', () => likeUnlikeMedia(button.dataset.mediaIndex)))
    }

    updateMediaCardLikes(mediaId){
        const target = document.querySelector('#likecontainer-'+mediaId)
        target.innerHTML = mediaLibrary.selectMedia(mediaId).liked + mediaLibrary.selectMedia(mediaId).likes
    }
}

const gallery = new Gallery(".gallery")

export default gallery