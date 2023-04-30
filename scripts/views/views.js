/* eslint-disable no-unused-vars */
function StringtoNode(viewStringified){
    const viewAsANode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild
    return viewAsANode
}

// view related to the gallery
export const getVideoView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : aria label added + open closeup view to hint its function + tabindex image
    // TODO : alt to add to video?? / !!! don't forget onclick
    const NodeStringified = `
    <article>
        <a href="javascript:lightbox.open(${id})"><video aria-label="${title} video, open closeup view" src=${src}></video></a>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><input type="image" tabindex="0" 
            aria="button" alt="likes button" src="assets/icons/heart.svg" 
            onmouseover="this.src='assets/icons/heartactive.svg'" onmouseout="this.src='assets/icons/heart.svg'" onclick="likeUnlikeMedia(${id})"></div>
        </div>
    </article>
    `
    return StringtoNode(NodeStringified)
}

// view related to the modale
export const getShortVideoView = ({id, src, title}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    const NodeStringified = `
    <div class="arrownmedia-container">
        <div class="leftarrow-container"><a tabindex="2" href="javascript:lightbox.prevMedia()"><img class="arrow" role="button" alt="previous media" src="assets/icons/rightarrow.svg"/></a></div>
        <article class="light-container" id="media-${id}">
            <video tabindex="1" id="main-media" src=${src} aria-label="${title}" controls></video>
            <h2>${title}</h2>
        </article>
        <div class="rightarrow-container"><a tabindex="3" href="javascript:lightbox.nextMedia()"><img class="arrow" role="button" alt="next media" 
        src="assets/icons/rightarrow.svg"/></a>
        <input type="image" class="close" role="button" tabindex="4" aria-label="close lightbox" alt="close lightbox" src="assets/icons/closegallery.svg" onclick="lightbox.close()"/></div>
    </div>
    `
    return StringtoNode(NodeStringified)
}

// view related to the gallery
export const getImageView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    const NodeStringified = `
    <article id="media-${id}">
        <a href="javascript:lightbox.open(${id})"><img src=${src} alt="${title} picture, open closeup view"/></a>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><input type="image" tabindex="0" aria="button" alt="likes" src="assets/icons/heart.svg" 
            onmouseover="this.src='assets/icons/heartactive.svg'" onmouseout="this.src='assets/icons/heart.svg'" onclick="likeUnlikeMedia(${id})"></div>
        </div>
    </article>
    `
    return StringtoNode(NodeStringified)
}

// view related to the modale
export const getShortImageView = ({id, src, title}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    // aria role buttons next prev + alt + tabindex
    // <img class="close" tabindex="1" role="button" aria-label="close lightbox" alt="close lightbox button" src="../assets/icons/closegallery.svg" onclick="lightbox.close()"/>
    const NodeStringified = `
    <div class="arrownmedia-container">
        <div class="leftarrow-container">
            <a tabindex="2" href="javascript:lightbox.prevMedia()">
                <img class="arrow" role="button" alt="previous media" src="assets/icons/rightarrow.svg"/>
            </a>
        </div>
        <article class="light-container" id="media-${id}">
            <img id="main-media" tabindex="1" src=${src} alt="${title}"/>
            <h2>${title}</h2>
        </article>
        <div class="rightarrow-container">
            <a tabindex="3" href="javascript:lightbox.nextMedia()">
                <img class="arrow" role="button" alt="next media" src="assets/icons/rightarrow.svg"/>
            </a>
            <input type="image" class="close" role="button" tabindex="4" aria-label="close lightbox" alt="close lightbox" 
            src="assets/icons/closegallery.svg" onclick="lightbox.close()"/>
        </div>
    </div>
    `
    return StringtoNode(NodeStringified)
}

// view related to the index page
export const getPhotographerCardView = ({userId, portraitSrc, name, location, quote, fees}) => {
    // ACCESSIBILITY : alt added to img
    const NodeStringified = `
    <article>
        <a href="photographer.html?id=${userId}">
            <img src="${portraitSrc}" alt="photo"/>
            <h2>${name}</h2>
        </a>
        <p class="location">${location}</p>
        <p class="quote">${quote}</p>
        <p class="fees">${fees}€/jour</p>
    </article>
    `
    return StringtoNode(NodeStringified)
}

// view related to the photographer page
export const getPhotographerHeaderView = ({portraitSrc, name, location, quote}) => {
    // ACCESSIBILITY : alt added to img + type="button" for the button
    const NodeStringified = `
    <section class="photograph-header">
        <div class="namenlocation-container">
            <h1>${name}</h1>
            <p class="header-location">${location}</p>
            <p class="header-quote">${quote}</p>
        </div>
        <button type="button" id="openModalButton" onclick="javascript:modale.open()" class="contact_button">Contactez-moi</button>
        <img src="${portraitSrc}" alt="${name}'s portrait" />
    </section>
    `
    return StringtoNode(NodeStringified)
}