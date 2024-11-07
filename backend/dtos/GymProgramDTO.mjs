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