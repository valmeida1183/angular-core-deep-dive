import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./courses/course-card/course-card.component";
import { HighlightedDirective } from "./courses/directives/highlighted.directive";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CoursesService } from "./courses/courses.service";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./app-config";
import { FilterByCategoryPipe } from "./courses/pipes/filter-by-category.pipe";
import { CourseImageComponent } from "./courses/course-image/course-image.component";
import { NgForOf } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    NgForOf,
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe,
  ],
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;
  courses: Course[] = COURSES;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    //this.courses$ = this.coursesService.loadCourses();
    // this.coursesService.loadCourses().subscribe((courses) => {
    //   this.courses = courses;
    // });
  }

  save(course: Course): void {
    this.coursesService
      .saveCourse(course)
      .subscribe(() => console.log("Course saved!"));
  }

  onEditCourse(): void {
    this.courses[1].category = "ADVANCED";
    //this.courses[1] = { ...this.courses[1], category: "ADVANCED" };
  }
}
