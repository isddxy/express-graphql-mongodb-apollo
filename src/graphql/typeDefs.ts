import { gql } from 'apollo-server-express'

export const typeDefs = gql`
	type Viewer {
		id: ID
		token: String
		avatar: String
		hasWallet: Boolean
		didRequest: Boolean!
	}

	type User {
		id: ID!
		name: String!
		avatar: String!
		email: String!
		hasWallet: Boolean!
		cash: Float
		availableHours: Int
		entities(limit: Int!, page: Int!): Entities
		moodsIndex: String!
	}

	type Entities {
		total: Int!
		result: [Entity!]!
	}

	type Moods {
		total: Int!
		result: [Mood!]!
	}

	type Entity {
		id: ID!
		name: String!
		image: String!
		incom: Float
		expense: Float
		cost: Float
		type: EntityType!
		hours: Int
		count: Int!
		host: User!
	}

	enum EntityType {
		ACTIVE
		PASSIVE
	}

	type Mood {
		id: ID!
		host: User!
	}

	input LogInInput {
		code: String!
	}

	type Query {
		authUrl: String!
		user(id: ID!): User!
	}

	type Mutation {
		logIn(input: LogInInput): Viewer!
		logOut: Viewer!
	}
`
