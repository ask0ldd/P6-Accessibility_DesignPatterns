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

    render({photographerInfos, medias, mediaLibrary, defaultFilter}){
        // build the library with media & push it to the DOM
        mediaLibrary.build(medias).sort(defaultFilter)
        mediaLibrary.bindtoDOMTarget(this.#galleryNode).pushtoDOM() // instead of pushing it to dom, should be received then pushed by this method
    }


}

const gallery = new Gallery(".gallery")

export default gallery