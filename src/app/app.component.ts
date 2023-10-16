import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
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

// Exemplo de um provider customizado para injeção de dependência (apenas para conhecimento o Angular faz isso automaticamente):
// export const COURSE_SERVICE = new InjectionToken<CoursesService>(
//   "COURSES_SERVICES"
// );

// function coursesServiceProvider(http: HttpClient): CoursesService {
//   return new CoursesService(http);
// }

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  // providers: [
  //   {
  //     provide: COURSE_SERVICE,
  //     useFactory: coursesServiceProvider,
  //     deps: [HttpClient],
  //   },
  // ],
  providers: [CoursesService],
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(
    //@Inject(COURSE_SERVICE) private coursesService: CoursesService,
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig
  ) {
    console.log(this.appConfig);
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course): void {
    this.coursesService
      .saveCourse(course)
      .subscribe(() => console.log("Course saved!"));
  }
}
