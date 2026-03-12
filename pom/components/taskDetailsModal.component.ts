import { type Page, type Locator } from "@playwright/test";
import { CommentItem } from "./commentItem.component";

export class TaskDetailsModal {
	readonly taskDetailsView: Locator;
	readonly taskTitle: Locator;
	readonly taskDescription: Locator;
	readonly commentEditorButton: Locator;
	readonly commentTextBox: Locator;
	readonly submitCommentButton: Locator;
	readonly deleteMenuButton: Locator;
	readonly commentItemComponent: CommentItem;

	constructor(page: Page) {
		this.taskDetailsView = page.getByTestId("task-details-modal");
		this.taskTitle = page.getByRole("button", { name: "Task name" });
		this.taskDescription = page.getByRole("button", {
			name: "Task description",
		});
		this.commentEditorButton = page.getByTestId("open-comment-editor-button");
		this.commentTextBox = page.getByRole("textbox", { name: "Comment" });
		this.submitCommentButton = page.getByRole("button", {
			name: "Comment",
			exact: true,
		});
		this.deleteMenuButton = page.getByRole("menuitem", { name: "Delete" });
		this.commentItemComponent = new CommentItem(page, "");
	}

	async addComment(comment: string) {
		await this.commentEditorButton.click();
		await this.commentTextBox.isVisible();
		await this.commentTextBox.fill(comment);
		await this.submitCommentButton.click();
	}

	async openCommentMenu() {
		await this.commentItemComponent.openCommentMenuOptions();
	}

	async deleteComment() {
		this.openCommentMenu();
		await this.commentItemComponent.deleteCommentFromMenu();
	}
}
