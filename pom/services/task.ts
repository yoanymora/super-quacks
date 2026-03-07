import { AUTH_TOKEN } from "../data/Constants";
import { TASKS_URL } from "../data/urls";
import { type Page } from "@playwright/test";
import { type TaskOptions } from "../data/Interfaces";

export class TaskService {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
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
			(item) => item.content === taskTitle
		);
		const taskId = createdTask ? createdTask.id : responseJson.items[0].id;
		return taskId.toString();
	}

	async deleteTask(taskId: string) {
		await this.page.request.delete(`${TASKS_URL}/${taskId}`, {
			headers: {
				Authorization: `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
	}

	async createTaskViaAPI(options: TaskOptions) {
		const taskData = {
			content: options.title,
			description: options.desc,
			project_id: options.projectId,
			section_id: options.sectionId,
			parent_id: options.parentId,
			order: options.order,
			labels: options.labels,
			priority: options.priority,
			assignee_id: options.assigneeId,
			due_string: options.dueString,
			due_date: options.dueDate,
			due_datetime: options.dueDatetime,
			due_lang: options.dueLang,
		};

		const response = await this.page.request.post(`${TASKS_URL}`, {
			headers: {
				Authorization: `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`,
				"Content-Type": "application/json",
			},
			data: taskData,
		});
		if (!response.ok()) {
			throw new Error(
				`Failed to create task via API: ${response.status()} ${response.statusText()}`
			);
		}
		const responseData = await response.json();
		return responseData;
	}
}
