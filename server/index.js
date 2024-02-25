// Impor modul express
const express = require("express");

// Memuat variabel lingkungan dari file .env ke dalam process.env
require("dotenv").config();

// Mengimpor server HTTP GraphQL
const { graphqlHTTP } = require("express-graphql");

// Mengimpor skema GraphQL dari file ./schema/schema
const schema = require("./schema/schema");

// Tentukan nomor port untuk mendengarkan, gunakan process.env.PORT atau default ke 5000
const port = process.env.PORT || 5000;

// Buat aplikasi Express
const app = express();

// Tentukan endpoint GraphQL '/graphql'
// dan lampirkan middleware graphqlHTTP untuk menangani permintaan GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Mulai server untuk mendengarkan pada port yang ditentukan
app.listen(port, console.log(`Server berjalan pada port ${port}`));
