/* eslint-disable no-unused-vars, no-undef */
import photographerFactory from "../factories/photographer.js"
import API from "../api/apiAdapter.js"

const currentPage = "index.html"

// converting photographers datas into nodes and appending those to the DOM
function datastoDOM(photographers) {

    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, currentPage)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

// 1 : fetching photographers datas 
// 2 : converting into DOM nodes + appending to the DOM
async function init() {

    const { photographers, errorMessage } = await API.getAllPhotographers()

    if(errorMessage === undefined) {
        datastoDOM(photographers)
    }
    else{
        console.log(errorMessage)
    }
}

init()