import { Entity, Mood } from './../../../lib/types';
export interface UserArgs {
	id: string;
}

export interface UserEntintyArgs {
    limit: number;
    page: number;
}

export interface UserEntitiesData {
    total: number;
    result: Entity[];
}

export interface UserMoodArgs {
    limit: number;
    page: number;
}

export interface UserMoodsData {
    total: number;
    result: Mood[];
}