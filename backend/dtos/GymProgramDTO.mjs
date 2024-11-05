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
  is_active;

  constructor({ name, is_active })
  {
    this.name = name;
    this.is_active = is_active;
  }
}