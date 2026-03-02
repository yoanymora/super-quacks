import { type Page } from "@playwright/test";
import { Common } from "../common/common";
import { BEARER } from "../data/Constants";

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
		await this.common.addTask(title, desc); //add variables to constants
	}

	async getTaskId(taskTitle:string){
		const response = await this.page.waitForResponse(async (resp) => {
			if (!resp.url().includes('api/v1/sync') || resp.status() !== 200) {
				return false;
			}
			const body = await resp.json();
			return body.items && body.items.length > 0;
		});

		const responseJson = await response.json();
		const createdTask = responseJson.items.find(item => item.content === taskTitle);
		const taskId = createdTask ? createdTask.id : responseJson.items[0].id;
		return taskId.toString(); 
	}

	async deleteTask(taskId: string) {
		await this.page.request.delete(`https://api.todoist.com/api/v1/tasks/${taskId}`, {
			headers: {
			"Authorization": `Bearer `,
			'Content-Type': 'application/json'
			}
		});
	}
}
