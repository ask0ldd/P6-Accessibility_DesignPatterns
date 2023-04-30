/* eslint-disable no-unused-vars */
const jsonUrl = "../../data/photographers.json"

const fetchDatas = async() => {
    try{
        const response =  await fetch(jsonUrl)
        const datas = await response.json() 
        return datas
    }catch(error){
        console.error(error)
    }
}

function getSelectedPhotographerMedias(photographerId, datas){
    return datas.media.filter(media => media.photographerId === photographerId)
}

export async function fetchSelectedPhotographerDatas(photographerId) {
    try{
        const datas = await fetchDatas()
        const photographer = datas.photographers.filter(photographer => photographer.id === photographerId)[0]
        if(photographer === undefined) throw new Error("No user linked to this id.")
        const medias = getSelectedPhotographerMedias(photographerId, datas)
        if(medias === undefined) throw new Error("No medias linked to this id.")      
        // TODO test if each media has a likes / date / title value, if not, show an error or maybe filtering out all media that don't have those values
        // move filtering to mediaLibrary
        return ({photographerInfos : photographer, medias})
    }
    catch(error){
        console.error(error)
        return {errorMessage : error}
    }
}

export async function fetchPhotographers() {

    try{
        const datas = await fetchDatas()
        return {photographers: datas.photographers}
    }
    catch(error){
        console.error(error)
        return {errorMessage : "Fetch error : This listing can't be displayed."}
    }
}

