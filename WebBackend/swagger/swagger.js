import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "User API",
    description: "Auto Generated Swagger Docs",
  },
  host: `http://localhost:${process.env.PORT}`,
  schemes: ["http"],
};

const outputFile = "./swagger/swagger-output.json";
const routes = ["./index.js", "./routes/*.js"];

swaggerAutogen()(outputFile, routes, doc);