const getPhotographerCardView = ({userId, portraitSrc, name, location, quote, fees}) => {

    // ACCESSIBILITY : alt added to img
    const NodeStringified = `
    <article>
        <a href="${userId}">
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

function photographerFactory(data) {
    const { name , id : userId, city, country, tagline : quote, price : fees, portrait } = data

    const portraitSrc = `./assets/photographers/${portrait}`
    const location = city + ', ' + country

    function getUserCardDOM() {

        const viewStringified = getPhotographerCardView({userId, portraitSrc, name, location, quote, fees})
        const parsedNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
        return parsedNode

    }
    
    return { getUserCardDOM }
}