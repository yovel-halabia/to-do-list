import {Component} from "@angular/core";

@Component({
	selector: "app-filter",
	templateUrl: "./filter.component.html",
	styleUrls: ["./filter.component.css"],
})
export class FilterComponent {
	filterTypes: string[] = ["All", "Completed", "Active", "Has due date"];
	sortTypes: string[] = ["Add due", "Due date"];
}
