import {Component, Input, OnInit} from "@angular/core";
import {TaskService} from "src/app/services/task.service";
import {dateToString, stringToDate} from "src/assets/utils";
import Task from "src/assets/interfaces/task";

@Component({
	selector: "app-task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
	@Input() public task: Task;
	dueDateAsDate: Date;

	constructor(private taskService: TaskService) {}

	ngOnInit(): void {
		this.dueDateAsDate = stringToDate(this.task.dueDate);
	}

	removeTask(): void {
		this.taskService.removeTask(this.task.id);
	}

	changeTask(): void {
		this.taskService.changeTask(this.task);
	}

	onDateChange(e: any): void {
		this.dueDateAsDate = e.target.value;
		this.task.dueDate = dateToString(e.target.value);
		this.changeTask();
	}

	onCheckBoxChange(e: any): void {
		this.task.complete = e.checked;
		this.changeTask();
	}
}
