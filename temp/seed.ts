require('dotenv').config()

import { connectDatabase } from '../src/database'
import { User, Entity, EntityType } from '../src/lib/types'
import { ObjectId } from 'mongodb'

const entities: Entity[] = [
	{
		_id: new ObjectId('5d378db94e84753160e08b30'),
		name: 'Машина Mitsubishi Outlander б/у 2012',
		image: 'https://autodrop.ru/uploads/1335605520_outlander-2012.jpg',
		expense: 4500,
		cost: 750000,
		type: EntityType.Passive,
		count: 1,
		host: '5d378db94e84753160e08b57'
	},
	{
		_id: new ObjectId('5d378db94e84753160e08b31'),
		name: 'Квартира для детей',
		image:
			'https://icdn.lenta.ru/images/2020/02/25/10/20200225103905001/square_320_6f73aa54c8619786aab7de7126a43433.jpg',
		expense: 6450,
		cost: 7500300,
		type: EntityType.Passive,
		count: 1,
		host: '5d378db94e84753160e08b57'
	},
	{
		_id: new ObjectId('5d378db94e84753160e08b32'),
		name: 'Работа водителем камаза',
		image: 'https://62.img.avito.st/640x480/5412958862.jpg',
		incom: 46921,
		type: EntityType.Active,
		hours: 163,
		count: 1,
		host: '5d378db94e84753160e08b57'
	},
	{
		_id: new ObjectId('5d378db94e84753160e08b33'),
		name: 'Акции СберБанка',
		image: 'https://rkoff.ru/wp-content/uploads/2019/05/rko_sberbank.png',
		incom: 18,
		cost: 191,
		type: EntityType.Active,
		count: 10,
		host: '5d378db94e84753160e08b58'
    },
    {
		_id: new ObjectId('5d378db94e84753160e08b34'),
		name: 'Работа на фрилансе',
		image: 'https://bizzapps.ru/wp-content/uploads/sites/24/2020/04/1018.jpg',
		incom: 32613,
		type: EntityType.Active,
		hours: 60,
		count: 1,
		host: '5d378db94e84753160e08b58'
    },
    {
		_id: new ObjectId('5d378db94e84753160e08b35'),
		name: 'Мобильная связь TELE2',
		image: 'https://retail-loyalty.org/upload/medialibrary/3f9/1553612445_4998_2000.jpg',
		expense: 445,
		type: EntityType.Passive,
		count: 1,
		host: '5d378db94e84753160e08b58'
	}
]
const users: User[] = [
	{
		_id: '5d378db94e84753160e08b57',
		token: 'token_************',
		name: 'Миляев Юрий Сергеевич',
		avatar:
			'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg',
		cash: 15623,
		availableHours: 169,
		walletId: 'acct_************',
		entities: [ new ObjectId('5d378db94e84753160e08b30'), new ObjectId('5d378db94e84753160e08b31'), new ObjectId('5d378db94e84753160e08b32') ],
		moodsIndex: {}
	},
	{
		_id: '5d378db94e84753160e08b58',
		token: 'token_************',
		name: 'Миляев Антон Юрьевич',
		avatar: 'https://sun9-14.userapi.com/c841631/v841631946/20a73/Uol8v_-dvIA.jpg',
		cash: 12030,
		availableHours: 225,
		walletId: 'acct_************',
		entities: [ new ObjectId('5d378db94e84753160e08b33'), new ObjectId('5d378db94e84753160e08b34'), new ObjectId('5d378db94e84753160e08b35') ],
		moodsIndex: {}
	}
]

const seed = async () => {
	try {
		console.log('[seed] : running...')
		const db = await connectDatabase()

		for (const entity of entities) {
			await db.entities.insertOne(entity)
        }
        
        for (const user of users) {
			await db.users.insertOne(user)
		}

		console.log('[seed] : successfull')
	} catch (error) {
		throw new Error('failed to seed database')
	}
}

seed()
