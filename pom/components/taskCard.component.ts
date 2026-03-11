import { type Page, type Locator } from "@playwright/test";

export class TaskCardComponent {
	private _taskId: string;
	readonly page: Page;
	public taskCardRoot: Locator;
	readonly menuOption: Locator;
	public taskCardCheck: Locator;

	constructor(page: Page, id: string) {
		this.page = page;
		this._taskId = id;
		this.taskCardRoot = this.computeTaskCardRoot();
		this.menuOption = this.page.getByRole("menu", { name: "task edit menu" });
		this.taskCardCheck = this.computeTaskCardCheck();
	}

	get taskId() {
		return this._taskId;
	}

	set taskId(id: string) {
		this._taskId = id;
		this.taskCardRoot = this.computeTaskCardRoot();
		this.taskCardCheck = this.computeTaskCardCheck();
	}

	get taskCardMoreMenu() {
		return this.taskCardRoot.getByTestId("more_menu");
	}

	async openTaskCardMenu() {
		await this.taskCardRoot.hover();
		await this.taskCardMoreMenu.isVisible();
		await this.taskCardMoreMenu.click();
	}

	async deleteTaskFromMenu() {
		await this.openTaskCardMenu();
		await this.menuOption.getByRole("menuitem", { name: "Delete" }).click();
	}

	computeTaskCardRoot() {
		return this.page.locator(`#task-${this.taskId}`);
	}

	async openEditTask() {
		await this.menuOption.getByRole("menuitem", { name: "Edit" }).click();
	}

	async editTaskFromMenu() {
		await this.openTaskCardMenu();
		await this.openEditTask();
	}

	computeTaskCardCheck() {
		return this.taskCardRoot.getByRole("checkbox");
	}

	async clickCheck() {
		await this.taskCardCheck.isVisible();
		await this.taskCardCheck.click();
	}
}
