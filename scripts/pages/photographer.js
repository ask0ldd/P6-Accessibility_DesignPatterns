const currentPage = "photographer.html"
const jsonUrl = "../data/photographers.json"

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

const fetchDatas = async() => {
    const response =  await fetch(jsonUrl)
    const datas = await response.json() 
    return datas
}

// 1 > fetching selected photographer's datas 
async function fetchSelectedPhotographerDatas(id) {
    try{
        const datas = await fetchDatas()
        photographer = datas.photographers.filter(photographer => photographer.id === id)[0]
        medias = datas.media.filter(media => media.photographerId === id)
        return ({photographerInfos : photographer, medias : medias})
    }
    catch(error){
        console.error(error)
        return {errorMessage : "Fetch error : This profile can't be displayed."}
    }
}

function mediastoDOM(medias){
    const gallerySection = document.querySelector(".gallery")
    medias.forEach(media => {
        const mediaModel = mediaFactory(media)
        const mediaCardDOM = mediaModel.getMediaCardDOM()
        gallerySection.appendChild(mediaCardDOM)
    })
}

async function init() {
    const currentPhotographerId = getIdParam()
    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId)
    errorMessage == undefined ? mediastoDOM(medias) : console.log(errorMessage)
};

init();