import { GraphQLServer } from 'graphql-yoga';
import { isNull } from 'util';

// Scalar Types - Stores a single value
// String - String based data
// Boolean - True/False
// Int - Integer or whole numbers
// Float - Decimals
// ID - Unique Identifiers

// Type Definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        title() {
            return 'Trek Bike'
        },
        price() {
            return 3.55
        },
        releaseYear() {
            return 2007
        },
        rating() {
            return 4.2
        },
        inStock() {
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
})