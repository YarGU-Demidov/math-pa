export interface DataListProvider<T> {
	getCount(): Promise<number>;
	getItems(offset: number, count: number): Promise<T[]>;
}
