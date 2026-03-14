export const DEFAULT_TIMEOUT = 5000;

export const USER_CREDENTIALS = {
	STANDARD_USER: process.env.STANDARD_USER || "default_user",
	PASSWORD: process.env.PASSWORD || "",
	INVALID_USER: "invalidUser@mail.com",
	INVALID_PASSWORD: "invalidPassword",
};

export const ERROR_MESSAGES = {
	LOGIN_FAILED:
		"Epic sadface: Username and password do not match any user in this service",
};

export const AUTH_TOKEN = {
	AUTH_TOKEN: process.env.AUTH_TOKEN || "",
};

export const TASK_DETAILS = {
	TITLE: "New task",
	DESC: "Description",
};

export const LABELS = {
	FOOD: "Food",
	SHOPPING: "Shopping",
	WORK: "Work",
	LEISURE: "Leisure",
};

export const PRIORITY = {
	LOW: 4,
	MEDIUM: 3,
	HIGH: 2,
	URGENT: 1,
};

export const DUE_DATE = {
	TODAY: new Date().toISOString().split("T")[0],
};

export const COMMENT = {
	CONTENT: "This is a comment",
};
