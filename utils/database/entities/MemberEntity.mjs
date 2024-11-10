import { MemberDTO } from "../../../common/dtos/MemberDTO.mjs";
import { classToPlain } from "class-transformer";
import { plainToClass2 } from "../../helpers/TransformerHelpers.mjs";

export class MemberEntity extends MemberDTO
{
    // Don't expose it

    /**
     * @private
     */
    gymPrograms;

    gymProgramIDs;

    /**
     * @param { MemberDTO } dto
     * @param { JSONDatabase } dbInstance
     * @returns { MemberEntity }
     */
    static fromDTO(dto, dbInstance)
    {
        const entity = plainToClass2(MemberEntity, classToPlain(dto));
        entity.gymProgramIDs = entity.gymPrograms.map(
            programName => dbInstance.tryGetGymProgramByName(programName).id
        );
        delete entity.gymPrograms;
        return entity;
    }

    /**
     * @param { MemberDTO } dto
     * @param { JSONDatabase } dbInstance
     */
    applyDTO(dto, dbInstance)
    {
        const entity = classToPlain(dto);
        entity.gymProgramIDs = entity.gymPrograms.map(programName => dbInstance.tryGetGymProgramByName(programName).id);
        delete entity.gymPrograms;
        Object.assign(this, entity);
    }

    /**
     * @param { JSONDatabase } dbInstance
     * @returns { MemberDTO }
     */
    toDTO(dbInstance)
    {
        const dto = classToPlain(this);
        dto.gymPrograms = this.gymProgramIDs.map(programID => dbInstance.tryGetGymProgramByID(programID).name);
        delete dto.gymProgramIDs;
        return plainToClass2(MemberDTO, dto);
    }
}