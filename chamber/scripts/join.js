// CURRENT DATE AND TIME
const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


// OPEN MEMBERSHIP MODALS
const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.getElementById(modalId);

        modal.showModal();
    });
});


// CLOSE MEMBERSHIP MODALS
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});