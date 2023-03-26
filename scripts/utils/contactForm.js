function displayModal() {
    const modal = document.querySelector("#contact_modal")
    modal.showModal()
    modal.style.display = "flex" 
}

function closeModal() {
    const modal = document.querySelector("#contact_modal")
    modal.close()
    modal.style.display = "none"
}

window.addEventListener('keydown', e => {if(e.keyCode == 27) return closeModal()} )