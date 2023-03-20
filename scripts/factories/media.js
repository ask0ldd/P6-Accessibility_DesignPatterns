// Products blueprints
class Media {
    #id
    #owner
    #title
    #likes
    #date
    #price
    #liked

    doesMediaContainsRequiredValues(media){
        if(!media.id || !media.photographerId || !media.title || !media.date || !media.price) return true
        return false
    }

    constructor(media){
        if (doesMediaContainsRequiredValues(media) === false) throw new ConstructorError('Cant create the requested object with such datas')
        this.#id = media.id
        this.#owner = media.photographerId
        this.#likes = media.likes
        this.#title = media.title
        this.#date = media.date
        this.#price = media.price
        this.#liked = false
    }
}

class Image extends Media {
    constructor(media){
        super(media)
    }
}

class Video extends Media {
    constructor(media){
        super(media)
    }
}

// Factory function
function mediaFactory(media){
    if(media.video){
        return new Video(media)
    }
    if(media.image){
        return new Image(media)
    }
}