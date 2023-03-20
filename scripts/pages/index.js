    async function getPhotographers() {

        try{
            const response =  await fetch("../data/photographers.json")
            const datas = await response.json()
            console.log(datas)
            // et bien retourner le tableau photographers seulement une fois récupéré
            return {photographers: datas.photographers}
        }
        catch(error){
            console.error(error)
            return {errorMessage : "Fetch error : Can't display our photographers listing."}
        }
    }

    async function displayCard(photographers) {

        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers, errorMessage } = await getPhotographers();
        errorMessage == undefined ? displayCard(photographers) : console.log(errorMessage) // TODO : display the error message on the page instead of this console log
    };
    
    init();
    
