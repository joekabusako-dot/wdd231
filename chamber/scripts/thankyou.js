// Get form data from url
const params = new URLSearchParams(window.location.search);

// Required form fields
const fields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email Address", "email"],
    ["Mobile Phone", "phone"],
    ["Business Name", "organization"],
    ["Submission Date", "timestamp"]
];

// display form information
const results = document.querySelector("#form-results");

fields.forEach(([label, name]) => {
    const value = params.get(name);

    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    paragraph.appendChild(strong);

    paragraph.appendChild(
        document.createTextNode(value || "Not provided")
    );

    results.appendChild(paragraph);
});