import { GymProgramDTO } from "../../../common/dtos/GymProgramDTO.mjs";
import { classToPlain, plainToClassFromExist } from "class-transformer";
import { plainToClass2 } from "../../helpers/TransformerHelpers.mjs";

export class GymProgramEntity extends GymProgramDTO
{
    // Don't expose it

    /**
     * @private
     */
    gymPrograms;

    gymProgramIDs;

    /**
     * @param { GymProgramDTO } dto
     * @returns { GymProgramEntity }
     */
    static fromDTO(dto)
    {
        return plainToClass2(GymProgramEntity, classToPlain(dto));
    }

    /**
     * @param { GymProgramDTO } dto
     */
    applyDTO(dto)
    {
        plainToClassFromExist(this, classToPlain(dto));
    }

    /**
     * @returns { GymProgramDTO }
     */
    toDTO()
    {
        return plainToClass2(GymProgramDTO, classToPlain(this));
    }
}