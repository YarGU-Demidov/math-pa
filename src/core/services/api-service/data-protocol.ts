import { Http } from '@angular/http';
import { MethodArgs } from './method-args';

export abstract class DataProtocol {
	protected abstract controllerName: string;
	
	private http: Http;
	private apiUrl: string;
	
	public constructor(apiUrl: string, http: Http) {
		this.apiUrl = apiUrl;
		this.http   = http;
	}
	
	private getUrlPartial(): string {
		return `${this.apiUrl}/${this.controllerName}`;
	}
	
	protected buildUrl(methodName: string, args: MethodArgs): string {
		const argsStr = args.getArgsString();
		
		let url = `${this.getUrlPartial()}/${methodName}`;
		
		if ( argsStr ) {
			url += `?${argsStr}`;
		}
		
		return url;
	}
	
	protected get(methodName: string, args: MethodArgs = new MethodArgs(), postRequire: boolean = false, data: Object = null): Promise<any> {
		const builtUrl = this.buildUrl(methodName, args);
		
		return postRequire
			? this.http.post(builtUrl, data, { withCredentials: true }).toPromise()
			: this.http.get(builtUrl, { withCredentials: true }).toPromise();
	}
	
	protected set(methodName: string, args: MethodArgs): Promise<any> {
		return this.http.post(this.buildUrl(methodName, args), { withCredentials: true }).toPromise();
	}
	
	protected update(methodName: string, args: MethodArgs): Promise<any> {
		return this.http.patch(this.buildUrl(methodName, args), { withCredentials: true }).toPromise();
	}
	
	protected delete(methodName: string, args: MethodArgs): Promise<any> {
		return this.http.delete(this.buildUrl(methodName, args), { withCredentials: true }).toPromise();
	}
}
