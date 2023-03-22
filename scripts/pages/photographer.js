const currentPage = "photographer.html"
const defaultFilter = "popularity"
let filter = "popularity"
//let likedMediasIds = []
let lightbox

class MediaLibrary {
    #medias = [] // [{ mediaModel , getMediaCardDOM }, ...]
    #likes

    constructor(){}

    build(medias){
        medias.forEach(media => {
            const mediaModel = mediaFactory(media) // TODO error testing
            mediaLibrary.add(mediaModel)
        })
        console.log(this.#medias)  
    }

    add(mediaModel){
        this.#medias.push(mediaModel)
    }

    toDOM(parent){
        parent.innerHTML=""
        this.#medias.forEach(media => {
            const mediaCardDOM = media.getMediaCardDOM() // TODO error testing
            parent.appendChild(mediaCardDOM)
        })
    }

    getLikesSum(){

    }

    isLiked(mediaId){ // or liked key into the media object?

    }

    sort(){
        
    }

    setActiveFilter(){

    }
}

const mediaLibrary = new MediaLibrary()

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

const currentPhotographerId = getIdParam()

/*function buildMediaLibrary(medias){
    medias.forEach(media => {
        const mediaModel = mediaFactory(media)
        mediaLibrary.add(mediaModel)
    })
}*/

/*function librarytoDOM(){

}*/

/*function mediastoDOM(medias){
    const gallerySection = document.querySelector(".gallery")
    gallerySection.innerHTML=""
    mediaLibrary.toDOM(gallerySection)
    medias.forEach(media => { // get it out of infostoDOM and create a function buildLibrary
        const mediaModel = mediaFactory(media)
        // update mediaModel.likes cycling on likedMediasIds
        if(!mediaModel?.error){ // if mediaModel = image || video only 
            const mediaCardDOM = mediaModel.getMediaCardDOM()
            gallerySection.appendChild(mediaCardDOM)
        }
    })

    // foreach medias into mediaLibrary getDOM + gallerySection.appendChild
}*/

function photographerInfostoDOM(photographerInfos){
    const mainNode = document.querySelector("#main")
    const photographerModel = photographerFactory(photographerInfos)
    const photographerSectionDOM = photographerModel.getUserCardDOM()
    mainNode.prepend(photographerSectionDOM)
    //document.querySelector("#openModalButton").addEventListener('click', () => displayModal())
}

async function init() {
    if (isNaN(currentPhotographerId)) return console.error("Missing id param. This user doesn't exist.")

    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId, defaultFilter) // TODO deal with unknown id

    // TODO filtering medias should happpens here / maybe : mediastoDOM(medias, filter) ?
    if(errorMessage !== undefined) return console.error(errorMessage)
        // TODO duplicate medias into a new global var to be able to cycle on it to populate the lightbox

    photographerInfostoDOM(photographerInfos)
    lightbox = new Lightbox(document.querySelector('#lightbox_modal'), medias)
    mediaLibrary.build(medias)
    const gallerySection = document.querySelector(".gallery")
    mediaLibrary.toDOM(gallerySection)
    //mediastoDOM(medias)  
};

init();