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

// Photographer blueprints
class Photographer {

    #name
	#id
	#city
	#country
	#quote
	#fees
	#portrait

    constructor (userDatas)
    {
        this.#name = userDatas.name
		this.#id = userDatas.id
		this.#city = userDatas.city
		this.#country = userDatas.country
		this.#quote = userDatas.tagline
		this.#fees = userDatas.price
		this.#portrait = './assets/photographers/' + userDatas.portrait
    }

    getViewProps(){
        return { userId:this.#id, portraitSrc : this.#portrait, name: this.#name, location: this.#city+', '+this.#country, quote : this.#quote, fees : this.#fees }
    }
}


function photographerFactory(data) {

    const photographer = new Photographer(data) // TODO needs to deal with errors if one value is missing / into the photographer class constructor?

    function getUserCardDOM() {

        const viewStringified = getPhotographerCardView(photographer.getViewProps())
        const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
        return parsedViewNode

    }
    
    return { getUserCardDOM }
}


    /*const { name , id : userId, city, country, tagline : quote, price : fees, portrait } = data // TODO needs to deal with errors if one value is missing / into the photographer class constructor?

    const portraitSrc = `./assets/photographers/${portrait}`
    const location = city + ', ' + country*/