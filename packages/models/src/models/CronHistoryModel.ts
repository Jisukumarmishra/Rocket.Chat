import type { ICronHistoryItem } from '@rocket.chat/core-typings';
import type { ICronHistoryModel } from '@rocket.chat/model-typings';
import type { Db, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CronHistoryRaw extends BaseRaw<ICronHistoryItem> implements ICronHistoryModel {
	constructor(db: Db) {
		super(db, 'cron_history');
	}

	protected override modelIndexes(): IndexDescription[] {
		return [{ key: { intendedAt: 1, name: 1 }, unique: true }];
	}

	setResultById(_id: ICronHistoryItem['_id'], finishedAt: Date, result: ICronHistoryItem['result']): Promise<UpdateResult> {
		return this.updateOne({ _id }, { $set: { finishedAt, result } });
	}

	setErrorById(_id: ICronHistoryItem['_id'], finishedAt: Date, error: ICronHistoryItem['error']): Promise<UpdateResult> {
		return this.updateOne({ _id }, { $set: { finishedAt, error } });
	}
}
