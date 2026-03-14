import { AUTH_TOKEN } from "../data/Constants";
import { TASKS_URL, COMMENTS_URL } from "../data/urls";
import { type Page } from "@playwright/test";
import { type Task } from "../data/Interfaces";
import { type Comment } from "../data/Interfaces";

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
		if (!taskId) {
			throw new Error("Task Id is required to delete a task.");
		}
		await this.page.request.delete(`${TASKS_URL}/${taskId}`, {
			headers: {
				Authorization: `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
	}

	async createTaskViaAPI(options: Task) {
		try {
			const response = await this.page.request.post(`${TASKS_URL}`, {
				headers: {
					Authorization: `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
				data: options,
			});
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			throw new Error(`Error creating task via API: `, { cause: error });
		}
	}

	async getCommentId(content: string) {
		const response = await this.page.waitForResponse(async (resp) => {
			if (!resp.url().includes("api/v1/sync") || resp.status() !== 200) {
				return false;
			}
			const body = await resp.json();
			return body.notes && body.notes.length > 0;
		});

		const responseJson = await response.json();
		const createdComment = responseJson.items.find(
			(item) => item.notes.content === content
		);
		const commentId = createdComment
			? createdComment.notes.id
			: responseJson.notes[0].id;
		return commentId.toString();
	}

	async addCommentViaAPI(comment: Comment) {
		try {
			const response = await this.page.request.post(`${COMMENTS_URL}`, {
				headers: {
					Authorization: `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
				data: comment,
			});
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			throw new Error(`Error adding comment via API: `, { cause: error });
		}
	}
}
