export interface TaskOptions {
	title: string;
	desc?: string;
	projectId?: string | null;
	sectionId?: string | null;
	parentId?: string | null;
	order?: number | null;
	labels?: string[];
	priority?: number;
	assigneeId?: string | null;
	dueString?: string;
	dueDate?: string;
	dueDatetime?: string;
	dueLang?: string;
}
