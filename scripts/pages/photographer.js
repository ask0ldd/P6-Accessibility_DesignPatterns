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

export function dropdownChange (filterValue) {
    // const select = document.querySelector("#sort-select")
    // const select = document.querySelector("custom-select")
    // console.log(select.value)
    // mediaLibrary.sort(select.value).pushtoDOM()
    // console.log(filterValue)
    mediaLibrary.sort(filterValue).pushtoDOM()
}

// add a like to a media and refresh the likes total within the sticky bar
window.addLiketoMedia = (mediaId) => {
    if(mediaLibrary.selectMedia(mediaId).liked !== true){
        mediaLibrary.selectMedia(mediaId).liked = true
        updateSelectedCardLikes(mediaId)
        stickyBar.update()
    }
}

function updateSelectedCardLikes(mediaId){
    const target = document.querySelector('#likecontainer-'+mediaId)
    target.innerHTML = mediaLibrary.selectMedia(mediaId).liked + mediaLibrary.selectMedia(mediaId).likes
}

async function init() {
    // !!!! Deal with unknown photographer id : add a message on the page
    if (isNaN(currentPhotographerId)) return console.error("Missing id param. This professional doesn't exist.")

    // retrieve the photographer infos and push those to the DOM
    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId) // TODO deal with unknown id
    if(errorMessage !== undefined) return console.error(errorMessage)
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

    document.querySelector('#modal-heading').innerHTML="Contactez-moi<br>" + photographerInfos.name

    return {lightbox, stickybar}
}

// prerequisite to build the gallery
export const mediaLibrary = new MediaLibrary()

// instanciate the modale
window.modale = new formModale('#contact_modal', '#contact-form')
window.addEventListener('keydown', e => {if(e.code == "Escape") return modale.close()})
window.modale.formNode.addEventListener("submit", e => modale.submitForm(e))

// init : instanciate the stickybar + the lightbox / build the gallery
const initializedComponents = await init()
const stickyBar = initializedComponents.stickybar
// lightbox as a global variable so it can be accessible through inline html listeners
window.lightbox = initializedComponents.lightbox