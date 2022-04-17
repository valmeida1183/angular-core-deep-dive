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
export class AppComponent implements OnInit, AfterViewInit {
  courses$: Observable<Course[]>;
  courses: Course[] = COURSES;
  coursesTotal = this.courses.length;
  courseSelected: Course = null;

  //@ViewChild(CourseCardComponent)
  // @ViewChild('cardRef')
  // card: CourseCardComponent;

  @ViewChildren(CourseCardComponent)
  cards: QueryList<CourseCardComponent>;

  @ViewChild('containerRef')
  container: ElementRef;

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

  ngAfterViewInit(): void {
    // primeiro lifecicle hook onde é possível acessar os viewChilds
    console.log('App component Card viewChildren', this.cards.first);
    console.log('App component Container viewChild', this.container);
  }

  onEditCourse() {
    this.courses[1].category = 'ADVANCED';
  }

  save(course: Course) {
    this.courseService.saveCourse(course);
  }

  openDetail(course: Course) {
    this.courseSelected = course;
    console.log(this.courseSelected);

    //console.log('App component Card viewChild', this.card);
    console.log('App component Container viewChild', this.container);
  }
}
