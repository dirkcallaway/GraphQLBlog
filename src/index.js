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
    isPublished: true,
    author: '1'
}, {
    id: '2',
    title: 'Getting Jiggy',
    body: 'Check out my dance moves!',
    isPublished: true,
    author: '1'
}, {
    id: '3',
    title: 'Taking a Udemy Class',
    body: '',
    isPublished: false,
    author: '2'
}]

const comments = [{
    id: 'ab1',
    text: 'Love this post man!  Good stuff!',
    author: '1'
}, {
    id: 'bc2',
    text: 'Nice moves man!',
    author: '1'
}, {
    id: 'cd3',
    text: "I'm learning a lot in this class",
    author: '2'
}, {
    id:'de4',
    text: 'My stomach is upset. :(',
    author: '3'
}]

// Type Definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
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
        },
        comments(parent, arg, ctx, info) {
            return comments
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
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