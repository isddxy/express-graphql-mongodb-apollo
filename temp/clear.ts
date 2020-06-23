require('dotenv').config()

import { connectDatabase } from '../src/database'

const clear = async () => {
	try {
		console.log('[clear] : running...')
        const db = await connectDatabase()
        
        const moods = await db.moods.find({}).toArray()
        const entities = await db.entities.find({}).toArray()
        const users = await db.users.find({}).toArray()

        if (moods.length > 0) {
            await db.moods.drop()
        }
        if (entities.length > 0) {
            await db.entities.drop()
        }
        if (users.length > 0) {
            await db.users.drop()
        }

		console.log('[clear] : successfull')
	} catch (error) {
		throw new Error('failed to clear database')
	}
}

clear()
