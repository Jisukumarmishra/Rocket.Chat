import type { Db } from 'mongodb';

import { ModerationReportsRaw } from './ModerationReports';

const findOne = jest.fn();

const moderationReports = new ModerationReportsRaw({
	collection: () => ({ findOne, createIndexes: jest.fn().mockResolvedValue(undefined) }),
} as unknown as Db);

describe('ModerationReportsRaw', () => {
	beforeEach(() => {
		findOne.mockReset();
	});

	it('should find a report of a message by the user that is not hidden', async () => {
		await moderationReports.findOneNotHiddenMessageReportByUserId('user-1', { projection: { _id: 1 } });

		expect(findOne).toHaveBeenCalledWith({ 'message.u._id': 'user-1', '_hidden': { $ne: true } }, { projection: { _id: 1 } });
	});

	it('should find a report of the message that is not hidden', async () => {
		await moderationReports.findOneNotHiddenMessageReportByMessageId('msg-1', { projection: { _id: 1 } });

		expect(findOne).toHaveBeenCalledWith({ 'message._id': 'msg-1', '_hidden': { $ne: true } }, { projection: { _id: 1 } });
	});
});
