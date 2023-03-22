const jsonUrl = "../data/photographers.json"

const fetchDatas = async() => {
    const response =  await fetch(jsonUrl)
    const datas = await response.json() 
    return datas
}

function getSelectedPhotographerMedias(photographerId, datas){
    return datas.media.filter(media => media.photographerId === photographerId)
}

async function fetchSelectedPhotographerDatas(photographerId, filter) {
    try{
        const datas = await fetchDatas()
        const photographer = datas.photographers.filter(photographer => photographer.id === photographerId)[0] // TODO deal with no photographer after filtering
        if(photographer === undefined) throw new Error("No user linked to this id.")
        const medias = getSelectedPhotographerMedias(photographerId, datas) // TODO deal with no medias after filtering
        if(medias === undefined) throw new Error("No medias linked to this id.")      
        // TODO test if each media has a likes / date / title value, if not, show an error or maybe filtering out all media that don't have those values
        if (filter === "popularity"  && medias.length > 1) medias.sort((a, b) => {return b.likes - a.likes}) // SORTING if medias > 1
        if (filter === "date"  && medias.length > 1) medias.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
        return ({photographerInfos : photographer, medias})
    }
    catch(error){
        console.error(error)
        return {errorMessage : error}
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

