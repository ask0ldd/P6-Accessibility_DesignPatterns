/* eslint-disable no-unused-vars, no-undef */
import API from "../api/apiAdapter.js"
import PhotographerHeader from "../components/photographerHeader.js"
import Lightbox from "../components/lightBox.js"
import stickybar from "../components/stickyBar.js"
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

async function getPhotographerDatasnMedias(currentPhotographerId){
    try{
        // if photographer id is invalid
        if (isNaN(currentPhotographerId)) {
            gallery.displayError()
            stickybar.hide()
            throw new Error("Error : Unknown photographer.")
        }

        // retrieve the photographer infos & medias
        const { photographerInfos, medias, errorMessage } = await API.getPhotographerWithDatas(currentPhotographerId)
        if(errorMessage !== undefined) {
            gallery.displayError()
            stickybar.hide()
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

// get the datas required to init our components
const datas = await getPhotographerDatasnMedias(currentPhotographerId)

// if those datas exists, build : gallery + header + lightbox + stickybar
if(datas?.photographerInfos != null && datas?.medias != null) {

    const photographerInfos = datas.photographerInfos
    const medias = datas.medias

    mediaLibrary.populate(medias).sort(defaultFilter)

    // photographer's header rendering
    const header = new PhotographerHeader(photographerInfos).render()

    gallery.render(mediaLibrary.getAllMedias())

    // global so they can be accessible through inline html listeners
    window.modale = new formModale('#contact_modal', '#contact-form')
    document.querySelector('#modal-heading').innerHTML="Contactez-moi<br>" + photographerInfos?.name
    window.lightbox = new Lightbox(document.querySelector('#lightbox_modal')).bindto(mediaLibrary)
    stickybar.bindtoMediaLibrary(mediaLibrary).setPhotographerFees(photographerInfos.price).update()
}