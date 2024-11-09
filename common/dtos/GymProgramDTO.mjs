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
 * @type { string }
 * @public
 */
  focusBodyPart;

  /**
* @type { string }
* @public
*/
  intensity;

  /**
 * @type { string }
 * @public
 */
  difficulty;

  /**
* @type { string }
* @public
*/
  targetAudience;

  /**
 * @type { number }
 * @public
 */
  reps;

  /**
   * @type { boolean }
   * @public
   */
  isActive;

  constructor({ name, focusBodyPart, intensity, difficulty, targetAudience, reps, isActive })
  {
    this.name = name;
    this.focusBodyPart = focusBodyPart;
    this.intensity = intensity;
    this.difficulty = difficulty;
    this.targetAudience = targetAudience;
    this.reps = reps;
    this.isActive = isActive;
  }
}