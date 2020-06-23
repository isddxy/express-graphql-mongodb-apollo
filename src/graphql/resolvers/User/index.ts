import { IResolvers } from 'apollo-server-express'
import { Request } from 'express'
import { Database, User, MoodsIndex } from '../../../lib/types'
import { authorize } from '../../../lib/utils'
import { UserArgs, UserEntintyArgs, UserEntitiesData, UserMoodArgs, UserMoodsData } from './types'

export const userResolvers: IResolvers = {
	Query: {
		user: async (
			_root: undefined,
			{ id }: UserArgs,
			{ db, req }: { db: Database; req: Request }
		): Promise<User> => {
			try {
				const user = await db.users.findOne({ _id: id })

				if (!user) {
					throw new Error("user can't be found")
				}

				const viewer = await authorize(db, req)

				if (viewer && viewer._id === user._id) {
					user.authorized = true
				}

				return user
			} catch (error) {
				throw new Error(`Failed to query user: ${error}`)
			}
		}
	},
	User: {
		id: (user: User): string => {
			return user._id
		},
		hasWallet: (user: User): boolean => {
			return Boolean(user.walletId)
		},
		name: (user: User): string => {
			return user.name
		},
		avatar: (user: User): string => {
			return user.avatar
		},
		email: (user: User): string | null => {
			return user.authorized ? user.email : null
		},
		availableHours: (user: User): number | undefined => {
			return user.availableHours
		},
		cash: (user: User): number | undefined => {
			return user.authorized ? user.cash : undefined
		},
		entities: async (
			user: User,
			{ limit, page }: UserEntintyArgs,
			{ db }: { db: Database }
		): Promise<UserEntitiesData | null> => {
			try {
				if (!user.authorized) {
					return null
				}

				const data: UserEntitiesData = {
					total: 0,
					result: []
				}

				let cursor = await db.entities.find({
					_id: { $in: user.entities }
				})

				cursor.skip(page > 0 ? (page - 1) * limit : 0)
				// page = 1; limit = 10; cursor starts at 0
				// page = 2; limit 10; cursor starts at 10
				cursor = cursor.limit(limit)

				data.total = await cursor.count()
				data.result = await cursor.toArray()

				return data
			} catch (error) {
				throw new Error(`Failed to query user bookings: ${error}`)
			}
        },
        // moodsIndex: async (
		// 	user: User,
		// 	{ limit, page }: UserMoodArgs,
		// 	{ db }: { db: Database }
		// ): Promise<UserMoodsData | null> => {
		// 	try {
		// 		if (!user.authorized) {
		// 			return null
		// 		}

		// 		const data: UserMoodsData = {
		// 			total: 0,
		// 			result: []
		// 		}

		// 		let cursor = await db.moods.find({
		// 			_id: { $in: user.moodsIndex }
		// 		})

		// 		cursor.skip(page > 0 ? (page - 1) * limit : 0)
		// 		// page = 1; limit = 10; cursor starts at 0
		// 		// page = 2; limit 10; cursor starts at 10
		// 		cursor = cursor.limit(limit)

		// 		data.total = await cursor.count()
		// 		data.result = await cursor.toArray()

		// 		return data
		// 	} catch (error) {
		// 		throw new Error(`Failed to query user bookings: ${error}`)
		// 	}
		// },
		// moodsIndex: (user: User) => {}
	}
}
