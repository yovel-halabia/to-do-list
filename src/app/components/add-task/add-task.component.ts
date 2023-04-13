import { Component } from '@angular/core';
import Task from "src/assets/interfaces/task";
import {dateToString} from "src/assets/utils";
import {TaskService} from "src/app/services/task.service";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent {
	minDate: Date = new Date();
	title: string = "";
	dueDate: string = "";
	showAlert: boolean = false;
	alertTimeout: ReturnType<typeof setTimeout> | undefined;

	constructor(private taskService: TaskService) {}

	addTask() {
		this.showAlert = false;
		if (!this.title) {
			this.showAlert = true;
			if (!this.alertTimeout) {
				this.alertTimeout = setTimeout(() => {
					if (this.showAlert) this.showAlert = false;
					this.alertTimeout = undefined;
				}, 2000);
			}
			return;
		}
		var task: Task = {
			id: new Date().getTime(),
			complete: false,
			title: this.title,
			dueDate: this.dueDate === "" ? "" : dateToString(new Date(this.dueDate)),
			addedDate: dateToString(new Date()),
		};
		this.taskService.addTask(task);
		this.title = "";
		this.dueDate = "";
	}
}
