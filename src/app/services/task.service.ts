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
		this.subject.next(this.tasks);
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
	}

	changeTask(task: Task): void {
		this.tasks = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
		this.tasks = this.tasks.map((prevTask: Task) => (prevTask.id === task.id ? task : prevTask));
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
		this.tasks = this.tasks.sort((a, b) => {
			if (a.complete && !b.complete) return 1;
			if (!a.complete && b.complete) return -1;
			return 0;
		});
		this.subject.next(this.tasks);
	}

	removeTask(id: number): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		this.subject.next(this.tasks);
		window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
	}

	filter(option: string): void {
		this.tasks = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
		switch (option) {
			case "Completed":
				this.tasks = this.tasks.filter((task: Task) => task.complete === true);
				break;
			case "Active":
				this.tasks = this.tasks.filter((task: Task) => task.complete === false);
				break;
			case "Has due date":
				this.tasks = this.tasks.filter((task: Task) => task.dueDate !== "");
				break;
		}
		this.subject.next(this.tasks);
	}

	sort(option: string): void {
		this.tasks = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks") || "") : [];
		if (option === "Due date")
			this.tasks = this.tasks.sort((a: Task, b: Task) => {
				if (a.dueDate && b.dueDate) return new Date(stringToDate(a.dueDate)).getTime() - new Date(stringToDate(b.dueDate)).getTime();
				if (a.dueDate && !b.dueDate) return -1;
				if (!a.dueDate && b.dueDate) return 1;
				return 0;
			});
		this.subject.next(this.tasks);
	}
}
