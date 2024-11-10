import { tryReadJSONAsync, writeJSONAsync } from "../helpers/JsonHelpers.mjs";
import { plainToClass, plainToClassFromExist} from "class-transformer";
import { MemberDTO } from "../../common/dtos/MemberDTO.mjs";
import { GymProgramDTO } from "../../common/dtos/GymProgramDTO.mjs";
import { MemberEntity } from "./entities/MemberEntity.mjs";
import { GymProgramEntity } from "./entities/GymProgramEntity.mjs";

export class JSONDatabase
{
    static DATABASE_PATH = "database.json";

    /**
     * @type { Map<string, MemberEntity> }
     * @public
     */
    members;

    /**
     * @type { Map<string, GymProgramEntity> }
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

        /**
         * @type { JSONDatabase }
         */
        let database = await tryReadJSONAsync(DATABASE_PATH);

        if (database !== null)
        {
            database = plainToClass(JSONDatabase, database);

            // Members is currently in the form of Map<string, Map>
            // See: https://github.com/typestack/class-transformer/issues/288
            let members = database.members;

            for (let [key, value] of members)
            {
                let rawData = Object.fromEntries(value.entries());

                // Apparently plainToClass() doesn't work if you have a non-paramless ctor.
                // Stupid but it is what it is.
                // See: https://github.com/typestack/class-transformer/issues/132

                // Construct MemberDTO instance, bypassing ctor.
                let member = Reflect.construct(Object, [], MemberEntity);

                member = plainToClassFromExist(member, rawData);

                members.set(key, member);
            }

            let programs = database.programs;

            for (let [key, value] of programs)
            {
                let rawData = Object.fromEntries(value.entries());

                let program = Reflect.construct(Object, [], GymProgramEntity);

                program = plainToClassFromExist(program, rawData);

                programs.set(key, program);
            }
        }

        else
        {
            database = new JSONDatabase();
            await writeJSONAsync(database, DATABASE_PATH);
        }

        return database;
    }

    /**
     * @param { string } id
     * @returns { MemberEntity | null }
     */
    tryGetMemberByID = (id) =>
    {
        return this.members.get(id) ?? null;
    }

    /**
     * @param { string } id
     * @returns { GymProgramEntity | null }
     */
    tryGetGymProgramByID = (id) =>
    {
        return this.programs.get(id) ?? null;
    }

    /**
     * @param { string } name
     * @returns { GymProgramEntity | null }
     */
    tryGetGymProgramByName = (name) =>
    {
        for (let program of this.programs.values())
        {
            if (program.name.toLowerCase() === name.toLowerCase())
            {
                return program;
            }
        }

        return null;
    }

    /**
     * @param { MemberDTO } memberDTO
     * @returns { MemberEntity | null }
     */
    tryCreateMember = (memberDTO) =>
    {
        const memberID = memberDTO.id;

        if (this.tryGetMemberByID(memberID) === null)
        {
            const entity = MemberEntity.fromDTO(memberDTO, this);
            this.members.set(memberID, entity);
            return entity;
        }

        return null;
    }

    /**
     * @param { GymProgramDTO } gymProgramDTO
     * @returns { GymProgramEntity | null }
     */
    tryCreateGymProgram = (gymProgramDTO) =>
    {
        const programID = gymProgramDTO.id;

        if (this.tryGetGymProgramByID(programID) === null)
        {
            const entity = GymProgramEntity.fromDTO(gymProgramDTO);
            this.programs.set(programID, entity);
            return entity;
        }

        return null;
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