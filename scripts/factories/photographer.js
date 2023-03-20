const getPhotographerCardView = ({userId, portraitSrc, name, location, quote, fees}) => {

    const DOMStringified = `
    <article>
        <a href="${userId}">
            <img src="${portraitSrc}"/>
            <h2>${name}</h2>
        </a>
        <p>${location}</p>
        <p>${quote}</p>
        <p>${fees}€/jour</p>
    </article>
    `
    return DOMStringified
}

function photographerFactory(data) {
    const { name , id : userId, city, country, tagline : quote, price : fees, portrait } = data

    const portraitSrc = `./assets/photographers/${portrait}`
    const location = city + ', ' + country

    function getUserCardDOM() {

        const viewStringified = getPhotographerCardView({userId, portraitSrc, name, location, quote, fees})
        const DOMElement = new DOMParser().parseFromString(viewStringified, "text/html").firstChild // firstchild cause parent node : #document can't be appended
        
        return DOMElement

    }
    
    return { getUserCardDOM }
}