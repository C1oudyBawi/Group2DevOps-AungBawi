// noinspection ES6UnusedImports
import { z } from "zod";

/**
 * @param { ErrorIssueDTO[] | z.ZodIssue[] } errors
 * @returns { string }
 */
export const errorsToText = (errors) =>
{
    return errors
        .map(error => `[ ${error.path} ] ${error.message}`)
        .join('\n');
}