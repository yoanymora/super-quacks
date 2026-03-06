
import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/login.page";
import {SideBar} from "../pages/sideBar.page";
import {TaskEditor} from "../pages/taskEditor.page";
import {Common} from "../pages/common.page";
import {LOGIN_URL, USER_CREDENTIALS} from "../data/constants";

test.describe("Sidebar tests", () => {
    test("TC03 - Create task successfully from sidebar", async ({page}) => {
        const loginPage = new LoginPage(page);
        const sideBar = new SideBar(page);
        const taskEditor = new TaskEditor(page);
        const common = new Common(page);
        await loginPage.goto(LOGIN_URL);
        await loginPage.login(USER_CREDENTIALS.STANDARD_USER, USER_CREDENTIALS.PASSWORD);
        await expect(sideBar.todayButton.locator("span[data-project-actions='true']").getByText('', {exact: true})).toBeTruthy();
        await sideBar.addTaskSidebar.click();
        await common.addTask('Dummy', 'Dummy');
        await expect(sideBar.todayButton.locator("span[data-project-actions='true']").getByText('1', {exact: true})).toBeTruthy();
    });
});
