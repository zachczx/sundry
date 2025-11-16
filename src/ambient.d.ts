interface TowelDB {
	collectionId: string;
	collectionName: 'towel';
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
	daysToNext: number;
}

interface TowelRecord extends TowelDB {
	gap: number;
}

interface SprayDB {
	collectionId: string;
	collectionName: 'spray';
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
	daysToNext: number;
}

interface SprayRecord extends SprayDB {
	gap: number;
}

interface GummyDB {
	collectionId: string;
	collectionName: 'gummy';
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
	daysToNext: number;
}

interface GummyRecord extends GummyDB {
	gap: number;
}

interface DoggoChewableDB {
	collectionId: string;
	collectionName: 'doggoChewable';
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
	monthsToNext: number;
}

interface DoggoChewableRecord extends DoggoChewableDB {
	gap: number;
}

interface DoggoBathDB {
	collectionId: string;
	collectionName: 'doggoBath';
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
	monthsToNext: number;
}

interface DoggoBathRecord extends DoggoBathDB {
	gap: number;
}

type Characters = 'frankenstein' | 'robot' | 'furnando';

interface UserDB {
	collectionId: string;
	collectionName: 'users';
	id: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	name: string;
	avatar: string;
	sound: boolean;
	towelIntervalDays: number;
	sprayIntervalDays: number;
	gummyIntervalDays: number;
	doggoChewableIntervalMonths: number;
	doggoBathIntervalDays: number;
	created: string;
	updated: string;
}

interface VacationDB {
	collectionId: string;
	collectionName: 'vacation';
	id: string;
	created: string;
	updated: string;
	user: string;
	startDateTime: string;
	endDateTime: string;
}

type IntervalUnit = 'day' | 'month' | 'year';

interface LogsDB {
	collectionId: string;
	collectionName: 'logs';
	id: string;
	user: string;
	tracker: CollectionName;
	interval: number;
	intervalUnit: IntervalUnit;
	time: string;
	oldId?: string | null;
	created: string;
	updated: string;
}

interface LogsRecord extends LogsDB {
	gap: number;
}

interface TrackerDB {
	id: string;
	user: string;
	name: CollectionName;
	display: string;
	interval: number;
	intervalUnit: IntervalUnit;
	created: string;
	updated: string;
}

interface NotificationStatus {
	show: boolean;
	level: 'ok' | 'due' | 'overdue';
	next?: string;
}

type ButtonState = 'default' | 'loading' | 'success' | 'error';

type CollectionName =
	| 'towel'
	| 'spray'
	| 'gummy'
	| 'user'
	| 'bedsheet'
	| 'vacation'
	| 'doggoBath'
	| 'doggoChewable';

// Types/Interfaces for TrackerPage component abstraction

interface TrackerPageOptions {
	collectionName: CollectionName;
	labels: { pageTitle: string; ctaButtonText: string };
	/* queries: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		query: (name: CollectionName) => any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		refetch: (name: CollectionName) => any;
	}; */
	calculateGaps?: (records: LogsDB[], vacations: VacationDB[]) => LogsRecord[];
}

// type Query =
// | CreateQueryResult<SprayDB[], Error>
// | CreateQueryResult<TowelDB[], Error>
// | CreateQueryResult<GummyDB[], Error>
// | CreateQueryResult<DoggoChewableDB[], Error>
// | CreateQueryResult<DoggoBathDB[], Error>;

// type TrackerDB = TowelDB | SprayDB | GummyDB | DoggoBathDB | DoggoChewableDB;
// type TrackerRecord =
// 	| TowelRecord
// 	| SprayRecord
// 	| GummyRecord
// 	| DoggoBathRecord
// 	| DoggoChewableRecord;

// type CollectionsTrackingTime = SprayDB | TowelDB | GummyDB | DoggoChewableDB | DoggoBathDB;

type Collections = LogsDB | VacationDB;

type CalendarRecord = Collections;
