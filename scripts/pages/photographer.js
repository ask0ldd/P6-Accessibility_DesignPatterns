const currentPage = "photographer.html"

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

function mediastoDOM(medias){
    const gallerySection = document.querySelector(".gallery")
    medias.forEach(media => {
        const mediaModel = mediaFactory(media)
        if(!mediaModel?.error){ // if mediaModel = image || video only 
            const mediaCardDOM = mediaModel.getMediaCardDOM()
            gallerySection.appendChild(mediaCardDOM)
        }
    })
}

function photographerInfostoDOM(photographerInfos){
    const mainTag = document.querySelector("#main")
    const photographerModel = photographerFactory(photographerInfos)
    const photographerSectionDOM = photographerModel.getUserCardDOM()
    mainTag.prepend(photographerSectionDOM)
    document.querySelector("#openModalButton").addEventListener('click', () => displayModal())
}

async function init() {
    const currentPhotographerId = getIdParam()
    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId)
    // filtering medias should happpens here / maybe : mediastoDOM(medias, filter) ?
    if(errorMessage === undefined){
        photographerInfostoDOM(photographerInfos)
        mediastoDOM(medias)
    }else{
        console.log(errorMessage)
        // afficher message d'erreur
    }
};

init();