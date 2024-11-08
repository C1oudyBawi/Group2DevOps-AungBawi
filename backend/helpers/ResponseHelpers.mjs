import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { ErrorIssueDTO } from "../dtos/ErrorIssueDTO.mjs";
import { ErrorDTO } from "../dtos/ErrorDTO.mjs";
import { ZodIssue } from "zod";

/**
 * @param { Response } res
 * @param { ErrorIssueDTO | ZodIssue } error
 */
export const respondWithBadRequestError = (res, error) =>
{
    respondWithNotFoundErrors(res, [ error ]);
}

/**
 * @param { Response } res
 * @param { ErrorIssueDTO[] | ZodIssue[] } errors
 */
export const respondWithBadRequestErrors = (res, errors) =>
{
    res.status(StatusCodes.BAD_REQUEST).json(new ErrorDTO(errors));
}

/**
 * @param { Response } res
 * @param { ErrorIssueDTO | ZodIssue } error
 */
export const respondWithNotFoundError = (res, error) =>
{
    respondWithNotFoundErrors(res, [ error ]);
}

/**
 * @param { Response } res
 * @param { ErrorIssueDTO[] | ZodIssue[] } errors
 */
export const respondWithNotFoundErrors = (res, errors) =>
{
    res.status(StatusCodes.NOT_FOUND).json();
}