import { type Page, type Locator } from "@playwright/test";

export class DeleteModalComponent {
	readonly deleteModalRoot: Locator;
	readonly deleteBtn: Locator;

	constructor(page: Page) {
		this.deleteModalRoot = page.getByTestId("confirmation-modal");
		this.deleteBtn = this.deleteModalRoot.getByRole("button", {
			name: "Delete",
		});
	}

	async confirmDelete() {
		await this.deleteModalRoot.isVisible();
		await this.deleteBtn.click();
		await this.deleteModalRoot.isHidden();
	}
}
