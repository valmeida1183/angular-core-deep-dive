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
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CoursesService } from "./services/courses.service";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./app-config";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
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
    const course = this.courses[0];
    const newCourse = { ...course, description: "ngOnchanges" };
    this.courses[0] = newCourse;
  }
}
