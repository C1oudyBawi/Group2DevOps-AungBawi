import { tryReadJSONAsync, writeJSONAsync } from "../helpers/JsonHelpers.mjs";
import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../dtos/MemberDTO.mjs";

// Sylvester
export const createMemberAsync = async (req, res) =>
{
    // Dummy create method for testing purposes

    let database = DB_INSTANCE;

    let member = new MemberDTO(
    {
        name: "TrumpMcDonaldz",
        admin_number: "2305387I"
    });

    let generatedID = member.id;

    database.members.set(generatedID, member);

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${generatedID} ) created successfully!` });
}

// TrumpMcDonaldz
export const updateMemberAsync = async (req, res) =>
{
    // Dummy update method for testing purposes

    let database = DB_INSTANCE;

    let memberID = req.params.id;

    if (memberID === undefined)
    {
        res.status(400).json({ message: "Member ID not provided!" });
        return;
    }

    let member = database.members.get(memberID);

    if (member === undefined)
    {
        res.status(404).json({ message: "Member not found!" });
        return;
    }

    /**
     * @type { MemberDTO }
     */
    let body = req.body;

    // TODO: Validate more stuff
    member.name = body.name;
    member.admin_number = body.admin_number;

    let uniqueGymPrograms = new Set();

    for (let programName of uniqueGymPrograms.keys())
    {
        if (uniqueGymPrograms.has(programName))
        {
            continue;
        }

        uniqueGymPrograms.add(programName);

        let targetProgram = database.programs.get(programName);

        if (targetProgram === undefined)
        {
            res.status(404).json({ message: `Program ( Name: ${programName} ) not found!` });
            return;
        }

        if (!targetProgram.is_active)
        {
            res.status(400).json({ message: `Program ( Name: ${programName} ) is inactive!` });
            return;
        }
    }

    member.gym_programs = Array.from(uniqueGymPrograms);

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
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