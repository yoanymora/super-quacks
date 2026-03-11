import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { USER_CREDENTIALS } from "../../data/Constants";
import { TodayPage } from "../../pages/today.page";
import { TASK_DETAILS } from "../../data/Constants";
import { TaskService } from "../../services/task";
import { type Task } from "../../data/Interfaces";
import { TODAY_URL } from "../../data/urls";
import { DUE_DATE } from "../../data/Constants";
import { DeleteModalComponent } from "../../components/deleteModal.component";
import { TaskCardComponent } from "../../components/taskCard.component";

test.describe("Task Management", async () => {
	let loginPage: LoginPage;
	let todayPage: TodayPage;
	let taskService: TaskService;
	let taskId: string = "";
	let deleteModalComponent: DeleteModalComponent;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		todayPage = new TodayPage(page);
		taskService = new TaskService(page);
		deleteModalComponent = new DeleteModalComponent(page);

		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);
		await page.waitForURL(TODAY_URL);
		await todayPage.awaitForVisibleRoot();
	});

	test.afterEach(async ({ page }) => {
		taskService = new TaskService(page);
		await taskService.deleteTask(taskId);
	});

	test("should be able to create a task correctly", async ({ page }) => {
		await todayPage.addTask(TASK_DETAILS.TITLE, TASK_DETAILS.DESC);

		taskId = await taskService.getTaskId(TASK_DETAILS.TITLE);

		await expect(page.locator(`[id=task-${taskId}]`)).toBeVisible();
	});

	test("TC04 - Delete task successfully", async ({ page }) => {
		const taskInfo: Task = {
			content: TASK_DETAILS.TITLE,
			due_string: DUE_DATE.TODAY,
		};
		await taskService.createTaskViaAPI(taskInfo);
		taskId = await taskService.getTaskId(taskInfo.content);
		const taskCardComponent = new TaskCardComponent(page, taskId);
		const taskCard = taskCardComponent.taskCardRoot;
		await expect(taskCard).toBeVisible();
		await taskCardComponent.deleteTaskFromMenu();
		await deleteModalComponent.confirmDelete();
		await expect(taskCard).not.toBeVisible();
	});
});
