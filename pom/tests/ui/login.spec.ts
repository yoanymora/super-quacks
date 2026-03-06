import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { USER_CREDENTIALS } from "../../data/Constants";
import { LOGIN_URL } from "../../data/urls";

test.skip("should be able to login correctly", async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.goto(LOGIN_URL);
	await loginPage.login(
		USER_CREDENTIALS.STANDARD_USER,
		USER_CREDENTIALS.PASSWORD
	);
	await expect(page.getByRole("link", { name: "Today" })).toBeVisible();
});
