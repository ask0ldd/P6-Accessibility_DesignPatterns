class MediaLibrary {
    #medias = [] // [{ mediaModel , getMediaCardDOM }, ...]
    #likes
    #currentSorting
    #DOMTarget

    constructor(DOMTarget){
        if(DOMTarget) this.#DOMTarget = DOMTarget
    }

    // build the medialibrary cycling through all the medias produced by the mediafactory
    build(medias){
        medias.forEach(media => {
            const mediaModel = mediaFactory(media) // TODO error testing
            mediaLibrary.add(mediaModel)
            console.log(mediaModel)
        })
        return this // for methods chaining
    }

    // add a media generated by the mediafactory to the medialibrary
    add(mediaModel){
        if(mediaModel) this.#medias.push(mediaModel)
    }

    // specify a container for the nodal representation of the medialibrary
    bindtoDOMTarget(DOMTarget){
        if(DOMTarget) this.#DOMTarget = DOMTarget
        return this // for methods chaining
    }

    // push to the DOM a nodal representation of the medialibrary
    pushtoDOM(){
        if(!this.#DOMTarget) throw new Error("Use addDOMTarget() method beforehand to specify a parent container")
        this.#DOMTarget.innerHTML=""
        this.#medias.forEach(media => {
            const mediaCardDOM = media.getMediaCardDOM() // TODO error testing
            this.#DOMTarget.appendChild(mediaCardDOM)
        })
    }
    
    // return mediaModel so getter and setter methods can't be accessed through chaining
    selectMedia(mediaId){
        const mediaIndex = this.getIndexOf(mediaId)
        return this.#medias[mediaIndex].mediaModel
    }

    get totalLikes(){
        // adding likes number with liked (true = 1 / false = 0)
        const likes = this.#medias.reduce( (accu, media, index) => { return(accu + media.mediaModel.likes + media.mediaModel.liked) }, 0)
        return likes
    }

    // used by the lightbox to avoid cycling out of boundaries
    get length(){
        return this.#medias.length
    }

    // used by the lightbox to get the medialibrary index of a selected media
    getIndexOf(mediaId){
        const media = this.#medias.filter(media => media.mediaModel.id === mediaId)[0]
        return this.#medias.indexOf(media) // TODO throw error if media doesn't exist
    }

    // used by the lightbox to display the previous / next media
    getMediaAtIndex(index){
        return this.#medias[index] // TODO throw error if no media at that index
    }

    // sorting the medialibrary using the passed argument
    sort(argument){
        if(argument!=="likesDesc" && argument!=="dateDesc" && argument!=="titleAsc" ) throw new Error("Unknown sorting argument.") 
        this.#currentSorting = argument
        if (argument === "likesDesc"  && this.length > 1) this.#medias.sort((a, b) => {return b.mediaModel.likes - a.mediaModel.likes}) // TODO SORTING if medias > 1
        if (argument === "dateDesc"  && this.length > 1) this.#medias.sort((a, b) => {return new Date(b.mediaModel.date) - new Date(a.mediaModel.date)})
        if (argument === "titleAsc"  && this.length > 1) this.#medias.sort((a, b) => {return a.mediaModel.title.toLowerCase().localeCompare(b.mediaModel.title.toLowerCase())})
        return this
    }

}