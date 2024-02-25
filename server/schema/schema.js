// Impor modul dan data yang diperlukan
const { projects, clients } = require("../sampleData");

// Impor GraphQLObjectType, GraphQLID, GraphQLString, dan GraphQLSchema, GraphQLList dari paket graphql
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

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

// Definisikan root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Field 'clients' dalam root query, mengembalikan daftar semua klien yang tersedia
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },

    // Field 'client' dalam root query, mengembalikan informasi tentang satu klien berdasarkan ID yang diberikan
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fungsi resolve untuk mencari dan mengembalikan klien berdasarkan ID
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

// Ekspor skema GraphQL
module.exports = new GraphQLSchema({
  // Atur query utama untuk skema
  query: RootQuery, 
});
