class MemberDTO
{
  /**
   * @type { bigint }
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

  constructor({ id, name, email })
  {
    this.id = id;
    this.name = name;
    this.admin_number = email;
    this.gym_programs = [];
  }
}