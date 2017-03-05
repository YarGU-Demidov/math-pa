import { DbSet } from "../db-set";
import { UserInfo } from "../../../view-models/user-info";
import "rxjs/add/operator/toPromise";
import { Response, Headers, RequestMethod } from "@angular/http";

export class UserInfoRetriever extends DbSet<UserInfo> {
	protected urlPath: string = "UsersInfo";

	public getCurrentUser(): Promise<UserInfo> {
		return this.http.get(`${this.getFullUrl()}/GetCurrentUserInfo`, { withCredentials: true }).toPromise().then((response: Response) => {
			return <UserInfo> response.json();
		}, (error) => {
			throw new Error(`Can't get current user info. Details: ${error.toString()}`);
		});
	}
}
