import type { Db } from 'mongodb';

import { CronHistoryRaw } from './CronHistoryModel';

const updateOne = jest.fn();

const cronHistory = new CronHistoryRaw({
	collection: () => ({ updateOne, createIndexes: jest.fn().mockResolvedValue(undefined) }),
} as unknown as Db);

const finishedAt = new Date('2026-11-24T10:00:00.000Z');

describe('CronHistoryRaw', () => {
	beforeEach(() => {
		updateOne.mockReset();
	});

	it('should record the result of a finished run', async () => {
		await cronHistory.setResultById('run-1', finishedAt, { removed: 3 });

		expect(updateOne).toHaveBeenCalledWith(
			{ _id: 'run-1' },
			{ $set: { finishedAt, result: { removed: 3 }, _updatedAt: expect.any(Date) } },
		);
	});

	it('should record the error of a failed run', async () => {
		await cronHistory.setErrorById('run-1', finishedAt, 'Error: boom');

		expect(updateOne).toHaveBeenCalledWith({ _id: 'run-1' }, { $set: { finishedAt, error: 'Error: boom', _updatedAt: expect.any(Date) } });
	});
});
