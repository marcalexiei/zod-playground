import { Validator } from "@seriousme/openapi-schema-validator";
import { z } from "zod";

const numberSchema = z.number().lt(100).gt(1);

const openAPISchema = z.toJSONSchema(numberSchema, {
  target: "openapi-3.0",
});

console.info("openAPISchema", openAPISchema);

const validOpenAPISchema = {
  type: "number",
  minimum: 1,
  exclusiveMinimum: true,
  maximum: 100,
  exclusiveMaximum: true,
};

const schema = {
  openapi: "3.0.0",
  info: {
    title: "SampleApi",
    version: "1.0.1",
  },
  components: {
    schemas: {
      Code: openAPISchema,
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
