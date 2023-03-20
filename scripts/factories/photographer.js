const photographerCardView = (userId, portraitSrc, name, location, quote, fees) => {

    const DOMStringified = `
    <article>
        <a href="${userId}">
            <img src="${portraitSrc}">
            <h2>${name}</h2>
        </a>
        <p>${location}</p>
        <p>${quote}</p>
        <p>${fees}</p>
    </article>
    `
}

function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }

    return { name, picture, getUserCardDOM }
}