const currentPage = "photographer.html"

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

// 1 > fetching selected photographer's datas 
async function fetchSelectedPhotographerDatas() {
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

async function init() {
    const currentPhotographerId = getIdParam()
    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId);
};

init();