import { Snowflake } from "nodejs-snowflake";

// https://www.npmjs.com/package/nodejs-snowflake
const SNOWFLAKE_GENERATOR = new Snowflake(
{
    // https://www.epochconverter.com/
    // 6 / 11 / 2024, 1:22 AM, Singapore time
    custom_epoch: 1730827357,
    instance_id: 69
});

/**
 * @return { bigint }
 */
export const generateSnowflake = () =>
{
    return SNOWFLAKE_GENERATOR.getUniqueID();
}

