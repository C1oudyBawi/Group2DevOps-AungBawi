import { tryReadJSONAsync, writeJSONAsync } from "../helpers/JsonHelpers.mjs";
import {plainToClass} from "class-transformer";

export class JSONDatabase
{
    static DATABASE_PATH = "database.json";

    /**
     * @type { Map<string, MemberDTO> }
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

    /**
     * @returns { Promise<JSONDatabase> }
     * @private
     */
    static getOrCreateDatabaseAsync = async () =>
    {
        const DATABASE_PATH = JSONDatabase.DATABASE_PATH;

        let database = await tryReadJSONAsync(DATABASE_PATH);

        if (database !== null)
        {
            // // https://stackoverflow.com/questions/38922990/re-associating-an-object-with-its-class-after-deserialization-in-node-js
            // database = Object.create(
            //     JSONDatabase.prototype,
            //     Object.getOwnPropertyDescriptors(database)
            // );

            database = plainToClass(JSONDatabase, database);
        }

        else
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

export const DB_INSTANCE = await JSONDatabase.getOrCreateDatabaseAsync();