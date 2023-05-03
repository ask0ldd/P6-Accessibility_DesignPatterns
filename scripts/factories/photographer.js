// Photographer blueprints
/* eslint-disable no-unused-vars,no-undef */
import { getPhotographerCardView, getPhotographerHeaderView } from "../views/photographer.js"

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
        // == null or undefined / === null only
        this.#name = userDatas.name != null ? userDatas.name : 'n/a'
		this.#id = userDatas.id != null ? userDatas.id : 'n/a'
		this.#city = userDatas.city != null ? userDatas.city : 'n/a'
		this.#country = userDatas.country != null ? userDatas.country : 'n/a'
		this.#quote = userDatas.tagline != null ? userDatas.tagline : 'n/a'
		this.#fees = userDatas.price != null ? userDatas.price : 'n/a'
		this.#portrait = userDatas.portrait != null ? 'assets/photographers/' + userDatas.portrait : '' // !!!! add default portrait image
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