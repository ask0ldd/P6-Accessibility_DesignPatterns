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

    // different photographer nodes group generated if request comes from index || photographer.html
    if(currentPage === "index.html") 
        function getUserCardDOM() {
            const viewStringified = getPhotographerCardView(photographer.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode
        }

    if(currentPage === "photographer.html") 
        function getUserCardDOM() {
            const viewStringified = getPhotographerHeaderView(photographer.getViewProps())
            const parsedViewNode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild // node converted to a document so must retrieve the body's child
            return parsedViewNode       
        }
    
    return { photographer, getUserCardDOM }
}


    /*const { name , id : userId, city, country, tagline : quote, price : fees, portrait } = data // TODO needs to deal with errors if one value is missing / into the photographer class constructor?

    const portraitSrc = `./assets/photographers/${portrait}`
    const location = city + ', ' + country*/