import { type Page, type Locator } from "@playwright/test";

export class SideBar {
	readonly sideBar: Locator;
	readonly settingsMenu: Locator;
	readonly notificationsButton: Locator;
	readonly toggleSidebar: Locator;
	readonly addTaskSidebar: Locator;
	readonly searchButton: Locator;
	readonly inboxButton: Locator;
	readonly todayButton: Locator;
	readonly todayCounter: Locator;
	readonly upcommingButton: Locator;
	readonly filtersNLabelsButton: Locator;
	readonly completedButton: Locator;
	readonly moreMenuButton: Locator;
	readonly projectsButton: Locator;
	readonly addProjectButton: Locator;
	readonly toggleListProjectsButton: Locator;
	readonly projectsList: Locator;

	constructor(page: Page) {
		this.sideBar = page.getByTestId("app-sidebar-container");
		this.settingsMenu = page.getByRole("button", { name: "Settings" });
		this.notificationsButton = page.getByRole("link", {
			name: "Notifications",
		});
		this.toggleSidebar = page.getByRole("button", {
			name: "Open/close sidebar",
		});
		this.addTaskSidebar = page
			.getByTestId("app-sidebar-container")
			.getByRole("button", { name: "Add task" });
		this.searchButton = page.getByRole("button", { name: "Search" });
		this.inboxButton = page.locator("[id='sidebar-list-item-1']");
		this.todayButton = page.locator("[id='sidebar-list-item-2']");
		this.todayCounter = this.todayButton.locator(
			"span[data-project-actions='true'] div span"
		);
		this.upcommingButton = page.getByRole("link", { name: "Upcoming" });
		this.filtersNLabelsButton = page.getByRole("link", {
			name: "Filters & Labels",
		});
		this.completedButton = page.getByRole("link", { name: "Completed" });
		this.moreMenuButton = page
			.getByTestId("more_menu_button")
			.getByRole("button", { name: "More" });
		this.projectsButton = page.getByRole("link", { name: "My Projects" });
		this.addProjectButton = page.getByRole("button", {
			name: "My projects menu",
		});
		this.toggleListProjectsButton = page.getByRole("button", {
			name: "Toggle list of My Projects",
		});
		this.projectsList = page.locator("#projects_list");
	}

	async awaitForVisibleRoot() {
		await this.sideBar.isVisible();
	}
}
