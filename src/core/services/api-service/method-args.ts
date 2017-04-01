export class MethodArgs {
	private args: { [name : string]: string; };
	
	public constructor() {
		this.args = {};
	}
	
	public addArg(arg: string, value: string) {
		this.args[arg] = value;
	}
	
	public getArgsString(): string {
		let params = '';
		
		for (let param in this.args) {
			params += `${param}=${encodeURI(this.args[param])}`;
		}
		
		return params;
	}
}
