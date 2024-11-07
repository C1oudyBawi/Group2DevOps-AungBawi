export class GetMembersDTO
{
    /**
     * @type { MemberDTO[] }
     * @public
     */
    members;

    constructor(members)
    {
        this.members = members;
    }
}