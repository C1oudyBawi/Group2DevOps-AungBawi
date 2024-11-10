import { openUpdateModal } from "./UpdateGymProgram.mjs";

function openModal(modal) {
	modal.style.display = "block";
}

export function closeModal(modal) {
	modal.style.display = "none";
}

export async function displayPrograms() {
	try {
		const response = await fetch("http://localhost:5050/api/gym-programs");
		if (!response.ok) {
			alert("Failed to fetch programs.");
			return;
		}

		const programs = await response.json();
		const programArray = programs.programs;
		console.log(programs);
		const programListDiv = document.getElementById("programList");
		programListDiv.innerHTML = "<h2>Current Programs</h2>";

		const gridContainer = document.createElement("div");
		gridContainer.style.display = "grid";
		gridContainer.style.gridTemplateColumns =
			"repeat(auto-fit, minmax(150px, max-content))";
		gridContainer.style.gap = "5px";

		programArray.map((program) => {
			const programDiv = document.createElement("div");
			programDiv.style.border = "1px solid #ccc";
			programDiv.style.padding = "8px";
			programDiv.style.borderRadius = "5px";
			programDiv.style.backgroundColor = "#f9f9f9";
			programDiv.style.width = "300px";
			let programName = program.name.toUpperCase();
			programDiv.innerHTML = `
                <h3>${programName}</h3>
                <p>Focus: ${program.focusBodyPart}</p>
                <p>Difficulty: ${program.difficulty}</p>
                <p>Intensity: ${program.intensity}</p>
                <p>Target Audience: ${program.targetAudience}</p>
                <p>Repetitions: ${program.reps}</p>
                <p>Status: ${program.isActive ? "Active" : "Inactive"}</p>
				<button class="btn btn-secondary btn-sm update-button" data-id="${
					program.id
				}">Update</button>
            `;
			gridContainer.appendChild(programDiv);
		});
		programListDiv.appendChild(gridContainer);

		document.querySelectorAll(".update-button").forEach((button) => {
			button.addEventListener("click", (event) => {
				const programId = event.target.getAttribute("data-id");
				openUpdateModal(programId);
			});
		});
	} catch (error) {
		console.error("Error displaying programs:", error);
	}
}

async function submitForm(event) {
	event.preventDefault();
	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.reps = parseInt(formData.reps, 10);
	formData.id = crypto.randomUUID(); // Generate a unique ID for the new program

	try {
		const response = await fetch(
			"http://localhost:5050/api/gym-programs/create",
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
