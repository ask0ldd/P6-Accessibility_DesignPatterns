/* eslint-disable no-unused-vars */
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

function submitForm(e){
    e.preventDefault()
    const formdata = new FormData(document.querySelector("#contact-form"))
    console.log('PRENOM : ',formdata.get('prenom'))
    console.log('NOM : ',formdata.get('nom'))
    console.log('EMAIL : ',formdata.get('email'))
    console.log('MESSAGE : ',formdata.get('message'))
}

window.addEventListener('keydown', e => {if(e.code == "Escape") return closeModal()} )
document.querySelector('#contact-form').addEventListener("submit", e =>  submitForm(e))