import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { Common } from "../common/common";

export class TodayPage extends BasePage {
	readonly titleDate: Locator;
	readonly taskCounter: Locator;
	readonly addTaskButton: Locator;
	readonly common: Common;

	constructor(page: Page) {
		super(page);
		this.titleDate = page.locator("span[class=simple_content]");
		this.taskCounter = page.locator("p[class=board_section__task_count]");
		this.addTaskButton = page.locator("button[class=plus_add_button]");
		this.common = new Common(page);
	}

	async addTask(title: string, desc: string) {
		await this.addTaskButton.click();
		await super.addTask(title, desc);
	}
}
