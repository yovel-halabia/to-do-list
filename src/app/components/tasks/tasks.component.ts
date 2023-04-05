import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import Task from "src/assets/interfaces/task";
import {TaskService} from "src/app/services/task.service";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"],
})
export class TasksComponent {
	tasks: Task[] = [];
	subscription: Subscription;

	constructor(private taskService: TaskService) {
		this.tasks = taskService.tasks;
		this.subscription = this.taskService.getTasks().subscribe((v) => (this.tasks = v));
	}
}
