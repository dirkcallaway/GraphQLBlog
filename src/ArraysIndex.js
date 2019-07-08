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
        greeting(name: String): String!
        me: User!
        post: Post!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: 'abc123',
                name: 'Matt',
                email: 'matt@mail.com',
            }
        },
        post() {
            return {
                id: 'postID123',
                title: "My Newest Post!",
                body: "I just learned to make custom types in GraphQL",
                isPublished: true
            }
        },
        greeting(parent, args, ctx, info) {
            if(args.name) {
                return `Hello, ${args.name}!`
            } else {
                return 'Hello!'
            }
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            }
            
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            })
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93]
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