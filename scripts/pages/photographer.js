/* eslint-disable no-unused-vars, no-undef */
import MediaLibrary from "../models/mediaLibrary.js"
import { fetchSelectedPhotographerDatas } from "../utils/fetch.js"
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
        // !!!! Deal with unknown photographer id : add a message on the page
        if (isNaN(currentPhotographerId)) {
            // console.error("Missing id param. This professional doesn't exist.")
            document.querySelector(".gallery").innerHTML = "Error : Unknown photographer."
            document.querySelector(".gallery").classList.add('galleryError')
            throw new Error("Unknown id. This professional doesn't exist.")
        }

        // retrieve the photographer infos and push those to the DOM
        const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId) // TODO deal with unknown id
        if(errorMessage !== undefined) {
            // console.error(errorMessage)
            document.querySelector(".gallery").innerHTML = "Error : Unknown photographer."
            document.querySelector(".gallery").classList.add('galleryError')
            throw new Error("Error : Unknown photographer.")
        }
        photographerInfostoDOM(photographerInfos)

        // instanciate a lightbox
        const lightbox = new Lightbox(document.querySelector('#lightbox_modal')).bindto(mediaLibrary)

        // building the medialibrary before sorting it & push the library into a target DOM container
        mediaLibrary.build(medias).sort(defaultFilter)
        const gallerySection = document.querySelector(".gallery")
        mediaLibrary.bindtoDOMTarget(gallerySection).pushtoDOM()

        // create the sticky bar at the bottom right of the screen
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

// instanciate the form modale
window.modale = new formModale('#contact_modal', '#contact-form')

try{
// init : instanciate the stickybar + the lightbox / build the gallery
const initializedComponents = await init()
if(initializedComponents === undefined) {
    document.querySelector('.sticky-bar').style.display = "none"
    throw new Error("Lightbox & Stickybar can't be initialized.")
}

// global so they can be accessible through inline html listeners
window.stickybar = initializedComponents.stickybar
window.lightbox = initializedComponents.lightbox

// when the value of the custom select change, an event is triggered to call for a medialibrary resorting
document.querySelector('custom-select').addEventListener('valueChange', (e) => mediaLibrary.sort(e.detail.customSelectValue).pushtoDOM())
}
catch(e){
    console.error(e)
}