const currentPage = "index.html"

// 2 > converting photographers datas into DOM nodes 
// 3 > appending to the DOM
function datastoDOM(photographers) {

    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    });
};

// 1 > fetching photographers datas 
// 2 > converting into DOM nodes 
// 3 > appending to the DOM
async function init() {
    // 1 >
    const { photographers, errorMessage } = await fetchPhotographers();
    // 2 + 3 >
    errorMessage == undefined ? datastoDOM(photographers) : console.log(errorMessage) // TODO : display the error message on the page instead of this console log
};

init();