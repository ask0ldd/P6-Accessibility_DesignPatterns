/* eslint-disable no-unused-vars,no-undef*/
import mediaFactory from "../factories/media.js"
import gallery from "../components/gallery.js"
import stickybar from "../components/stickyBar.js"

class MediaLibrary {
    #medias = []
    // #likes
    #currentSorting

    constructor(){
        const defaultSorting = "likesDesc"
        this.#currentSorting = defaultSorting
    }

    // build the medialibrary out of all the media objects produced by the mediafactory
    populate(medias){
        medias.forEach(media => {
            const mediaModel = mediaFactory(media)
            this.add(mediaModel)
        })
        return this // for methods chaining
    }

    // add a media factory generated media object to the medialibrary
    add(mediaModel){
        if(mediaModel) this.#medias.push(mediaModel)
    }

    getAllMedias(){
        return this.#medias
    }
    
    // return mediaModel so getter and setter methods can't be accessed through chaining
    selectMedia(mediaId){
        const mediaIndex = this.getIndexOf(parseInt(mediaId))
        return this.#medias[mediaIndex]
    }

    get totalLikes(){
        // adding all medias likes + liked (true = 1 / false = 0)
        const likes = this.#medias.reduce( (accu, media) => { return(accu + media.likes + media.liked) }, 0)
        return likes
    }

    // used by the lightbox to evaluate boundaries
    get length(){
        return this.#medias.length
    }

    // used by the lightbox to get the medialibrary index of a selected media
    getIndexOf(mediaId){
        const media = this.#medias.filter(media => media.id === mediaId)[0]
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
        if (argument === "likesDesc"  && this.length > 1) this.#medias.sort((a, b) => {return b.likes - a.likes}) // TODO SORTING if medias > 1
        if (argument === "dateDesc"  && this.length > 1) this.#medias.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
        if (argument === "titleAsc"  && this.length > 1) this.#medias.sort((a, b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase())})
        return this
    }

    // adds a like to a media and refresh the likes total within the sticky bar
    invertMediaLikeState(mediaId) {
        this.selectMedia(mediaId).liked = !this.selectMedia(mediaId).liked
        // update the card likes node to avoid a full refresh of the gallery
        gallery.updateMediaCardLikes(mediaId)
        stickybar.update()
    }

}

const mediaLibrary = new MediaLibrary()

export default mediaLibrary