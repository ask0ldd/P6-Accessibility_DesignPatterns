const getVideoView = ({src, title, likes}) => {
    // TODO : alt to add to video??
    const NodeStringified = `
    <article>
        <video src=${src} controls="true"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <p>${likes}</p>
        </div>
    </article>
    `
    return NodeStringified
}

const getImageView = ({src, title, likes}) => {
    // ACCESSIBILITY : alt added
    const NodeStringified = `
    <article>
        <img src=${src} alt="${title}"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <p>${likes}</p>
        </div>
    </article>
    `
    return NodeStringified
}

// Products blueprints
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
    get likes(){ return this.#likes }
    get owner(){ return this.#owner }
}

class Image extends Media { // deport src + get src() to media class ?
    #src 
    constructor(media){
        super(media)
        this.#src=`assets/medias/${this.owner}/${media.image}`
    }

    get src(){ return this.#src }

    getViewProps(){
        return {src:this.#src, title:this.title, likes:this.likes}
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
        return {src:this.#src, title:this.title, likes:this.likes}
    }
}

// Factory function
function mediaFactory(media){
    let formatedMedia
    if(media.video){
        formatedMedia = new Video(media)

        function getMediaCardDOM(){
            const viewStringified = getVideoView(formatedMedia.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }
    }

    if(media.image){
        formatedMedia = new Image(media)

        function getMediaCardDOM(){
            const viewStringified = getImageView(formatedMedia.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }
    } // TODO si ni image ni video : throw error et return error

    return { formatedMedia, getMediaCardDOM } // return error
}