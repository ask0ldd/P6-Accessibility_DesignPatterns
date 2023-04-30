/* eslint-disable no-unused-vars, no-undef */
import MediaLibrary from "../models/mediaLibrary.js"
import API from "../api/apiAdapter.js"
import photographerFactory from "../factories/photographer.js"
import Lightbox from "../components/lightBox.js"
import StickyBar from "../components/stickyBar.js"
import formModale from "../components/contactForm.js"

const currentPage = "photographer.html"
const defaultFilter = "likesDesc"

// extract the id param from the url
const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

const currentPhotographerId = getIdParam()

// push the photographer's infos to the DOM
function photographerInfostoDOM(photographerInfos){
    const mainNode = document.querySelector("#main")
    const photographerModel = photographerFactory(photographerInfos, currentPage)
    const photographerSectionDOM = photographerModel.getUserCardDOM()
    mainNode.prepend(photographerSectionDOM)
    //document.querySelector("#openModalButton").addEventListener('click', () => displayModal())
}

// add a like to a media and refresh the likes total within the sticky bar
window.likeUnlikeMedia = (mediaId) => {
    mediaLibrary.selectMedia(mediaId).liked = !mediaLibrary.selectMedia(mediaId).liked
    updateSelectedCardLikes(mediaId)
    window.stickybar.update()
}

function updateSelectedCardLikes(mediaId){
    const target = document.querySelector('#likecontainer-'+mediaId)
    target.innerHTML = mediaLibrary.selectMedia(mediaId).liked + mediaLibrary.selectMedia(mediaId).likes
}

async function init() {
    try{
        // if photographer id is invalid
        if (isNaN(currentPhotographerId)) {
            document.querySelector(".gallery").innerHTML = "Error : Unknown photographer."
            document.querySelector(".gallery").classList.add('galleryError')
            throw new Error("Unknown id. This professional doesn't exist.")
        }

        // retrieve the photographer infos and push them to the DOM
        const {photographerInfos, medias, errorMessage } = await API.getPhotographerWithDatas(currentPhotographerId)
        if(errorMessage !== undefined) {
            document.querySelector(".gallery").innerHTML = "Error : Unknown photographer."
            document.querySelector(".gallery").classList.add('galleryError')
            throw new Error("Error : Unknown photographer.")
        }
        photographerInfostoDOM(photographerInfos)

        // lightbox instanciation
        const lightbox = new Lightbox(document.querySelector('#lightbox_modal')).bindto(mediaLibrary)

        // building + sorting the medialibrary then push it to a target DOM container
        mediaLibrary.build(medias).sort(defaultFilter)
        const gallerySection = document.querySelector(".gallery")
        mediaLibrary.bindtoDOMTarget(gallerySection).pushtoDOM()

        // create the sticky bar with the likes sum
        const stickybar = new StickyBar(".sticky-bar")
        stickybar.bindtoMediaLibrary(mediaLibrary).bindtoPhotographerModel(photographerInfos).update()

        document.querySelector('#modal-heading').innerHTML="Contactez-moi<br>" + photographerInfos?.name

        return {lightbox, stickybar}
    }
    catch(e){
        console.error(e)
    }
}



// prerequisite to build the gallery
export const mediaLibrary = new MediaLibrary()

try{
// init : instanciate the stickybar + the lightbox / build the gallery
const initializedComponents = await init()
if(initializedComponents === undefined) {
    document.querySelector('.sticky-bar').style.display = "none"
    throw new Error("Lightbox & Stickybar can't be initialized.")
}

// global so they can be accessible through inline html listeners
window.modale = new formModale('#contact_modal', '#contact-form')
window.stickybar = initializedComponents.stickybar
window.lightbox = initializedComponents.lightbox

}
catch(e){
    console.error(e)
}