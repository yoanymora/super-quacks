import { type Page, type Locator } from "@playwright/test";

export class CommentItem {
	private _commentId: string;
	readonly page: Page;
	public commentItemRoot: Locator;
	readonly commentMenuOptionsButton: Locator;

	constructor(page: Page, id: string) {
		this.page = page;
		this._commentId = id;
		this.commentItemRoot = this.computeCommentItemRoot();
		this.commentMenuOptionsButton = page.getByRole("button", {
			name: "Comment options",
		});
	}

	get commentId() {
		return this._commentId;
	}

	set commentId(id: string) {
		this._commentId = id;
		this.commentItemRoot = this.computeCommentItemRoot();
	}

	async openCommentMenuOptions() {
		await this.commentItemRoot.hover();
		await this.commentMenuOptionsButton.isVisible();
		await this.commentMenuOptionsButton.click();
	}

	async deleteCommentFromMenu() {
		await this.page
			.getByRole("menu", { name: "Comment options menu" })
			.getByRole("menuitem", { name: "Delete" })
			.click();
	}

	computeCommentItemRoot() {
		return this.page.locator(`#comment-${this.commentId}`);
	}
}
