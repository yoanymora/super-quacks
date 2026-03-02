import { type Page, type Locator } from "@playwright/test";

export class TaskEditor {
	readonly taskEditorForm: Locator;
	readonly taskTitleInput: Locator;
	readonly taskDescriptionInput: Locator;
	readonly setDateButton: Locator;
	readonly schedulerView: Locator;
	readonly setPriorityButton: Locator;
	readonly priorityDropdown: Locator;
	readonly setReminderButton: Locator;
	readonly reminderPopper: Locator;
	readonly moreActionsButton: Locator;
	readonly moreActionsMenu: Locator;
	readonly selectProjectButton: Locator;
	readonly cancelTaskButton: Locator;
	readonly submitTaskButton: Locator;

	constructor(page: Page) {
		this.taskEditorForm = page.locator("[data-testid='task-editor']");
		this.taskTitleInput = page
			.getByRole("textbox", { name: "Task name" })
			.getByRole("paragraph");
		this.taskDescriptionInput = page
			.getByRole("textbox", { name: "Description" })
			.getByRole("paragraph");
		this.setDateButton = page.getByLabel("Set date");
		this.schedulerView = page.locator('[data-testid="scheduler-view"');
		this.setPriorityButton = page.getByLabel("Set priority");
		this.priorityDropdown = page.getByLabel("Select a priority");
		this.setReminderButton = page.getByLabel("Add reminders");
		this.reminderPopper = page.getByLabel("Reminders");
		this.moreActionsButton = page.getByLabel("More actions");
		this.moreActionsMenu = page.locator("div[id=more-actions-menu]");
		this.selectProjectButton = page.getByLabel("Select a project");
		this.cancelTaskButton = page.getByLabel("Cancel");
		this.submitTaskButton = page.locator(
			'[data-testid="task-editor-submit-button"]'
		);
	}
}
