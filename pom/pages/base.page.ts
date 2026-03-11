import { type Page } from "@playwright/test";
import { Common } from "../common/common";

export abstract class BasePage {
	protected readonly page: Page;
	protected readonly common: Common;

	constructor(page: Page) {
		this.page = page;
		this.common = new Common(this.page);
	}

	async goto(url: string) {
		await this.page.goto(url);
	}

	async addTask(title: string, desc: string) {
		await this.common.addTask(title, desc);
	}
}
