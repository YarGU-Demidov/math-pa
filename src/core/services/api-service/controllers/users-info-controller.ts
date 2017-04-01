import { DataProtocol } from '../data-protocol';
import { UserInfo } from '../../../view-models/user-info';
import { Response } from '@angular/http';
import { MethodArgs } from '../method-args';

export class UserController extends DataProtocol {
	protected controllerName: string = 'UsersInfo';
	
	public getCurrentUser(): Promise<UserInfo> {
		return this.get('GetCurrentUserInfo').then((response: Response) => {
			return <UserInfo> response.json();
		}, (error) => {
			throw new Error(`Can't get current user info. Details: ${error.toString()}`);
		});
	}
	
	public getUsersCount(): Promise<number> {
		return this.get('GetUsersCount').then((response: Response) => {
			const responseData = (<{ result: string, error: string, data: number }> response.json());
			
			if (responseData.result !== 'success') {
				throw new Error(responseData.error);
			}
			
			return responseData.data;
		});
	}
	
	public getUsers(offset, count): Promise<UserInfo> {
		const args = new MethodArgs();
		args.addArg('offset', offset);
		args.addArg('count', count);
		
		return this.get('GetAll', args).then((response: Response) => {
			const responseData = (<{ result: string, error: string, data: UserInfo[] }> response.json());
			
			if (responseData.result !== 'success') {
				throw new Error(responseData.error);
			}
			
			return responseData.data;
		}, (error) => {
			throw new Error(`Can't get users. Details: ${error.toString()}`);
		});
	}
}
