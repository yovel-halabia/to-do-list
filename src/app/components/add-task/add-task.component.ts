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
	title: string = "";
	dueDate: string = "";

	constructor(private taskService: TaskService) {}

	addTask() {
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
