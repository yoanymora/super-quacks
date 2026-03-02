import { type Page } from "@playwright/test";
import { TaskEditor } from "../components/taskEditor.component";

export class Common {
	readonly taskEditor: TaskEditor;
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
		this.taskEditor = new TaskEditor(this.page);
	}

	async addTask(title: string, desc: string) {
		await this.taskEditor.taskTitleInput.fill(title);
		await this.taskEditor.taskDescriptionInput.fill(desc);
		await this.taskEditor.submitTaskButton.click();
	}
}
