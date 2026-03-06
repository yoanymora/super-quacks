import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { USER_CREDENTIALS } from "../data/Constants";
import { TodayPage } from "../pages/today.page";

test.describe("Task Management", async () => {
	let loginPage: LoginPage;
	let todayPage: TodayPage;

	let taskId: string = "";

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		todayPage = new TodayPage(page);
	});

	test.afterEach(async ({ page }) => {
		const todayPage = new TodayPage(page);
		await todayPage.deleteTask(taskId);
	});

	test("should be able to create a task correctly", async ({ page }) => {
		const taskTitle = "Task Name2";
		const taskDesc = "Description2";

		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);

		await todayPage.addTask(taskTitle, taskDesc);

		taskId = await todayPage.getTaskId(taskTitle);

		await expect(page.locator(`[id=task-${taskId}]`)).toBeVisible();
	});
});
