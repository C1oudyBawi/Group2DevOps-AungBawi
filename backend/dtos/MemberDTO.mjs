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
  adminNumber;

  /**
   * @type { GymProgramDTO[] }
   * @public
   */
  gymPrograms;

  constructor({ name, adminNumber })
  {
    this.id = `${generateSnowflake()}`;
    this.name = name;
    this.adminNumber = adminNumber;
    this.gymPrograms = [];
  }
}