import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

export abstract class DbSet<T> {
	protected abstract urlPath: string;

	private http: Http;
	private apiUrl: string;

	public constructor(apiUrl: string, http: Http) {
		this.apiUrl = apiUrl;
		this.http   = http;
	}

	protected getFullUrl(): string {
		return `${this.apiUrl}/${this.urlPath}`;
	}

	public getAll(): Promise<Array<T>> {
		return this.http.get(this.getFullUrl()).toPromise().then((response: Response) => {
			return <Array<T>>response.json();
		}, (error) => {
			throw new Error(`Error with downloading data: ${error.toString()}`);
		});
	}

	public saveAll(data: Array<T>): Promise<boolean> {
		return this.http.put(this.getFullUrl(), JSON.stringify(data)).toPromise().then((response: Response) => {
			return response.ok;
		}, (error) => {
			throw new Error(`Error with saving data: ${error.toString()}`);
		});
	}
}
