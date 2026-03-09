import { test, expect } from "@playwright/test";
import { TaskService } from "../../services/task";
import { TASK_DETAILS, DUE_DATE, PRIORITY, LABELS } from "../../data/Constants";

test.describe("API - Create Task", async () => {
	let taskService: TaskService;

	let taskId: string = "";

	test.beforeEach(async ({ page }) => {
		taskService = new TaskService(page);
	});

	test.afterEach(async ({ page }) => {
		taskService = new TaskService(page);
		await taskService.deleteTask(taskId);
	});
	test("should be able to create a task via API correctly for today", async () => {
		const task = await taskService.createTaskViaAPI({
			content: TASK_DETAILS.TITLE,
			description: TASK_DETAILS.DESC,
			labels: [LABELS.FOOD, LABELS.SHOPPING],
			priority: PRIORITY.MEDIUM,
			due_date: DUE_DATE.TODAY,
		});
		expect(task).toHaveProperty("id");
		taskId = task.id.toString();
		expect(task.content).toBe(TASK_DETAILS.TITLE);
		expect(task.description).toBe(TASK_DETAILS.DESC);
		expect(task.labels).toEqual(
			expect.arrayContaining([LABELS.FOOD, LABELS.SHOPPING])
		);
		expect(task.priority).toBe(PRIORITY.MEDIUM);
	});
});
