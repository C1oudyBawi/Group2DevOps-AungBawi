import { readJSON, writeJSON } from "../utils/fileOperations.mjs";
import { Member } from '../models/Member.mjs'; 

export const createMember = async(req, res) =>
{
    try {
        const { name, email, admin_number, gym_programs } = req.body;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        const nameRegex = /^[a-zA-Z\s-]+$/; 

        if (!name || !name.trim() || !nameRegex.test(name)) {
            return res.status(400).json({ message: 'Invalid name. It should contain only alphabetic characters and spaces.' });
        }
        
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        
        const adminNumberRegex = /^\d{7}[A-Z]$/;
        if (!adminNumberRegex.test(admin_number)) {
            return res.status(400).json({ message: 'Invalid admin number format. It should consist of 7 digits followed by 1 uppercase letter (e.g., 2304806I).' });
        } 
        
        const programSet = new Set(gym_programs);
        if (programSet.size !== gym_programs.length) {
            return res.status(400).json({ message: 'Duplicate gym program IDs are not allowed.' });
        }

        const newMember = new Member(name, email, admin_number, Array.from(programSet));
        const updatedMembers = await writeJSON(newMember, 'controllers/members.json');

        return res.status(201).json(updatedMembers);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMember = (req, res) =>
{

}

// async function viewResources(req, res)
// {
// 	try {
// 		const allResources = await readJSON("utils/resources.json");
// 		return res.status(201).json(allResources);
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// }
//
// async function addResource(req, res)
// {
// 	try {
// 		const name = req.body.name;
// 		const location = req.body.location;
// 		const description = req.body.description;
// 		const owner = req.body.owner;
// 		if (
// 			!owner.includes("@") ||
// 			!owner.includes(".") ||
// 			description.length < 6
// 		) {
// 			return res.status(500).json({ message: "Validation error" });
// 		} else {
// 			const newResource = new Resource(
// 				name,
// 				location,
// 				description,
// 				owner
// 			);
// 			const updatedResources = await writeJSON(
// 				newResource,
// 				"utils/resources.json"
// 			);
// 			return res.status(201).json(updatedResources);
// 		}
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// }
//
// async function editResource(req, res) {
// 	try {
// 		const id = req.params.id;
// 		const name = req.body.name;
// 		const location = req.body.location;
// 		const description = req.body.description;
// 		const owner = req.body.owner;
// 		const allResources = await readJSON("utils/resources.json");
// 		var modified = false;
// 		for (var i = 0; i < allResources.length; i++) {
// 			var curcurrResource = allResources[i];
// 			if (curcurrResource.id == id) {
// 				allResources[i].name = name;
// 				allResources[i].location = location;
// 				allResources[i].description = description;
// 				allResources[i].owner = owner;
// 				modified = true;
// 			}
// 		}
// 		if (modified) {
// 			await fs.writeFile(
// 				"utils/resources.json",
// 				JSON.stringify(allResources),
// 				"utf8"
// 			);
// 			return res
// 				.status(201)
// 				.json({ message: "Resource modified successfully!" });
// 		} else {
// 			return res
// 				.status(500)
// 				.json({ message: "Error occurred, unable to modify!" });
// 		}
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// }
//
// async function deleteResource(req, res) {
// 	try {
// 		const id = req.params.id;
// 		const allResources = await readJSON("utils/resources.json");
// 		var index = -1;
// 		for (var i = 0; i < allResources.length; i++) {
// 			var curcurrResource = allResources[i];
// 			if (curcurrResource.id == id) index = i;
// 		}
// 		if (index != -1) {
// 			allResources.splice(index, 1);
// 			await fs.writeFile(
// 				"utils/resources.json",
// 				JSON.stringify(allResources),
// 				"utf8"
// 			);
// 			return res
// 				.status(201)
// 				.json({ message: "Resource deleted successfully!" });
// 		} else {
// 			return res
// 				.status(500)
// 				.json({ message: "Error occurred, unable to delete!" });
// 		}
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// }