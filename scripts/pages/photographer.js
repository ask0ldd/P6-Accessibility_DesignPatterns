/* eslint-disable no-unused-vars, no-undef */
// import MediaLibrary from "../models/mediaLibrary.js"
import API from "../api/apiAdapter.js"
import photographerFactory from "../factories/photographer.js"
import Lightbox from "../components/lightBox.js"
import StickyBar from "../components/stickyBar.js"
import formModale from "../components/contactForm.js"
import gallery from "../components/gallery.js"
import mediaLibrary from "../models/mediaLibrary.js"

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
}

// add a like to a media and refresh the likes total within the sticky bar
window.likeUnlikeMedia = (mediaId) => {
    mediaLibrary.selectMedia(mediaId).liked = !mediaLibrary.selectMedia(mediaId).liked
    updateSelectedCardLikes(mediaId)
    window.stickybar.update()
} // move to medialibrary

function updateSelectedCardLikes(mediaId){
    const target = document.querySelector('#likecontainer-'+mediaId)
    target.innerHTML = mediaLibrary.selectMedia(mediaId).liked + mediaLibrary.selectMedia(mediaId).likes
} // move to medialibrary

async function getPhotographerDatasnMedias(currentPhotographerId){
    try{
        // if photographer id is invalid
        if (isNaN(currentPhotographerId)) {
            gallery.displayError()
            window.stickybar.hide()
            throw new Error("Error : Unknown photographer.")
        }

        // retrieve the photographer infos and push them to the DOM
        const { photographerInfos, medias, errorMessage } = await API.getPhotographerWithDatas(currentPhotographerId)
        if(errorMessage !== undefined) {
            gallery.displayError()
            window.stickybar.hide()
            throw new Error("Error : Unknown photographer.")
        }

        return { photographerInfos, medias, errorMessage }
    }
    catch(e){
        console.error(e)
    }
}



///////
// INIT
///////

// get the datas required to build the views
const datas = await getPhotographerDatasnMedias(currentPhotographerId)

// if those datas exists, build : gallery + header + lightbox + stickybar
if(datas?.photographerInfos != null && datas?.medias != null) {

    const photographerInfos = datas.photographerInfos
    const medias = datas.medias

    mediaLibrary.build(medias).sort(defaultFilter)

    photographerInfostoDOM(photographerInfos)
    gallery.render(mediaLibrary.getAllMedias())

    // global so they can be accessible through inline html listeners
    window.modale = new formModale('#contact_modal', '#contact-form')
    document.querySelector('#modal-heading').innerHTML="Contactez-moi<br>" + photographerInfos?.name
    window.lightbox = new Lightbox(document.querySelector('#lightbox_modal')).bindto(mediaLibrary)
    window.stickybar.bindtoMediaLibrary(mediaLibrary).bindtoPhotographerModel(photographerInfos).update()
}