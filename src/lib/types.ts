import { Collection, ObjectId } from 'mongodb'

export interface Viewer {
	_id?: string;
	token?: string;
	avatar?: string;
	walletId?: string;
	didRequest: boolean;
}

export interface MoodsIndexMonth {
	[key: string]: number;
}

export interface MoodsIndexYear {
	[key: string]: MoodsIndexMonth;
}

export interface MoodsIndex {
	[key: string]: MoodsIndexYear;
}

export enum EntityType {
	Active = "ACTIVE",
	Passive = "PASSIVE"
}

export interface Entity {
	_id: ObjectId;
	name: string;
	image: string;
	incom?: number;
	expense?: number;
	cost?: number;
	type: EntityType;
	hours?: number;
	count: number;
	host: string;
}

export interface User {
	_id: string;
	token: string;
	name: string;
	avatar: string;
	email: string;
	cash?: number;
	availableHours?: number;
	//createDate: string;
	walletId?: string;
	entities: ObjectId[];
	moodsIndex: MoodsIndex;
	authorized?: boolean;
}

export interface Mood {
	_id: ObjectId;
	user: string;
}
export interface Database {
	entities: Collection<Entity>;
	moods: Collection<Mood>;
	users: Collection<User>;
}
