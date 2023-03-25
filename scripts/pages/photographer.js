const currentPage = "photographer.html"
const defaultFilter = "likesDesc"
let lightbox
let stickyBar

// extrat the id param from the url
const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

const currentPhotographerId = getIdParam()

// push the photographer's infos to the DOM
function photographerInfostoDOM(photographerInfos){
    const mainNode = document.querySelector("#main")
    const photographerModel = photographerFactory(photographerInfos)
    const photographerSectionDOM = photographerModel.getUserCardDOM()
    mainNode.prepend(photographerSectionDOM)
    //document.querySelector("#openModalButton").addEventListener('click', () => displayModal())
}

function dropdownChange () {
    const select = document.querySelector("#sort-select")
    mediaLibrary.sort(select.value).pushtoDOM()
}

// add a like to a media and refresh the likes total of the sticky bar
function addLiketoMedia (mediaId) {
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
    if (isNaN(currentPhotographerId)) return console.error("Missing id param. This user doesn't exist.")

    const {photographerInfos, medias, errorMessage } = await fetchSelectedPhotographerDatas(currentPhotographerId) // TODO deal with unknown id

    if(errorMessage !== undefined) return console.error(errorMessage)

    photographerInfostoDOM(photographerInfos)

    lightbox = new Lightbox(document.querySelector('#lightbox_modal')).bindto(mediaLibrary)

    // building the medialibrary before sorting it
    mediaLibrary.build(medias).sort(defaultFilter)
    const gallerySection = document.querySelector(".gallery")
    // specify a container into the DOM then push the medialibrary to the DOM
    mediaLibrary.bindtoDOMTarget(gallerySection).pushtoDOM()

    // create the sticky bar at the bottom right of the screen
    stickyBar = new StickyBar(".sticky-bar")
    stickyBar.bindtoMediaLibrary(mediaLibrary).bindtoPhotographerModel(photographerInfos).update()
}

const mediaLibrary = new MediaLibrary()
init()