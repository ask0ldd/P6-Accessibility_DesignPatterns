const getIdParam = () => {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

async function init() {
    const currentPhotographerId = getIdParam()

};

init();