import { z } from "zod";
import { checkZodAgainstOpenAPI30 } from "./_checker.ts";

const theSchema = z.record(z.string(), z.string());

const validOpenAPISchema = {
  additionalProperties: {
    type: "string",
  },
  type: "object",
};

checkZodAgainstOpenAPI30({
  zodSchema: theSchema,
  validOpenAPISchema,
});
