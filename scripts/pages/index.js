    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        /*let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]*/
        // et bien retourner le tableau photographers seulement une fois récupéré
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

    async function displayData(photographers) {
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
        errorMessage == undefined ? displayData(photographers) : console.log(errorMessage) // TODO : display the error message on the page instead of this console log
    };
    
    init();
    
