const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

// const customers = [
//   { id: 1, name: "John Doe", age: 34, email: "john@gmail.com" },
//   { id: 2, name: "April Last", age: 39, email: "amy@gmail.com" },
//   { id: 2, name: "Ben Todd", age: 11, email: "ben@gmail.com" },
// ]



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
    // customer needs a type CustomerType
    // defined with 4 fields
    // customer takes an arg called 'id'
    // resolve handles the arg
    customer: { 
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args ) {
        return axios.get('http://localhost:3000/customers/' + args.id)
          .then( res => res.data );
      }
    },
    // customers takes new List type of CustomerTypes
    // all it needs is a resolve because there are no arguments
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return axios.get('http://localhost:3000/customers')
          .then( res => res.data );
      }
    }
  }
}) 

// Mutation Query
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        })
        .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
