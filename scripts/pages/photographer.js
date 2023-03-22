const currentPage = "photographer.html"
const defaultFilter = "popularity"
let filter = "popularity"
//let likedMediasIds = []
let lightbox

/*class MediaLibrary {
    #medias
    #likes
    // medias : [{media : mediaModel.media, getDOM : mediaModel.getMediaCardDOM}, ... ]

    constructor(){

    }

    getLikesSum(){

    }

    isLiked(mediaId){

    }

    getFilteredMedias(){

    }

    setActiveFilter(){

    }
}*/

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

const currentPhotographerId = getIdParam()

function buildLibrary(){
    
}

function librarytoDOM(){

}

function mediastoDOM(medias){
    const gallerySection = document.querySelector(".gallery")
    gallerySection.innerHTML=""
    medias.forEach(media => { // get it out of infostoDOM and create a function buildLibrary
        const mediaModel = mediaFactory(media)
        // update mediaModel.likes cycling on likedMediasIds
        if(!mediaModel?.error){ // if mediaModel = image || video only 
            const mediaCardDOM = mediaModel.getMediaCardDOM()
            gallerySection.appendChild(mediaCardDOM)
        }
    })
}

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
    mediastoDOM(medias)  
};

init();