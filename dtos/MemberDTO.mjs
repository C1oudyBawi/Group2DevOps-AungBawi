import { z } from "zod";
import { isAlpha } from "class-validator";

export const MemberDTOSchema = z.object(
{
    name: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .refine(
            name => name.split(' ').every(word => isAlpha(word)),
            { message: "Name must only contain letters!" }
        ),

    adminNumber: z
        .string()
        .toUpperCase()
        .regex(
            /^\d{7}[A-Z]$/,
            { message: "Invalid admin number format. It should consist of 7 digits followed by 1 uppercase letter (e.g., 2304806I)." }
        ),

    gymPrograms: z
        .array(z.string())
        .default([])
        .transform(programs => new Set(programs))
        .transform(programs => Array.from(programs))
        .transform(programs => programs.map(program => program.toLowerCase()))
});

export const MemberUpdateDTOSchema = MemberDTOSchema.partial();

export class MemberDTO
{
  /**
   * @type { string } // Technically, this is supposed to be a bigint, but JS doesn't serialize it well...
   * @public
   */
  id;

  /**
   * @type { string }
   * @public
   */
  name;

  /**
   * @type { string }
   * @public
   */
  adminNumber;

  /**
   * @type { GymProgramDTO[] }
   * @public
   */
  gymPrograms;

  /**
   * @param { bigint } snowflakeID
   * @param { string } name
   * @param { string } adminNumber
   * @param { GymProgramDTO[] } gymPrograms
   */
  constructor({ snowflakeID, name, adminNumber, gymPrograms })
  {
    this.id = `${snowflakeID}`;
    this.name = name;
    this.adminNumber = adminNumber;
    this.gymPrograms = gymPrograms;
  }
}