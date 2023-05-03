/* eslint-disable no-unused-vars */
import StringtoNode from "../utils/utils.js"

export const getVideoView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : aria label added + open closeup view to hint its function + tabindex image
    // TODO : alt to add to video?? / !!! don't forget onclick
    const NodeStringified = `
    <article>
        <a href="javascript:lightbox.open(${id})"><video aria-label="${title} video, open closeup view" src=${src}></video></a>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p>
            <input type="image" class="heart-button" data-media-index="${id}" tabindex="0" aria="button" alt="likes button" 
            src="assets/icons/heart.svg" onmouseover="this.src='assets/icons/heartactive.svg'" onmouseout="this.src='assets/icons/heart.svg'"></div>
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
        <div class="leftarrow-container"><a tabindex="2" href="javascript:lightbox.prevMedia()">
        <img class="arrow" role="button" alt="previous media" src="assets/icons/rightarrow.svg"/></a></div>
        <article class="light-container" id="media-${id}">
            <video tabindex="1" id="main-media" src=${src} aria-label="${title}" controls></video>
            <h2>${title}</h2>
        </article>
        <div class="rightarrow-container"><a tabindex="3" href="javascript:lightbox.nextMedia()">
        <img class="arrow" role="button" alt="next media" src="assets/icons/rightarrow.svg"/></a>
        <input type="image" class="close" role="button" tabindex="4" aria-label="close lightbox" 
        alt="close lightbox" src="assets/icons/closegallery.svg" onclick="lightbox.close()"/></div>
    </div>
    `
    return StringtoNode(NodeStringified)
}