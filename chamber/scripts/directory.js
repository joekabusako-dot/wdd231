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


        const site = document.createElement("p");
        site.textContent = member.url;

        const level = document.createElement("p")
        level.textContent = member.membershipLevel;

        const website = document.createElement("img");
        website.textContent = member.image;

        website.setAttribute("src", member.image);
        website.setAttribute("loading", "lazy");
        website.setAttribute("width", "100");
        website.setAttribute("height", "100");


        const memberInfo = document.createElement("div");
        memberInfo.classList.add("member-info")

        const details = document.createElement("div");
        details.classList.add("member-details");


      
       
        details.appendChild(address);
        details.appendChild(phone);
        details.appendChild(level);
        details.appendChild(site);


        memberInfo.appendChild(website);
        memberInfo.appendChild(details);

        card.appendChild(name);
        card.appendChild(memberInfo)

        
        
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