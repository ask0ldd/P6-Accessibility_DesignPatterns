// Photographer blueprints
/* eslint-disable no-unused-vars,no-undef */
import { getPhotographerCardView } from "../views/views.js"
import { getPhotographerHeaderView } from "../views/views.js"

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


export default function photographerFactory(data, currentPage) {

    const photographer = new Photographer(data) // TODO needs to deal with errors if one value is missing / into the photographer class constructor?

    // different photographer cards generated if request comes from index || photographer.html
    if(currentPage === "index.html") 
        photographer.getUserCardDOM = () =>  {
            const viewNode = getPhotographerCardView(photographer.getViewProps())
            return viewNode
        }

    if(currentPage === "photographer.html") 
        photographer.getUserCardDOM = () =>  {
            const viewNode = getPhotographerHeaderView(photographer.getViewProps())
            return viewNode
        }
    
    return (photographer)
}