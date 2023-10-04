import { Component, OnInit } from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    courses = COURSES;
    startDate = new Date(2000, 0, 1);
    title = COURSES[1].description;
    price = 9.99;
    percent = 0.67;
    firstCourse = COURSES[1];

    ngOnInit(): void {
        this.changeCourseAfterTime();
    }

    onCourseSelected(course: Course): void {
        console.log("App component - click event button bubbled...", course);
    }

    private changeCourseAfterTime(): void {
        setTimeout(() => {
            this.courses[0].description = "Angular Core Deep Dive Updated";
        }, 5000);
    }
}
