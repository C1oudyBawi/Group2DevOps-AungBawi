import { z } from "zod";
import { isAlpha } from "class-validator";

export const GymProgramDTOSchema = z.object(
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

  isActive: z.boolean()
});

export const GymProgramIsActiveDTOSchema = GymProgramDTOSchema.extend(
{
    isActive: GymProgramDTOSchema.shape.isActive.refine(
        isActive => isActive,
        (value, context) => ({ message: `Program ${value} is inactive!` })
    )
});

export class GymProgramDTO
{
  /**
   * @type { string }
   * @public
   */
  name;

  /**
   * @type { boolean }
   * @public
   */
  isActive;

  constructor({ name, isActive })
  {
    this.name = name;
    this.isActive = isActive;
  }
}