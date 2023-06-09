// Products blueprints
/* eslint-disable no-unused-vars,no-undef */
import { getShortImageView, getImageView } from "../views/picture.js"
import { getShortVideoView, getVideoView } from "../views/video.js"
class Media {
    #id
    #owner
    #title
    #likes
    #date
    #price
    #liked

    hasTheRightStructure(media) {
        if(!media.id || !media.photographerId || !media.title || !media.date || !media.price) return false
        // TODO : verify the nature of data too
        return true
    }

    constructor(media){
        if (this.hasTheRightStructure(media) === false) throw new Error('Cant create the requested object with such datas')
        this.#id = media.id != null ? media.id : 'n/a'
        this.#owner = media.photographerId != null ? media.photographerId : 'n/a'
        this.#likes = media.likes != null ? media.likes : 'n/a'
        this.#title = media.title != null ? media.title : 'n/a'
        this.#date = media.date != null ? media.date : 'n/a'
        this.#price = media.price != null ? media.price : 'n/a'
        this.#liked = false
    }

    // so those variables can be accessed via the children
    get title(){ return this.#title }
    get date(){ return this.#date }
    get likes(){ return this.#likes }
    get liked(){ return this.#liked }
    set liked(bool){ this.#liked = bool }
    get owner(){ return this.#owner }
    get id(){ return this.#id }
}

class Picture extends Media { // deport src + get src() to media class ?
    #src 
    constructor(media){
        super(media)
        this.#src=`assets/medias/${this.owner}/${media.image}`
    }

    get src(){ return this.#src }

    getViewProps(){
        return {id:this.id, src:this.#src, title:this.title, likes:this.likes + this.liked}
    }
}

class Video extends Media {
    #src
    constructor(media){
        super(media)
        this.#src=`assets/medias/${this.owner}/${media.video}`
    }

    get src(){ return this.#src }

    getViewProps(){
        return {id:this.id, src:this.#src, title:this.title, likes:this.likes + this.liked}
    }
}

// Factory function
export default function mediaFactory(media){
    let mediaModel
    if(media.video){
        mediaModel = new Video(media)

        mediaModel.getMediaCardDOM = () => {
            const viewNode = getVideoView(mediaModel.getViewProps())
            return viewNode
        }

        mediaModel.getShortMediaCardDOM = () => {
            const viewNode = getShortVideoView(mediaModel.getViewProps())
            return viewNode
        }

        return (mediaModel)
    }

    if(media.image){
        mediaModel = new Picture(media)

        mediaModel.getMediaCardDOM = () => {
            const viewNode = getImageView(mediaModel.getViewProps())
            return viewNode
        }

        mediaModel.getShortMediaCardDOM = () => {
            const viewNode = getShortImageView(mediaModel.getViewProps())
            return viewNode
        }

        return (mediaModel)
    }

    return {error : "can't create the object : invalid media datas"}
}