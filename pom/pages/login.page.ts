import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: Locator;

	constructor(page: Page) {
		super(page);
		// 2. Initialize Locators in the constructor
		this.emailInput = page.locator("input[type=email]");
		this.passwordInput = page.locator("input[type=password]");
		this.loginButton = page.locator("button[type=submit]");
		this.errorMessage = page.locator('[data-test="error"]');
	}

	async login(user: string, pass: string) {
		await this.emailInput.fill(user);
		await this.passwordInput.fill(pass);
		await this.loginButton.click();
	}
}
