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
	prevTitle: string;
	minDate: Date = new Date();
	dueDateAsDate: Date;
	isDateDue: boolean = false;
	showAlert: boolean = false;
	alertTimeout: ReturnType<typeof setTimeout> | undefined;

	constructor(private taskService: TaskService) {}

	ngOnInit(): void {
		this.dueDateAsDate = stringToDate(this.task.dueDate);
		this.prevTitle = this.taskService.tasks.filter((pTask) => pTask.id === this.task.id)[0].title;
		this.isDateDue = this.dueDateAsDate.getTime() < new Date().getTime() && this.task.dueDate !== dateToString(new Date());
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
		this.isDateDue = this.dueDateAsDate.getTime() < new Date().getTime() && this.task.dueDate !== dateToString(new Date());
		this.changeTask();
	}

	onChange(e: any): void {
		if (e.checked || e.checked === false) this.task.complete = e.checked;
		if (e.target?.value === "") {
			this.showAlert = true;
			e.target.value = this.prevTitle;
			if (!this.alertTimeout) {
				this.alertTimeout = setTimeout(() => {
					if (this.showAlert) this.showAlert = false;
					this.alertTimeout = undefined;
				}, 2000);
			}
			return;
		} else if (e.target?.value) {
			this.task.title = e.target.value;
			this.prevTitle = e.target.value;
		}

		this.changeTask();
	}
}
