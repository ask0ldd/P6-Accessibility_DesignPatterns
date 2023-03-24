const getVideoView = ({id, src, title, likes}) => {
    // TODO : alt to add to video??
    const NodeStringified = `
    <article>
        <video src=${src} controls="true"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><img src="../assets/icons/heart.svg" onclick="addLiketoMedia(${id})"></div>
        </div>
    </article>
    `
    return NodeStringified
}

const getImageView = ({id, src, title, likes}) => {
    // ACCESSIBILITY : alt added
    // aria button for like icon
    const NodeStringified = `
    <article id="media-${id}">
        <img src=${src} alt="${title}" onclick="lightbox.open(${id})"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <div><p id="likecontainer-${id}">${likes}</p><img src="../assets/icons/heart.svg" onclick="addLiketoMedia(${id})"></div>
        </div>
    </article>
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
    // ACCESSIBILITY : alt added to img
    const NodeStringified = `
    <section class="photograph-header">
        <div>
            <h1>${name}</h1>
            <p class="header-location">${location}</p>
            <p class="header-quote">${quote}</p>
        </div>
        <button id="openModalButton" onclick="displayModal()" class="contact_button">Contactez-moi</button>
        <img src="${portraitSrc}" alt="${name}'s portrait" />
    </section>
    `
    // onclick="displayModal()"
    return NodeStringified
}

/*const getStickBarView = ({totalLikes, dailyFees}) => {
    // TODO : alt to add to video??
    const NodeStringified = `
    <article class="sticky-bar">
        <div>${totalLikes}<img src="../assets/icons/blackheart.svg"/></div>
        <span>${dailyFees}</span>
    </article>
    `
    return NodeStringified
}*/