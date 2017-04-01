import { OsType } from "./os-type";

//some code from: https://github.com/JDMcKinstry/navigator-extensions

export class BrowserInfo {
	public name: string;
	public version: string;
	public isMobile: boolean;
	public osType: OsType;
	
	public static parse(userAgent: string): BrowserInfo {
		let browserInfo      = new BrowserInfo();
		browserInfo.name     = BrowserInfo.getBrowser(userAgent);
		browserInfo.version  = BrowserInfo.getVersion(userAgent).toString();
		browserInfo.isMobile = BrowserInfo.getMobile(userAgent) !== 'Unknown';
		browserInfo.osType   = BrowserInfo.getOS(userAgent);
		
		return browserInfo;
	}
	
	private static getBrowser(userAgent: string): string {
		try {
			switch (true) {
				case (/MSIE|Trident/i.test(userAgent)):
					return 'MSIE';
				case (/Chrome/.test(userAgent)):
					return 'Chrome';
				case (/Opera/.test(userAgent)):
					return 'Opera';
				case (/Kindle|Silk|KFTT|KFOT|KFJWA|KFJWI|KFSOWI|KFTHWA|KFTHWI|KFAPWA|KFAPWI/i.test(userAgent)):
					return (/Silk/i.test(userAgent)) ? 'Silk' : 'Kindle';
				case (/BlackBerry/.test(userAgent)):
					return 'BlackBerry';
				case (/PlayBook/.test(userAgent)):
					return 'PlayBook';
				case (/BB[0-9]{1,}; Touch/.test(userAgent)):
					return 'Blackberry';
				case (/Android/.test(userAgent)):
					return 'Android';
				case (/Safari/.test(userAgent)):
					return 'Safari';
				case (/Firefox/.test(userAgent)):
					return 'Mozilla';
				case (/Nokia/.test(userAgent)):
					return 'Nokia';
			}
		}
		catch (err) {
			console.debug("ERROR:getBrowser\t", err);
		}
		return 'Unknown';
	}
	
	private static getMobile(userAgent: string): string {
		try {
			switch (true) {
				case (/Sony[^ ]*/i.test(userAgent)):
					return 'Sony';
				case (/RIM Tablet/i.test(userAgent)):
					return 'RIM Tablet';
				case (/BlackBerry/i.test(userAgent)):
					return 'BlackBerry';
				case (/iPhone/i.test(userAgent)):
					return 'iPhone';
				case (/iPad/i.test(userAgent)):
					return 'iPad';
				case (/iPod/i.test(userAgent)):
					return 'iPod';
				case (/Opera Mini/i.test(userAgent)):
					return 'Opera Mini';
				case (/IEMobile/i.test(userAgent)):
					return 'IEMobile';
				case (/BB[0-9]{1,}; Touch/i.test(userAgent)):
					return 'BlackBerry';
				case (/Nokia/i.test(userAgent)):
					return 'Nokia';
				case (/Android/i.test(userAgent)):
					return 'Android';
				case (/Tablet/i.test(userAgent)):
					return 'Tablet';
				case (/Phone/i.test(userAgent)):
					return 'Phone';
				case (/Mobile/i.test(userAgent)):
					return 'Mobile';
				case (/iOS/i.test(userAgent)):
					return 'iOS';
			}
		}
		catch (err) {
			console.debug("ERROR:getMobile\t", err);
		}
		return 'Unknown';
	}
	
	private static getVersion(userAgent: string): number|string {
		try {
			switch (true) {
				case (/MSIE|Trident/i.test(userAgent)):
					if (/Trident/i.test(userAgent) && /rv:([0-9]{1,}[\.0-9]{0,})/.test(userAgent))
						return parseFloat(userAgent.match(/rv:([0-9]{1,}[\.0-9]{0,})/)[1].replace(/[^0-9\.]/g, ''));
					
					return (/MSIE/i.test(userAgent) && parseFloat(userAgent.split("MSIE")[1].replace(/[^0-9\.]/g, '')) > 0)
						? parseFloat(userAgent.split("MSIE")[1].replace(/[^0-9\.]/g, ''))
						: "Edge";
				case (/Chrome/.test(userAgent)):
					return parseFloat(userAgent.split("Chrome/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				case (/Opera/.test(userAgent)):
					return parseFloat(userAgent.split("Version/")[1].replace(/[^0-9\.]/g, ''));
				case (/Kindle|Silk|KFTT|KFOT|KFJWA|KFJWI|KFSOWI|KFTHWA|KFTHWI|KFAPWA|KFAPWI/i.test(userAgent)):
					if (/Silk/i.test(userAgent))
						return parseFloat(userAgent.split("Silk/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
					else if (/Kindle/i.test(userAgent) && /Version/i.test(userAgent))
						return parseFloat(userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				case (/BlackBerry/.test(userAgent)):
					return parseFloat(userAgent.split("/")[1].replace(/[^0-9\.]/g, ''));
				case (/PlayBook/.test(userAgent)):
				case (/BB[0-9]{1,}; Touch/.test(userAgent)):
				case (/Safari/.test(userAgent)):
					return parseFloat(userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				case (/Firefox/.test(userAgent)):
					return parseFloat(userAgent.split(/Firefox\//i)[1].replace(/[^0-9\.]/g, ''));
				case (/Android/.test(userAgent)):
					return parseFloat(userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				case (/Nokia/.test(userAgent)):
					return parseFloat(userAgent.split('Browser')[1].replace(/[^0-9\.]/g, ''));
			}
		}
		catch (err) {
			console.debug("ERROR:getVersion\t", err);
		}
		return -1;
	}
	
	private static getOS(userAgent: string): OsType {
		switch (true) {
			case /(windows nt 5\.1)|(windows xp)/i.test(userAgent):
			case /windows nt 6\.0/i.test(userAgent):
			case /windows nt 6\.1/i.test(userAgent):
			case /windows nt 6\.2/i.test(userAgent):
			case /windows nt 10\.0/i.test(userAgent):
				return OsType.windows;
			case /Android/i.test(userAgent):
				return OsType.android;
			case /(iPhone)|(iPad)|(iPod)/i.test(userAgent):
				return OsType.iOS;
			case /(linux)|(x11)/i.test(userAgent):
				return OsType.linuxBased;
			case /(mac_powerpc)|(macintosh)|(mac)/i.test(userAgent):
				return OsType.macOS;
			default:
				return OsType.unknown;
		}
	}
	
	public getWidth(): number {
		const body = document.body;
		const html = document.documentElement;
		
		return Math.max(body.scrollWidth, body.offsetWidth, body.getBoundingClientRect().width, html.clientWidth, html.scrollWidth, html.offsetWidth);
	}
	
	public getHeight(): number {
		const body = document.body;
		const html = document.documentElement;
		
		return Math.max(body.scrollHeight, body.offsetHeight, body.getBoundingClientRect().height, html.clientHeight, html.scrollHeight, html.offsetHeight);
	}
}
