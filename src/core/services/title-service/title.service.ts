import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
	private title: Title;
	
	private POSTFIX = ' | Математический факультет ЯрГУ';

	public constructor(titleSrv: Title) {
		this.title = titleSrv;
	}

	/**
	 * Set the title of the current HTML document.
	 * @param newTitle
	 */
	public setTitle(newTitle: string): void {
		this.title.setTitle(newTitle + this.POSTFIX);
	}

	/**
	 * Get the title of the current HTML document.
	 * @returns {string}
	 */
	public getTitle(): string {
		return this.title.getTitle();
	}
}
