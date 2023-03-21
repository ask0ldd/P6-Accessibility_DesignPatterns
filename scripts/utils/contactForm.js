function displayModal() {
    const modal = document.getElementById("contact_modal");
    console.log("click click")
    modal.style.display = "block";
    modal.showModal()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.close()
}
