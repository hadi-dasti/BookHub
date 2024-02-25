import swaggerJSDoc from "swagger-jsdoc";

// Define Swagger options
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "BookHub API",
      version: "1.0.0",
      description: "API documentation for BookHub project",
    },
    servers: [
      {
        url: "http://localhost:3000/v1/book-hub",
      },
    ],
  },

  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;