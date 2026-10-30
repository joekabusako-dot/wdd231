const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("show");

    const isOpen = navigation.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);
});