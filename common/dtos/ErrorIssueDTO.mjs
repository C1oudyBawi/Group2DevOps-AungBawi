import { ZodIssueCode } from "zod";

// This class mirrors ZodIssue
// https://zod.dev/ERROR_HANDLING?id=zodissue
export class ErrorIssueDTO
{
    /**
     * @type { string }
     * @public
     */
    message;

    /**
     * @type { ZodIssueCode }
     * @public
     */
    code;

    /**
     * @type { string[] }
     * @public
     */
    path;

    constructor({ message, path })
    {
        this.message = message;
        this.code = ZodIssueCode.custom;
        this.path = path;
    }
}