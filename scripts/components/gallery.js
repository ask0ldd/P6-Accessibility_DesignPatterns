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
        // push the photographer infos to the DOM
        mediaLibrary.build(medias).sort(defaultFilter)

        // push the mediaLibrary to the DOM
        mediaLibrary.bindtoDOMTarget(this.#galleryNode).pushtoDOM()
    }


}

const gallery = new Gallery(".gallery")

export default gallery