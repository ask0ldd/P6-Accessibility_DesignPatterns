    // 1 > fetching photographers datas 
    async function getPhotographers() {

        try{
            const response =  await fetch("../data/photographers.json")
            const datas = await response.json()
            return {photographers: datas.photographers}
        }
        catch(error){
            console.error(error)
            return {errorMessage : "Fetch error : Can't display our photographers listing."}
        }
    }

    // 2 > converting photographers datas into DOM nodes 
    // 3 > appending to the DOM
    async function datastoDOM(photographers) {

        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    // 1 > fetching photographers datas 
    // 2 > converting into DOM nodes 
    // 3 > appending to the DOM
    async function init() {
        // 1 >
        const { photographers, errorMessage } = await getPhotographers();
        // 2 + 3 >
        errorMessage == undefined ? datastoDOM(photographers) : console.log(errorMessage) // TODO : display the error message on the page instead of this console log
    };
    
    init();
    
