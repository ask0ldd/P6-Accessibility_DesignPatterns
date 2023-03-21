const currentPage = "photographer.html"

const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

// 1 > fetching photographers datas 
async function getPhotographers() {
    try{
        const datas = await fetchDatas()
        photographer = datas.photographers.filter(photographer => photographer.id === id)[0]
        medias = datas.media.filter(media => media.photographerId === id)
        return ({photographerInfos : photographer, medias : medias})
    }
    catch(error){
        console.error(error)
    }
}


async function init() {
    const currentPhotographerId = getIdParam()

};

init();