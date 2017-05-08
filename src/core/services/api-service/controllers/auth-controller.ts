import { DataProtocol } from 'core/services/api-service/data-protocol';
import { LogoutResult } from 'core/view-models/logout-result';

export class AuthController extends DataProtocol {
	protected controllerName: string = 'Auth';
	
	public logout(): Promise<LogoutResult> {
		return this.get('Logout').then((data) => {
			return <LogoutResult> data.json();
		}, (error) => {
			throw new Error(`Error with user logout: ${error}`);
		});
	}
}
