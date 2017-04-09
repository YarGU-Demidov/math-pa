import { LogoutResult } from '../../../view-models/logout-result';
import { DataProtocol } from '../data-protocol';

export class AuthController extends DataProtocol {
	protected controllerName: string = "Auth";
	
	public logout(): Promise<LogoutResult> {
		return this.get('Logout').then((data) => {
			return <LogoutResult> data.json();
		}, (error) => {
			throw new Error(`Error with user logout: ${error}`);
		});
	}
}
