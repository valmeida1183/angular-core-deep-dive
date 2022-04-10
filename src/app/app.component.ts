import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { HighlightedDirective } from './courses/directives/highlighted.directive';
import { Observable } from 'rxjs';
import { CoursesService } from './courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG, CONFIG_TOKEN } from './config';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;
  courses: Course[] = COURSES;
  coursesTotal = this.courses.length;

  constructor(
    private courseService: CoursesService,
    private cd: ChangeDetectorRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    // this.courseService.loadCourses().subscribe((courses) => {
    //   this.courses = courses;
    // });

    const htmlElement = createCustomElement(CourseTitleComponent, {
      injector: this.injector,
    });
    customElements.define('course-title', htmlElement);
  }

  onEditCourse() {
    this.courses[1].category = 'ADVANCED';
  }

  save(course: Course) {
    this.courseService.saveCourse(course);
  }
}
