import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { USER_CREDENTIALS } from "../data/Constants";
import { TodayPage } from "../pages/today.page";
import { TASK_DETAILS } from "../data/Constants";

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
		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);

		await todayPage.addTask(TASK_DETAILS.TITLE, TASK_DETAILS.DESC);

		taskId = await todayPage.getTaskId(TASK_DETAILS.TITLE);

		await expect(page.locator(`[id=task-${taskId}]`)).toBeVisible();
	});
});
