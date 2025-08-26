import { z } from "zod";
import { checkZodAgainstOpenAPI30 } from "./_checker.ts";

const theSchema = z.tuple([z.string(), z.number(), z.null()]);

const validOpenAPISchema = {
  type: "array",
  items: {
    anyOf: [{ type: "string" }, { type: "number" }],
    nullable: true,
  },
  minItems: 3,
  maxItems: 3,
};

checkZodAgainstOpenAPI30({
  zodSchema: theSchema,
  validOpenAPISchema,
});
