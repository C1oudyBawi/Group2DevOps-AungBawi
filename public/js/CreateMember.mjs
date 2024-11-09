// For modules ( .mjs ), we need to export the function

import { ElementCollection } from "./ElementCollection.mjs";

window.createMember = createMember;

export function createMember() {
    let response = "";

    let nameElement = ElementCollection.getMemberCreateModalNameField();
    let adminNumberElement = ElementCollection.getMemberCreateModalAdminNumberField();
    let gymProgramsElement = ElementCollection.getMemberCreateModalGymProgramsField();
    let modalMessageElement = ElementCollection.getMemberCreateModalMessage();

    // Assumes comma-separated list
    let gymPrograms = gymProgramsElement.value.split(",").map(item => item.trim());

    if (gymPrograms.length === 1 && gymPrograms[0] === "")
    {
        gymPrograms = [];
    }

    // Collecting data from the form
    const jsonData = {
        name: nameElement.value.trim(),
        adminNumber: adminNumberElement.value.trim(),
        gymPrograms: gymPrograms
    };

    // Basic validation
    if (!jsonData.name || !jsonData.adminNumber) {
        modalMessageElement.innerHTML = 'All fields are required!';
        modalMessageElement.setAttribute("class", "text-danger");
        return;
    }

    // Sending POST request to backend API
    const request = new XMLHttpRequest();
    request.open("POST", "/api/members/create", true); 
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function ()
    {
        let success = request.status === 200;

        response = JSON.parse(request.responseText);

        // Check for successful creation
        // TODO: Change backend to return 201 status code
        if (success){
            modalMessageElement.innerHTML = `Added Member: ${jsonData.name}!`;
            modalMessageElement.setAttribute("class", "text-success");

            // Reset form fields
            nameElement.value = adminNumberElement.value = gymProgramsElement.value = '';

            // Refresh page to show new member
            // TODO: Implement function for re-fetching members
            window.location.reload();
        } else {
            modalMessageElement.innerHTML = response.message || 'Unable to add member!';
            modalMessageElement.setAttribute("class", "text-danger");
        }
    };

    request.onerror = function () {
        modalMessageElement.innerHTML = 'An error occurred!';
        modalMessageElement.setAttribute("class", "text-danger");
    };

    // Sending JSON data to the backend
    request.send(JSON.stringify(jsonData));
}