import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Course } from '../../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    DoCheck
{
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Input()
  noImageTemplate: TemplateRef<any>;

  // tslint:disable-next-line: no-output-rename
  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  // tslint:disable-next-line: no-output-rename
  @Output('courseSelected')
  courseViewEmmiter = new EventEmitter<Course>();

  @ContentChild(CourseImageComponent)
  courseImage: CourseImageComponent;

  constructor(
    private courseService: CoursesService,
    @Attribute('type') private type: string
  ) {
    console.log('constructor', this.course);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngOnInit() {
    console.log('ngOnInit', this.course);
    // console.log('courseService course card', this.courseService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    console.log(this.courseImage);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  onSaveClicked(description: string) {
    this.courseEmitter.emit({ ...this.course, description });
  }

  onCourseSelected() {
    this.courseImage.imageUrl =
      'https://s3-us-west-1.amazonaws.com/angular-university/course-images/material_design.png';
    this.courseViewEmmiter.emit(this.course);
  }

  onTitleChanged(title: string) {
    this.course.description = title;
  }
}
