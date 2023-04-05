import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {AppComponent} from "./app.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {TaskComponent} from "./components/task/task.component";
import {FilterComponent} from "./components/filter/filter.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";


@NgModule({
	declarations: [AppComponent, AddTaskComponent, TasksComponent, TaskComponent, FilterComponent],
	imports: [
		BrowserModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		BrowserAnimationsModule,
		MatDividerModule,
		MatCheckboxModule,
		MatSelectModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
