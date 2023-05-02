import mediaLibrary from "../models/mediaLibrary.js"

/* eslint-disable no-unused-vars, no-undef */
class Gallery {
    
    #galleryNode

    constructor(gallerySelector){
        this.#galleryNode = document.querySelector(gallerySelector)

    }

    displayError(){
        this.#galleryNode.innerHTML = "Error : Unknown photographer."
        this.#galleryNode.classList.add('galleryError')    
    }

    // render the gallery
    render(medias){
        this.#galleryNode.innerHTML = ""
        // push each media view to the DOM
        medias.forEach(media => {
            const mediaCardDOM = media.getMediaCardDOM() // TODO error testing
            this.#galleryNode.appendChild(mediaCardDOM)
        })
        // set like buttons clickable
        const likeButtons = document.querySelectorAll('.heart-button')
        likeButtons.forEach(button => button.addEventListener('click', () => mediaLibrary.invertMediaLikeState(button.dataset.mediaIndex)))
    }

    // update a card likes value without refreshing the whole gallery
    updateMediaCardLikes(mediaId){ 
        const target = document.querySelector('#likecontainer-'+mediaId)
        target.innerHTML = mediaLibrary.selectMedia(mediaId).liked + mediaLibrary.selectMedia(mediaId).likes
    }
}

const gallery = new Gallery(".gallery")

export default gallery