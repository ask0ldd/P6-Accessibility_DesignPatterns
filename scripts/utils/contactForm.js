function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
    modal.showModal()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.close()
}
