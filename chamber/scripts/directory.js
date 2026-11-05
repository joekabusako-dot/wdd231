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

        const url = document.createElement("p");
        url.textContent = member.url;

        const imagefileNam = document.createElement("p");
        imagefileNam.textContent = member.imagefileName;

        const level = document.createElement("p")
        level.textContent = member.membershipLevel;

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(url);
        card.appendChild(imagefileNam);
        card.appendChild(level);
        memberContainer.appendChild(card);

    })
}