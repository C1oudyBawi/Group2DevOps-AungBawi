export class GetGymProgramsDTO
{
    /**
     * @type { GymProgramDTO[] }
     * @public
     */
    programs;

    constructor(programs)
    {
        this.programs = programs;
    }
}