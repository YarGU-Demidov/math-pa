import { HandlersStorage } from 'core/services/message-bus-service/handler-storage';

export interface EventsStorage {
	[name: string]: HandlersStorage;
}
