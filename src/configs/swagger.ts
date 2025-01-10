import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for Fretboard",
    },
  },
  apis: [path.resolve(__dirname, "../routes/**/*.{ts,js}")],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
