import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import Task from "src/assets/interfaces/task";
import {stringToDate} from "src/assets/utils";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	public tasks: Task[] = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
	private subject = new Subject();
	private filterOption: string = "All";
	private sortOption: string = "Add due";

	constructor() {
		this.tasks = this.tasks.sort((a, b) => {
			if (a.complete && !b.complete) return 1;
			if (!a.complete && b.complete) return -1;
			return 0;
		});
		this.subject.next(this.tasks);
	}
	getTasks(): Observable<any> {
		return this.subject.asObservable();
	}

	addTask(task: Task): void {
		this.tasks.push(task);
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
		this.filter(this.filterOption, this.tasks);
	}

	changeTask(task: Task): void {
		this.tasks = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
		this.tasks = this.tasks.map((prevTask: Task) => (prevTask.id === task.id ? task : prevTask));
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
		this.filter(this.filterOption, this.tasks);
	}

	removeTask(id: number): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		this.subject.next(this.tasks);
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
	}

	filter(option: string, tasks: Task[] = this.getTaskFromLocalStorage()): void {
		this.filterOption = option;
		switch (option) {
			case "Completed":
				tasks = tasks.filter((task: Task) => task.complete === true);
				break;
			case "Active":
				tasks = tasks.filter((task: Task) => task.complete === false);
				break;
			case "Has due date":
				tasks = this.tasks.filter((task: Task) => task.dueDate !== "");
				break;
		}
		this.tasks = tasks;
		this.sort(this.sortOption, this.tasks);
	}

	sort(option: string, tasks: Task[] = this.getTaskFromLocalStorage()): void {
		this.sortOption = option;
		if (option === "Due date")
			tasks = tasks.sort((a: Task, b: Task) => {
				if (a.dueDate && b.dueDate) return new Date(stringToDate(a.dueDate)).getTime() - new Date(stringToDate(b.dueDate)).getTime();
				if (a.dueDate && !b.dueDate) return -1;
				if (!a.dueDate && b.dueDate) return 1;
				return 0;
			});
		this.tasks = this.tasks.sort((a, b) => {
			if (a.complete && !b.complete) return 1;
			if (!a.complete && b.complete) return -1;
			return 0;
		});
		this.tasks = tasks;
		this.subject.next(this.tasks);
	}

	private getTaskFromLocalStorage(): Task[] {
		return window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
	}
}
