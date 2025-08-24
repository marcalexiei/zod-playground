import { z } from "zod";
import { checkZodAgainstOpenAPI30 } from "./_checker.ts";

const numberSchema = z.number().lt(100).gt(1);

const validOpenAPISchema = {
  type: "number",
  minimum: 1,
  exclusiveMinimum: true,
  maximum: 100,
  exclusiveMaximum: true,
};

checkZodAgainstOpenAPI30({
  zodSchema: numberSchema,
  validOpenAPISchema,
});
