export interface Task {
	content: string;
	description?: string;
	project_id?: string | null;
	section_id?: string | null;
	parent_id?: string | null;
	order?: number | null;
	labels?: string[];
	priority?: number;
	assignee_id?: string | null;
	due_string?: string;
	due_date?: string;
	due_datetime?: string;
	due_lang?: string;
}
