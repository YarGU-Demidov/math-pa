import { DataProtocol } from "../data-protocol";
import { UserInfo } from "../../../view-models/user-info";
import { Response } from "@angular/http";

export class UserController extends DataProtocol {
	protected controllerName: string = "UsersInfo";

	public getCurrentUser(): Promise<UserInfo> {
		return this.get('GetCurrentUserInfo').then((response: Response) => {
			return <UserInfo> response.json();
		}, (error) => {
			throw new Error(`Can't get current user info. Details: ${error.toString()}`);
		});
	}
}
