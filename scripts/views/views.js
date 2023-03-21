const getVideoView = ({src, title, likes}) => {
    // TODO : alt to add to video??
    const NodeStringified = `
    <article>
        <video src=${src} controls="true"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <p>${likes}</p>
        </div>
    </article>
    `
    return NodeStringified
}

const getImageView = ({src, title, likes}) => {
    // ACCESSIBILITY : alt added
    // aria button for like icon
    const NodeStringified = `
    <article>
        <img src=${src} alt="${title}"></video>
        <div class="mediaInfos">
            <h2>${title}</h2>
            <p>${likes}</p>
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
        <button id="openModalButton" class="contact_button">Contactez-moi</button>
        <img src="${portraitSrc}" alt="${name}'s portrait" />
    </section>
    `
    // onclick="displayModal()"
    return NodeStringified
}