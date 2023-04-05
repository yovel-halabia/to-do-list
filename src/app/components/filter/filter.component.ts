import {Component} from "@angular/core";
import {TaskService} from "src/app/services/task.service";

@Component({
	selector: "app-filter",
	templateUrl: "./filter.component.html",
	styleUrls: ["./filter.component.css"],
})
export class FilterComponent {
	filterTypes: string[] = ["All", "Completed", "Active", "Has due date"];
	sortTypes: string[] = ["Add due", "Due date"];

	constructor(private taskService: TaskService) {}

	onFilterChange(e: any): void {
		this.taskService.filter(e.target.value);
	}

	onSortChange(e: any): void {
		this.taskService.sort(e.target.value);
	}
}
