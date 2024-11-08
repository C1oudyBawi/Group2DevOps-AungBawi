/**
 * @returns { RequestInit }
 */
export const constructGET = () =>
{
    return {
        method: "GET",
        headers: new Headers(),
    };
}

/**
 * @returns { RequestInit }
 */
export const constructDELETE = () =>
{
    return {
        method: "DELETE",
        headers: new Headers(),
    };
}

/**
 * @param { Object } payload
 * @returns { RequestInit }
 */
const constructJSONCore = (payload) =>
{
    const PAYLOAD_DEFINED = payload !== undefined;

    const headers = new Headers();

    if (PAYLOAD_DEFINED)
    {
        headers.append("Content-Type", "application/json");
    }

    return {
        headers: headers,
        body: PAYLOAD_DEFINED ? JSON.stringify(payload) : undefined,
    }
}

/**
 * @param { Object } payload
 * @returns { RequestInit }
 */
export const constructPOST = (payload)  =>
{
    const init = constructJSONCore(payload);

    init.method = "POST";

    return init
}

/**
 * @param { Object } payload
 * @returns { RequestInit }
 */
export const constructPUT = (payload) =>
{
    const init = constructJSONCore(payload);

    init.method = "PUT";

    return init
}

/**
 * @param { RequestInit } requestInit
 * @param { Object } content
 * @returns { RequestInit }
 */
export const appendJSONContent = (requestInit, content) =>
{
    requestInit.headers.append("Content-Type", "application/json");
    requestInit.body = JSON.stringify(content);
    return requestInit;
}


