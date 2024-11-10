import { z } from "zod";
import { isAlpha } from "class-validator";

// https://stackoverflow.com/questions/76354177/how-to-infer-zod-type-in-jsdoc-without-typescript
/**
 * @typedef { z.infer<typeof MemberDTOSchema> } MemberDTOSchemaType
 */
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
   * @type { string[] }
   * @public
   */
  gymPrograms;

  /**
   * @param { bigint } id
   * @param { string } name
   * @param { string } adminNumber
   * @param { string[] } gymPrograms
   */
  constructor({ id, name, adminNumber, gymPrograms })
  {
    if (id !== undefined)
    {
        this.id = `${id}`;
    }

    else
    {
        delete this.id;
    }

    this.name = name;
    this.adminNumber = adminNumber;
    this.gymPrograms = gymPrograms;
  }

  /**
   * @param { MemberDTOSchemaType } schema
   * @returns { MemberDTO }
   */
  static fromSchema(schema)
  {
      return new MemberDTO(
      {
          id: undefined,
          name: schema.name,
          adminNumber: schema.adminNumber,
          gymPrograms: schema.gymPrograms
      });
  }
}