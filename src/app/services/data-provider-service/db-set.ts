import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

export abstract class DbSet<T> {
	protected abstract urlPath: string;

	protected http: Http;
	private apiUrl: string;

	public constructor(apiUrl: string, http: Http) {
		this.apiUrl = apiUrl;
		this.http   = http;
	}

	protected getFullUrl(): string {
		return `${this.apiUrl}/${this.urlPath}`;
	}

	public getAll(offset: number = 0, count: number = 50): Promise<Array<T>> {
		return this.http.get(`${this.getFullUrl()}/GetAll?offset=${parseInt(offset.toString())}&count=${parseInt(count.toString())}`, { withCredentials: true }).toPromise().then((response: Response) => {
			return <Array<T>>response.json();
		}, (error) => {
			throw new Error(`Can't download data: ${error.toString()}`);
		});
	}

	public saveAll(data: Array<T>): Promise<boolean> {
		return this.http.put(this.getFullUrl(), JSON.stringify(data), { withCredentials: true }).toPromise().then((response: Response) => {
			return response.ok;
		}, (error) => {
			throw new Error(`Can't save data: ${error.toString()}`);
		});
	}
}
