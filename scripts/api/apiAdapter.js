/* eslint-disable no-unused-vars */
const jsonUrl = "data/photographers.json"

const fetchDatas = async() => {
    try{
        const response =  await fetch(jsonUrl)
        const datas = await response.json() 
        return datas
    }catch(error){
        console.error(error)
    }
}

export default class API {

    static async getPhotographer(photographerId){
        try{
            const datas = await fetchDatas()
            const photographer = datas.photographers.filter(photographer => photographer.id === photographerId)[0]
            if(photographer == null) throw new Error("No user linked to this id.")
            return photographer
        }
        catch(error){
            console.error(error)
            return {errorMessage : error}
        }
    }

    static async getAllPhotographers(){
        try{
            const datas = await fetchDatas()
            if(datas.photographers == null) throw new Error("Can't find any user.")
            return {photographers: datas.photographers}
        }
        catch(error){
            console.error(error)
            return {errorMessage : error}
        }
    }

    static async getMedias(photographerId){
        try{
            const datas = await fetchDatas()
            const medias = datas.media.filter(media => media.photographerId === photographerId)
            if(medias == null || medias == []) throw new Error("No medias linked to this user.")
            return medias
        }
        catch(error){
            console.error(error)
            return {errorMessage : error}
        }
    }

    static async getPhotographerWithDatas(photographerId){
        try{
            const photographer = await this.getPhotographer(photographerId)
            const medias = await this.getMedias(photographerId)
            return ({photographerInfos : photographer, medias})
        }
        catch(error){
            console.error(error)
            return {errorMessage : error}
        }
    }
}