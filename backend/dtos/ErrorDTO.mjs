export class ErrorDTO
{
    /**
     * @type { ErrorIssueDTO[] }
     * @public
     */
    errors;

    constructor(errors)
    {
        this.errors = errors;
    }
}