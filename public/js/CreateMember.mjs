// For modules ( .mjs ), we need to export the function

window.createMember = createMember;

export function createMember() {
    let response = "";

    // Collecting data from the form
    const jsonData = {
        name: document.getElementById("name").value.trim(),
        adminNumber: document.getElementById("admin_number").value.trim(),
        gymPrograms: document.getElementById("gym_programs").value.split(",").map(item => item.trim()) // Assumes comma-separated list
    };

    // Basic validation
    if (!jsonData.name || !jsonData.adminNumber) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    // Sending POST request to backend API
    const request = new XMLHttpRequest();
    request.open("POST", "/api/members/create", true); 
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        // Check for successful creation
        if (response.message && response.message.includes("created successfully")) {
            document.getElementById("message").innerHTML = `Added Member: ${jsonData.name}!`;
            document.getElementById("message").setAttribute("class", "text-success");

            // Reset form fields
            document.getElementById("name").value = "";
            document.getElementById("admin_number").value = "";
            document.getElementById("gym_programs").value = "";

            // Redirect to home page or success page
            window.location.href = 'index.html';
        } else {
            document.getElementById("message").innerHTML = response.message || 'Unable to add member!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.onerror = function () {
        document.getElementById("message").innerHTML = 'An error occurred!';
        document.getElementById("message").setAttribute("class", "text-danger");
    };

    // Sending JSON data to the backend
    request.send(JSON.stringify(jsonData));
}