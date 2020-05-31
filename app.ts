import { Application } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { insertUser, deleteUserById, getUser, getUsers } from './controller/user/user.ts'

const app = new Application();

const types = gql`
type User {
  id: String
  firstName: String
  lastName: String
}

input UserInput {
  firstName: String
  lastName: String
}
input UserDeleteInput{
  id: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String!): User
  getUsers: [User] 
}

type Mutation {
  insertUser(input: UserInput!): User
  deleteUser(input: UserDeleteInput!): String
}
`;

const resolvers = {
  Query: {
    getUser: async (parent: any, { id }: any, context: any, info: any) => {
      return await getUser(id)
    },
    getUsers: async (parent: any, { }, context: any, info: any) => {
      return await getUsers()
    },
  },
  Mutation: {
    insertUser: async (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
      return await insertUser({
        firstName: firstName,
        lastName: lastName
      })
    },
    deleteUser: async (parent: any, { input: { id } }: any, context: any, info: any) => {
      return await deleteUserById(id)
    },
  },
};

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 });