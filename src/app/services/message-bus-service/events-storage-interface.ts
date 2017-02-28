import { HandlersStorage } from './handler-storage';
export interface EventsStorage {
	[name: string]: HandlersStorage;
}
