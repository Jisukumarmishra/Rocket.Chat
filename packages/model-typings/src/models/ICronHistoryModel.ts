import type { ICronHistoryItem } from '@rocket.chat/core-typings';
import type { UpdateResult } from 'mongodb';

import type { IBaseModel } from './IBaseModel';

export interface ICronHistoryModel extends IBaseModel<ICronHistoryItem> {
	setResultById(_id: ICronHistoryItem['_id'], finishedAt: Date, result: ICronHistoryItem['result']): Promise<UpdateResult>;
	setErrorById(_id: ICronHistoryItem['_id'], finishedAt: Date, error: ICronHistoryItem['error']): Promise<UpdateResult>;
}
