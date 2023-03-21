const getImageView = ({src, title, likes}) => {
    // ACCESSIBILITY : alt added to img
    const NodeStringified = `
    <article>
        <a href="photographer.html?id=${userId}">
            <img src="${portraitSrc}" alt="${name}'s portrait"/>
            <h2>${name}</h2>
        </a>
        <p class="location">${location}</p>
        <p class="quote">${quote}</p>
        <p class="fees">${fees}€/jour</p>
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

    get title(){ return this.#title }
    get likes(){ return this.#likes }
}

class Image extends Media { // deport src + get src() to media class ?
    #src 
    #id
    #owner
    #title
    #likes
    #date
    #price
    #liked
    constructor(media){
        super(media)
        this.#src=`assets/images/${this.#owner}/${media.image}`
    }

    get src(){ return this.#src }

    getViewProps(){
        return {src:this.#src, title:this.#title, likes:this.#likes}
    }
}

class Video extends Media {
    #src
    #id
    #owner
    #title
    #likes
    #date
    #price
    #liked
    constructor(media){
        super(media)
        this.#src=`assets/images/${this.#owner}/${media.video}`
    }

    get src(){ return this.#src }

    getViewProps(){
        return {src:this.#src, title:this.#title, likes:this.#likes}
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