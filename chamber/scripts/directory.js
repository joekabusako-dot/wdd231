const url = "data/members.json";

async function getMembers() {

    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data);
}

getMembers();

function displayMembers(members) {
    const memberContainer = document.querySelector("#member-container");

    members.forEach((member) => {
        const card = document.createElement("section");

        const name = document.createElement("h2");
        name.textContent = member.companyName;

        const address = document.createElement("p");
        address.textContent = member.address

        const phone = document.createElement("p");
        phone.textContent = member.phoneNumber;

        const website = document.createElement("p");
        website.textContent = member.url;

        const imagefileNam = document.createElement("p");
        imagefileNam.textContent = member.imagefileName;

        const level = document.createElement("p")
        level.textContent = member.membershipLevel;

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(imagefileNam);
        card.appendChild(level);
        memberContainer.appendChild(card);

    });
}

const container = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listButton.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});