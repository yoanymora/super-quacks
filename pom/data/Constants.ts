export const BASE_URL = "https://app.todoist.com";
export const TODAY_URL = `${BASE_URL}/app/today`;
export const LOGIN_URL = `${BASE_URL}/app/login`;
export const DEFAULT_TIMEOUT = 5000;

export const USER_CREDENTIALS = {
	STANDARD_USER: process.env.STANDARD_USER || "default_user",
	PASSWORD: process.env.PASSWORD || "",
};

export const ERROR_MESSAGES = {
	LOGIN_FAILED:
		"Epic sadface: Username and password do not match any user in this service",
};
