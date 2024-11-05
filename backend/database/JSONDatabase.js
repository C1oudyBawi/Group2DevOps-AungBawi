import {tryReadJSONAsync, writeJSONAsync} from "../helpers/JsonHelpers.mjs";

class JSONDatabase
{
    static DATABASE_PATH = "database.json";

    /**
     * @type { Map<bigint, MemberDTO> }
     * @public
     */
    members;

    /**
     * @type { Map<string, GymProgramDTO> }
     * @public
     */
    programs;

    constructor()
    {
        this.members = new Map();
        this.programs = new Map();
    }

    static getOrCreateDatabaseAsync = async () =>
    {
        const DATABASE_PATH = JSONDatabase.DATABASE_PATH;

        let database = await tryReadJSONAsync(DATABASE_PATH);

        if (database === null)
        {
            database = new JSONDatabase();
            await writeJSONAsync(database, DATABASE_PATH);
        }

        return database;
    }

    /**
     * @returns { Promise }
     */
    updateAsync = () =>
    {
        return writeJSONAsync(this, JSONDatabase.DATABASE_PATH);
    }
}