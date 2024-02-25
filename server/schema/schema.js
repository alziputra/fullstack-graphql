// Impor modul dan data yang diperlukan
const { projects, clients } = require("../sampleData");

// Impor GraphQLObjectType, GraphQLID, GraphQLString, dan GraphQLSchema dari paket graphql
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require("graphql");

// Tentukan tipe data untuk klien
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID }, 
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Tentukan query utama
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Tentukan field 'client' dalam query utama
    client: {
      type: ClientType, // Atur tipe data pengembalian menjadi ClientType
      args: { id: { type: GraphQLID } }, // Tentukan argumen untuk field 'client'
      resolve(parent, args) {
        // Fungsi resolve untuk menemukan dan mengembalikan klien berdasarkan id
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

// Ekspor skema GraphQL
module.exports = new GraphQLSchema({
  query: RootQuery, // Atur query utama untuk skema
});
