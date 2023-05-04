/* eslint-disable no-unused-vars */
import StringtoNode from "../utils/utils.js"

// view related to the gallery => media card
export const getImageView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    const NodeStringified = `
    <article id="media-${id}">
        <a href="javascript:lightbox.open(${id})">
            <img src=${src} alt="${title} picture, open closeup view" 
            onerror="this.src='assets/images/placeholder12.jpg'; this.onerror='';"/>
        </a>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div>
                <p id="likecontainer-${id}">${likes}</p>
                <input type="image" class="heart-button" data-media-index="${id}" 
                tabindex="0" aria="button" alt="likes" src="assets/icons/heart.svg" 
                onmouseover="this.src='assets/icons/heartactive.svg'" 
                onmouseout="this.src='assets/icons/heart.svg'">
            </div>
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