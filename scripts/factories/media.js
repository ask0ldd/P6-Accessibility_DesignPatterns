// Products blueprints
/* eslint-disable no-unused-vars,no-undef */
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
        this.#id = media.id
        this.#owner = media.photographerId
        this.#likes = media.likes
        this.#title = media.title
        this.#date = media.date
        this.#price = media.price
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
function mediaFactory(media){
    let mediaModel
    if(media.video){
        mediaModel = new Video(media)

        function getMediaCardDOM(){
            const viewStringified = getVideoView(mediaModel.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }

        function getShortMediaCardDOM(){
            const viewStringified = getShortVideoView(mediaModel.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }

        return { mediaModel, getMediaCardDOM, getShortMediaCardDOM }
    }

    if(media.image){
        mediaModel = new Picture(media)

        function getMediaCardDOM(){
            const viewStringified = getImageView(mediaModel.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }

        function getShortMediaCardDOM(){
            const viewStringified = getShortImageView(mediaModel.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }

        return { mediaModel, getMediaCardDOM, getShortMediaCardDOM }
    }

    return {error : "can't create the object : invalid media datas"}
}