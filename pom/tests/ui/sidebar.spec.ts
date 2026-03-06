import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { SideBar } from "../../components/sidebar.component";
import { Common } from "../../common/common";
import { USER_CREDENTIALS } from "../../data/Constants";
import { TODAY_URL } from "../../data/urls";
import { TaskService } from "../../services/task";
import { TASK_DETAILS } from "../../data/Constants";

test.describe("Sidebar tests", async () => {
	let loginPage: LoginPage;
	let sideBar: SideBar;
	let common: Common;
	let taskService: TaskService;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		sideBar = new SideBar(page);
		common = new Common(page);
		taskService = new TaskService(page);
		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);
		await page.waitForURL(TODAY_URL);
		await sideBar.awaitForVisibleRoot();
	});

	test("TC03 - Create task successfully from sidebar", async () => {
		await expect(sideBar.todayCounter).not.toBeVisible();
		await sideBar.addTaskSidebar.click();
		await common.addTask(TASK_DETAILS.TITLE, TASK_DETAILS.DESC);
		const taskId = await taskService.getTaskId(TASK_DETAILS.TITLE);
		await expect(sideBar.todayCounter).toHaveText("1");
		await taskService.deleteTask(taskId);
	});
});
