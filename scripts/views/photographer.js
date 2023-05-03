/* eslint-disable no-unused-vars */
import StringtoNode from "../utils/utils.js"

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