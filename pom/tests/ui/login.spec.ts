import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { USER_CREDENTIALS } from "../../data/Constants";

test.describe("Login tests", async () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);
	});

	test("should be able to login correctly", async ({ page }) => {
		await expect(page.getByLabel("Settings")).toBeVisible({ timeout: 50000 });
	});

	test("should display the correct error message for invalid credentials", async () => {
		await expect(loginPage.errorMessage).toBeVisible();
	});
});
