import { z } from "zod";
import { checkZodAgainstOpenAPI30 } from "./_checker.ts";

const theSchema = z.tuple([z.string(), z.number()]);

const validOpenAPISchema = {
  type: "array",
  items: {
    oneOf: [{ type: "string" }, { type: "number" }],
  },
  minItems: 2,
  maxItems: 2,
};

checkZodAgainstOpenAPI30({
  zodSchema: theSchema,
  validOpenAPISchema,
});
