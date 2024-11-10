import { displayPrograms } from "./CreateGymProgram.mjs";

const updateModal = document.getElementById("updateProgramModal");

export function openUpdateModal(programId) {
	updateModal.style.display = "block";
	loadProgramData(programId);
}

async function loadProgramData(programId) {
	try {
		const response = await fetch(
			`http://localhost:5050/api/gym-programs/${programId}`
		);
		if (!response.ok) {
			alert("Failed to fetch program data.");
			return;
		}

		const program = await response.json();
		document.getElementById("updateName").value = program.name;
		document.getElementById("updateFocusBodyPart").value =
			program.focusBodyPart;
		document.getElementById("updateDifficulty").value = program.difficulty;
		document.getElementById("updateIntensity").value = program.intensity;
		document.getElementById("updateTargetAudience").value =
			program.targetAudience;
		document.getElementById("updateReps").value = program.reps;
		document.getElementById("updateProgramId").value = program.id;
	} catch (error) {
		console.error("Error loading program data:", error);
	}
}

async function submitUpdateForm(event) {
	event.preventDefault();
	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.reps = parseInt(formData.reps, 10);

	try {
		const response = await fetch(
			`http://localhost:5050/api/gym-programs/update/${formData.id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			}
		);

		if (response.ok) {
			alert(`Program: [${formData.name}] has been updated successfully!`);
			event.target.reset();
			closeModal(document.getElementById("updateProgramModal"));
			await displayPrograms();
		} else {
			const errorData = await response.json();
			alert(
				"Error updating program: " +
					(errorData.errors
						? errorData.errors.join(", ")
						: "Unknown error!")
			);
		}
	} catch (error) {
		alert("Failed to connect to the server.");
		console.error("Error submitting update form: ", error);
	}
}

async function submitForm(event) {
	event.preventDefault();
	const formData = Object.fromEntries(new FormData(event.target).entries());
	formData.reps = parseInt(formData.reps, 10);

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
					(errorData.erros
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
	const modal = document.getElementById("updateProgramModal");
	const closeModalButton = document.getElementById("closeModalButton");
	const programForm = document.getElementById("programForm");

	closeModalButton.addEventListener("click", () => closeModal(modal));
	programForm.addEventListener("submit", submitForm);

	const closeUpdateModalButton = document.getElementById(
		"closeUpdateModalButton"
	);

	closeUpdateModalButton.addEventListener("click", () =>
		closeModal(updateModal)
	);

	const updateProgramForm = document.getElementById("updateProgramForm");
	updateProgramForm.addEventListener("submit", submitUpdateForm);

	displayPrograms();
}

startProgramHandlers();
