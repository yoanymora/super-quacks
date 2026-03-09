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

	async getTaskId(taskTitle: string) {
		const response = await this.page.waitForResponse(async (resp) => {
			if (!resp.url().includes("api/v1/sync") || resp.status() !== 200) {
				return false;
			}
			const body = await resp.json();
			return body.items && body.items.length > 0;
		});

		const responseJson = await response.json();
		const createdTask = responseJson.items.find(
			(item: { content: string }) => item.content === taskTitle
		);
		const taskId = createdTask ? createdTask.id : responseJson.items[0].id;
		return taskId.toString();
	}
}
