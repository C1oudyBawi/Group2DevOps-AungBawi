import { generateSnowflake } from "../helpers/SnowflakeHelpers.mjs";

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
  admin_number;

  /**
   * @type { GymProgramDTO[] }
   * @public
   */
  gym_programs;

  constructor({ name, email })
  {
    this.id = `${generateSnowflake()}`;
    this.name = name;
    this.admin_number = email;
    this.gym_programs = [];
  }
}