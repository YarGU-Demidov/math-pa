import { Injectable } from "@angular/core";
import { BrowserInfo } from "./browser-info";

@Injectable()
export class BrowserInfoService {

	private browserInfo: BrowserInfo;

	public constructor() {
		this.browserInfo = BrowserInfo.parse(navigator.userAgent);
	}

	public getBrowserInfo(): BrowserInfo {
		return this.browserInfo;
	}
}
