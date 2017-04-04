export class MethodArgs {
	private args: { [name: string]: string; };

	public constructor() {
		this.args = {};
	}

	public addArg(arg: string, value: string) {
		this.args[arg] = value;
	}

	public getArgsString(): string {
		let params = '';

		let first = true;

		for (const param in this.args) {
			if (this.args.hasOwnProperty(param)) {
				if (!first) {
					params += `&`;
				} else {
					first = false;
				}

				params += `${param}=${encodeURI(this.args[param])}`;
			}
		}

		return params;
	}
}
