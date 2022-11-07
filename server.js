const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const database = require("./database/db");
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));

app.use("/user", require("./Router/router"));
app.use("/Admin", require("./Router/adminRouter"));
app.use("/admin", require("./Router/static"));
app.use("/userMangement", require("./Router/userMangementRouter"));
app.use("/customer", require("./Router/customerRoutes"));
app.use("/delievery", require("./Router/delieveryRouter"));
app.use("/shop",require("./Router/googleMapRoutes"))

const swaggerDefinition = {
  info: {
    title: "Node Test",
    version: "1.0.0",
    description: "Swagger API Docs",
  },
  host: `172.16.0.3:5500`,
  basePath: "/",
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./Router/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
