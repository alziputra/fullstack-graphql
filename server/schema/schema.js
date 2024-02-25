// Impor modul dan data yang diperlukan
const { projects, clients } = require("../sampleData");

// Impor GraphQLObjectType, GraphQLID, GraphQLString, dan GraphQLSchema, GraphQLList dari paket graphql
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

// Tentukan tipe data untuk project
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        // Fungsi resolve untuk mencari dan mengembalikan client berdasarkan ID client yang terkait dengan project
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

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
    // Field 'projects' dalam root query, mengembalikan daftar semua project yang tersedia
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      },
    },

    // Field 'project' dalam root query, mengembalikan informasi tentang satu project berdasarkan ID yang diberikan
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fungsi resolve untuk mencari dan mengembalikan project berdasarkan ID
        return projects.find((project) => project.id === args.id);
      },
    },

    // Field 'clients' dalam root query, mengembalikan daftar semua client yang tersedia
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },

    // Field 'client' dalam root query, mengembalikan informasi tentang satu client berdasarkan ID yang diberikan
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fungsi resolve untuk mencari dan mengembalikan client berdasarkan ID
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
