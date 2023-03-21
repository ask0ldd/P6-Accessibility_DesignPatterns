const currentPage = "photographer.html"

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

function mediastoDOM(medias){
    const gallerySection = document.querySelector(".gallery")
    medias.forEach(media => {
        const mediaModel = mediaFactory(media)
        if(!mediaModel?.error){
            const mediaCardDOM = mediaModel.getMediaCardDOM()
            gallerySection.appendChild(mediaCardDOM)
        }
    })
}

async function init() {
    const currentPhotographerId = getIdParam()
    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId)
    // filtering medias should happpens here / maybe : mediastoDOM(medias, filter) ?
    errorMessage == undefined ? mediastoDOM(medias) : console.log(errorMessage)
};

init();