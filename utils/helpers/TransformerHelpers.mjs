import { plainToClassFromExist } from "class-transformer";

export const plainToClass2 = (classType, plain) =>
{
    let instance = Reflect.construct(Object, [], classType);
    return  plainToClassFromExist(instance, plain);
}