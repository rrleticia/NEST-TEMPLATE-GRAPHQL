import { ValidationOptions, ValidateIf } from 'class-validator';

export function IsUndefined(validationOptions?: ValidationOptions) {
  return (obj: Object, property: string) =>
    ValidateIf(
      (o: Record<string, unknown>) => o[property] !== undefined,
      validationOptions
    )(obj, property);
}
