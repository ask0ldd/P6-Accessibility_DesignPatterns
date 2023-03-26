const getVideoView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : aria label added + open closeup view to hint its function + tabindex image
    // TODO : alt to add to video?? / !!! don't forget onclick
    const NodeStringified = `
    <article>
        <video aria-label="${title}, open closeup view" tabindex="0" src=${src} onclick="lightbox.open(${id})"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><input type="image" tabindex="0" aria="button" alt="likes button" src="../assets/icons/heart.svg" onclick="addLiketoMedia(${id})"></div>
        </div>
    </article>
    `
    return NodeStringified
}

const getShortVideoView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    const NodeStringified = `
    <div class="arrownmedia-container">
        <div class="leftarrow-container"><a tabindex="2" href="javascript:lightbox.prevMedia()"><img class="arrow" role="button" alt="previous media" src="../assets/icons/rightarrow.svg"/></a></div>
        <article class="light-container" id="media-${id}">
            <video src=${src} aria-label="${title}" controls></video>
            <h2>${title}</h2>
        </article>
        <div class="rightarrow-container"><a tabindex="3" href="javascript:lightbox.nextMedia()"><img class="arrow" role="button" alt="next media" src="../assets/icons/rightarrow.svg"/></a><img class="close" tabindex="1" role="button" aria-label="close lightbox" alt="close lightbox button" src="../assets/icons/closegallery.svg" onclick="lightbox.close()"/></div>
    </div>
    `
    return NodeStringified
}

const getImageView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    const NodeStringified = `
    <article id="media-${id}">
        <img tabindex="0" src=${src} alt="${title}, open closeup view" onclick="lightbox.open(${id})"/>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><input type="image" tabindex="0" aria="button" alt="likes button" src="../assets/icons/heart.svg" onclick="addLiketoMedia(${id})"></div>
        </div>
    </article>
    `
    return NodeStringified
}

const getShortImageView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added + open closeup view to hint its function + tabindex image
    // aria button for like icon + alt likes
    // aria role buttons next prev + alt + tabindex
    // <img class="close" tabindex="1" role="button" aria-label="close lightbox" alt="close lightbox button" src="../assets/icons/closegallery.svg" onclick="lightbox.close()"/>
    const NodeStringified = `
    <div class="arrownmedia-container">
        <div class="leftarrow-container"><a tabindex="2" href="javascript:lightbox.prevMedia()"><img class="arrow" role="button" alt="previous media" src="../assets/icons/rightarrow.svg"/></a></div>
        <article class="light-container" id="media-${id}">
            <img src=${src} alt="${title}"/>
            <h2>${title}</h2>
        </article>
        <div class="rightarrow-container"><a tabindex="3" href="javascript:lightbox.nextMedia()"><img class="arrow" role="button" alt="next media" src="../assets/icons/rightarrow.svg"/></a><input type="image" class="close" role="button" tabindex="1" aria-label="close lightbox" alt="close lightbox" src="../assets/icons/closegallery.svg" onclick="lightbox.close()"/></div>
    </div>
    `
    return NodeStringified
}

const getPhotographerCardView = ({userId, portraitSrc, name, location, quote, fees}) => {
    // ACCESSIBILITY : alt added to img
    const NodeStringified = `
    <article>
        <a href="photographer.html?id=${userId}">
            <img src="${portraitSrc}" alt="${name}'s portrait"/>
            <h2>${name}</h2>
        </a>
        <p class="location">${location}</p>
        <p class="quote">${quote}</p>
        <p class="fees">${fees}€/jour</p>
    </article>
    `
    return NodeStringified
}

const getPhotographerHeaderView = ({userId, portraitSrc, name, location, quote, fees}) => {
    // ACCESSIBILITY : alt added to img + type="button" for the button
    const NodeStringified = `
    <section class="photograph-header">
        <div>
            <h1>${name}</h1>
            <p class="header-location">${location}</p>
            <p class="header-quote">${quote}</p>
        </div>
        <button type="button" id="openModalButton" onclick="displayModal()" class="contact_button">Contactez-moi</button>
        <img src="${portraitSrc}" alt="${name}'s portrait" />
    </section>
    `
    // onclick="displayModal()"
    return NodeStringified
}