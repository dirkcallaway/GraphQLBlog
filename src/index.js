import { GraphQLServer } from 'graphql-yoga';
import { isNull } from 'util';

// Scalar Types - Stores a single value
// String - String based data
// Boolean - True/False
// Int - Integer or whole numbers
// Float - Decimals
// ID - Unique Identifiers

// Demo User Data
const users = [{
    id: '1',
    name: 'Matt',
    email: 'matt@mail.com',
    age: 36
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@mail.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@mail.com'
}]

const posts = [{
    id: '1',
    title: 'New Car!',
    body: 'I just bought a new car!',
    isPublished: true
}, {
    id: '2',
    title: 'Getting Jiggy',
    body: 'Check out my dance moves!',
    isPublished: true
}, {
    id: '3',
    title: 'Taking a Udemy Class',
    body: '',
    isPublished: false
}]

// Type Definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
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
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            } 

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return (posts.filter((post) => {
                if(post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())){
                    return post
                }
            }))
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