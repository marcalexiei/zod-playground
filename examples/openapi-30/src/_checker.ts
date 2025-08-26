import { Validator } from "@seriousme/openapi-schema-validator";
import { z, type ZodType } from "zod";

export async function checkZodAgainstOpenAPI30(options: {
  zodSchema: ZodType;
  validOpenAPISchema: Record<string, unknown>;
  /** use this to check if valid schema is correct */
  includeZodSchemaInOutput?: boolean;
}) {
  const {
    zodSchema,
    validOpenAPISchema,
    includeZodSchemaInOutput = true,
  } = options;

  const openAPISchema = z.toJSONSchema(zodSchema, {
    target: "openapi-3.0",
  });

  console.info("openAPISchema", JSON.stringify(openAPISchema, null, 2));

  const schema = {
    openapi: "3.0.0",
    info: {
      title: "SampleApi",
      version: "1.0.1",
    },
    components: {
      schemas: {
        ...(includeZodSchemaInOutput ? { Code: openAPISchema } : {}),
        CodeCorrect: validOpenAPISchema,
      },
    },
    paths: {},
    servers: [],
  };

  const validator = new Validator();

  const result = await validator.validate(schema);
  if (!result.valid) {
    console.info(result.errors);
    throw Error("invalid schema");
  }

  console.info("all good");
}
