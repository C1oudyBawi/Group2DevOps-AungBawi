export class Endpoints
{
    static BASE_URL = "http://localhost:5050";
    static API_ENDPOINT = `${Endpoints.BASE_URL}/api`;

    static MEMBER_ENDPOINT = `${Endpoints.API_ENDPOINT}/members`;
    static MEMBER_GET_ENDPOINT = Endpoints.MEMBER_ENDPOINT;
    static MEMBER_CREATE_ENDPOINT = `${Endpoints.MEMBER_ENDPOINT}/create`;
    static MEMBER_UPDATE_ENDPOINT = `${Endpoints.MEMBER_ENDPOINT}/update`;

    static GYM_PROGRAM_ENDPOINT = `${Endpoints.API_ENDPOINT}/gym-programs`;
    static GYM_PROGRAM_GET_ENDPOINT = Endpoints.GYM_PROGRAM_ENDPOINT;
    static GYM_PROGRAM_CREATE_ENDPOINT = `${Endpoints.GYM_PROGRAM_ENDPOINT}/create`;
    static GYM_PROGRAM_UPDATE_ENDPOINT = `${Endpoints.GYM_PROGRAM_ENDPOINT}/update`;
}