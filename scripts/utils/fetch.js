const jsonUrl = "../data/photographers.json"

const fetchDatas = async() => {
    const response =  await fetch(jsonUrl)
    const datas = await response.json() 
    return datas
}

async function fetchSelectedPhotographerDatas(id) {
    try{
        const datas = await fetchDatas()
        const photographer = datas.photographers.filter(photographer => photographer.id === id)[0] // TODO deal with no photographer after filtering
        const medias = datas.media.filter(media => media.photographerId === id) // TODO deal with no medias after filtering
        return ({photographerInfos : photographer, medias : medias})
    }
    catch(error){
        console.error(error)
        return {errorMessage : "Fetch error : This profile can't be displayed."}
    }
}

async function fetchPhotographers() {

    try{
        const datas = await fetchDatas()
        return {photographers: datas.photographers}
    }
    catch(error){
        console.error(error)
        return {errorMessage : "Fetch error : This listing can't be displayed."}
    }
}

