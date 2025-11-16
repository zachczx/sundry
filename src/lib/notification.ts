import type { CreateQueryResult } from '@tanstack/svelte-query';
import dayjs from 'dayjs';

export const defaultNotificationStatus: NotificationStatus = {
	show: false,
	level: 'ok'
};

export function getNotificationStatus(
	query: CreateQueryResult<LogsDB, Error> | CreateQueryResult<LogsDB[], Error>
): NotificationStatus {
	if (!query?.isSuccess) return defaultNotificationStatus;

	let lastRecord;

	if (Array.isArray(query.data)) {
		lastRecord = query.data[0] ?? null;
	} else {
		lastRecord = query.data ?? null;
	}

	if (!lastRecord) return defaultNotificationStatus;

	if (lastRecord.intervalUnit === 'month') {
		const nextDate = dayjs(lastRecord.time).add(lastRecord.interval, 'month');
		const daysTillNextDate = nextDate.diff(dayjs(), 'day', true);

		if (daysTillNextDate > 1) {
			return { ...defaultNotificationStatus, next: nextDate.toString() };
		} else if (daysTillNextDate <= 1 && daysTillNextDate > 0) {
			return { show: true, level: 'due', next: nextDate.toString() };
		} else {
			return { show: true, level: 'overdue', next: nextDate.toString() };
		}
	} else {
		const now = dayjs();
		const leadTimeHours = 6;

		const intervalHours = lastRecord.interval * 24;

		const nextDate = dayjs(lastRecord.time).add(lastRecord.interval, 'day');

		const hoursSinceLastRecord = now.diff(dayjs(lastRecord.time), 'hour', true);
		if (hoursSinceLastRecord >= intervalHours - leadTimeHours) {
			const overdue = hoursSinceLastRecord > intervalHours;
			return {
				show: true,
				level: overdue ? 'overdue' : 'due',
				next: nextDate.toString()
			};
		}

		return { ...defaultNotificationStatus, next: nextDate.toString() };
	}
}

export function getNotificationCount(
	sprayNotification: NotificationStatus,
	towelNotification: NotificationStatus,
	gummyNotification: NotificationStatus
): number {
	let count = 0;

	if (sprayNotification.show) {
		count += 1;
	}

	if (towelNotification.show) {
		count += 1;
	}

	if (gummyNotification.show) {
		count += 1;
	}

	return count;
}
