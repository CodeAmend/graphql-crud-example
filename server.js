const express = require('express');
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const app = express();


app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}));


const port = 4000;

app.listen(port, () => {
  console.log(`+++ Express server running on port ${port}`);
});
