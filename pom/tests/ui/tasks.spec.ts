import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import {
	USER_CREDENTIALS,
	TASK_DETAILS,
	DUE_DATE,
	COMMENT,
} from "../../data/Constants";
import { TODAY_URL } from "../../data/urls";
import { TaskService } from "../../services/task";
import { TaskDetailsModal } from "../../components/taskDetailsModal.component";
import { CommentItem } from "../../components/commentItem.component";
import { TodayPage } from "../../pages/today.page";
import { type Task, type Comment } from "../../data/Interfaces";
import { DeleteModalComponent } from "../../components/deleteModal.component";
import { TaskCardComponent } from "../../components/taskCard.component";

test.describe("Task details modal management", async () => {
	let loginPage: LoginPage;
	let todayPage: TodayPage;
	let taskService: TaskService;
	let taskId: string = "";
	let taskDetailsModal: TaskDetailsModal;
	let commentItemComponent: CommentItem;
	let commentId: string = "";
	let deleteModalComponent: DeleteModalComponent;
	let taskCardComponent: TaskCardComponent;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		todayPage = new TodayPage(page);
		taskService = new TaskService(page);
		taskDetailsModal = new TaskDetailsModal(page);
		deleteModalComponent = new DeleteModalComponent(page);

		await loginPage.login(
			USER_CREDENTIALS.STANDARD_USER,
			USER_CREDENTIALS.PASSWORD
		);
		await page.waitForURL(TODAY_URL);
		await todayPage.awaitForVisibleRoot();
	});

	test.afterEach(async ({ page }) => {
		taskService = new TaskService(page);
		await taskService.deleteTask(taskId);
	});

	test("should be able to add a comment to a task", async ({ page }) => {
		const taskInfo: Task = {
			content: TASK_DETAILS.TITLE,
			due_string: DUE_DATE.TODAY,
		};
		await taskService.createTaskViaAPI(taskInfo);
		taskId = await taskService.getTaskId(taskInfo.content);
		const commentInfo: Comment = {
			content: COMMENT.CONTENT,
			task_id: taskId,
		};
		taskCardComponent = new TaskCardComponent(page, taskId);
		await expect(taskCardComponent.taskCardRoot).toBeVisible();
		await taskCardComponent.taskCardRoot.click();
		await expect(taskDetailsModal.taskDetailsView).toBeVisible();
		await taskDetailsModal.addComment(commentInfo.content);
		commentId = await taskService.getCommentId(commentInfo.content);
		commentItemComponent = new CommentItem(page, commentId);
		await expect(commentItemComponent.commentItemRoot).toBeVisible();
		await expect(commentItemComponent.commentItemRoot).toContainText(
			commentInfo.content
		);
	});

	test("should be able to delete a comment from a task", async ({ page }) => {
		const taskInfo: Task = {
			content: TASK_DETAILS.TITLE,
			due_string: DUE_DATE.TODAY,
		};
		await taskService.createTaskViaAPI(taskInfo);
		taskId = await taskService.getTaskId(taskInfo.content);
		taskCardComponent = new TaskCardComponent(page, taskId);
		const commentInfo: Comment = {
			content: COMMENT.CONTENT,
			task_id: taskId,
		};
		const commentResponse = await taskService.addCommentViaAPI(commentInfo);
		commentId = commentResponse.id;
		commentItemComponent = new CommentItem(page, commentId);

		await expect(taskCardComponent.taskCardRoot).toBeVisible();
		await taskCardComponent.taskCardRoot.click();
		await expect(taskDetailsModal.taskDetailsView).toBeVisible();

		await commentItemComponent.openCommentMenuOptions();
		await commentItemComponent.deleteCommentFromMenu();
		await deleteModalComponent.confirmDelete();
		await expect(commentItemComponent.commentItemRoot).toBeHidden();
	});
});
