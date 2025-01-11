import { openUpdateModal } from "./UpdateGymProgram.mjs";
// import { v4 as uuidv4 } from "uuid";
// formData.id = uuidv4();
function openModal(modal) {
	modal.style.display = "block";
}

export function closeModal(modal) {
	modal.style.display = "none";
}

export async function displayPrograms() {
	try {
		const response = await fetch("/api/gym-programs");
		if (!response.ok) {
			alert("Failed to fetch programs.");
			return;
		}

		const programs = await response.json();
		const programArray = programs.programs;
		const programListDiv = document.getElementById("programList");
		programListDiv.innerHTML = "";

		const rowDiv = document.createElement("div");
		rowDiv.className = "row";

		programArray.map((program) => {
			const colDiv = document.createElement("div");
			colDiv.className = "col-md-4 mb-4";

			const cardDiv = document.createElement("div");
			cardDiv.className = "card h-100";

			const cardBodyDiv = document.createElement("div");
			cardBodyDiv.className = "card-body";

			let programName = program.name.toUpperCase();
			cardBodyDiv.innerHTML = `
                <h5 class="card-title">${programName}</h5>
                <p class="card-text">Focus: ${program.focusBodyPart}</p>
                <p class="card-text">Difficulty: ${program.difficulty}</p>
                <p class="card-text">Intensity: ${program.intensity}</p>
                <p class="card-text">Target Audience: ${program.targetAudience
				}</p>
                <p class="card-text">Repetitions: ${program.reps}</p>
                <p class="card-text">Status: ${program.isActive ? "Active" : "Inactive"
				}</p>
				<button class="btn btn-secondary btn-sm update-button" data-id="${program.id
				}">Update</button>
            `;

			cardDiv.appendChild(cardBodyDiv);
			colDiv.appendChild(cardDiv);
			rowDiv.appendChild(colDiv);
		});
		programListDiv.appendChild(rowDiv);

		// document.querySelectorAll(".update-button").forEach((button) => {
		// 	button.addEventListener("click", (event) => {
		// 		const programId = event.target.getAttribute("data-id");
		// 		openUpdateModal(programId);
		// 	});
		// });
	} catch (error) {
		// console.error("Error displaying programs:", error);
	}
}

async function submitForm(event) {
	event.preventDefault();
	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.reps = parseInt(formData.reps, 10);
	formData.id = crypto.randomUUID(); // Generate a unique ID for the new program// Use uuid.4v() to generate a unique ID

	try {
		console.log("Form Data:", formData);
		const response = await fetch(
			"/api/gym-programs/create",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			}
		);

		if (response.ok) {
			alert(`Program: [${formData.name}] has been created successfully!`);
			event.target.reset();
			closeModal(document.getElementById("programModal"));
			await displayPrograms();
		} else {
			const errorData = await response.json();
			alert(
				"Error creating program: " +
				(errorData.errors
					? errorData.errors.join(", ")
					: "Unknown error!")
			);
		}
	} catch (error) {
		alert("Failed to connect to the server.");
		console.error("Error submitting form: ", error);
	}
}

function startProgramHandlers() {
	const programModal = document.getElementById("programModal");
	const openModalButton = document.getElementById("openModalButton");
	const closeModalButton = document.getElementById("closeModalButton");
	const programForm = document.getElementById("programForm");

	openModalButton.addEventListener("click", () => openModal(programModal));
	closeModalButton.addEventListener("click", () => closeModal(programModal));
	programForm.addEventListener("submit", submitForm);

	displayPrograms();
}

startProgramHandlers();
