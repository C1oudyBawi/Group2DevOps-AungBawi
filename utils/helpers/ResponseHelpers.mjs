import { StatusCodes } from "http-status-codes";
import { ErrorIssueDTO } from "../dtos/ErrorIssueDTO.mjs";
import { ErrorDTO } from "../dtos/ErrorDTO.mjs";
// noinspection ES6UnusedImports
import express from "express";
// noinspection ES6UnusedImports
import { z } from "zod";

/**
 * @param { express.Response } res
 * @param { ErrorIssueDTO | z.ZodIssue } error
 */
export const respondWithBadRequestError = (res, error) =>
{
    respondWithNotFoundErrors(res, [ error ]);
}

/**
 * @param { express.Response } res
 * @param { ErrorIssueDTO[] | z.ZodIssue[] } errors
 */
export const respondWithBadRequestErrors = (res, errors) =>
{
    res.status(StatusCodes.BAD_REQUEST).json(new ErrorDTO(errors));
}

/**
 * @param { express.Response } res
 * @param { ErrorIssueDTO | z.ZodIssue } error
 */
export const respondWithNotFoundError = (res, error) =>
{
    respondWithNotFoundErrors(res, [ error ]);
}

/**
 * @param { express.Response } res
 * @param { ErrorIssueDTO[] | z.ZodIssue[] } errors
 */
export const respondWithNotFoundErrors = (res, errors) =>
{
    res.status(StatusCodes.NOT_FOUND).json(new ErrorDTO(errors));
}