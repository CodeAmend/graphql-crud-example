const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

const customers = [
  { id: 1, name: "John Doe", age: 34, email: "john@gmail.com" },
  { id: 2, name: "April Last", age: 39, email: "amy@gmail.com" },
  { id: 2, name: "Ben Todd", age: 11, email: "ben@gmail.com" },
]

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// Root Query
const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
    fields: {
      customer: { 
        type: CustomerType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(parentValue, args ) {
          for(let i = 0; i < customers.length; i++) {
            if(args.id == customers[i].id) {
              return customers[i];
            }
          }
        }
      },
      customers: {
        type: new GraphQLList(CustomerType),
        resolve() {
          return customers;
        }

      }
    }
}) 

module.exports = new GraphQLSchema({
  query: rootQuery
});
