import { MongoClient } from 'mongodb'
import { Database, User, Mood, Entity } from '../lib/types'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env
	.DB_CLUSTER}.gcp.mongodb.net/test?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

	const db = client.db('main')

	return {
		entities: db.collection<Entity>('entities'),
		moods: db.collection<Mood>('moods'),
		users: db.collection<User>('users')
	}
}
