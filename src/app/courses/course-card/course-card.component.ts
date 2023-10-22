import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
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
  SkipSelf,
  ViewEncapsulation,
} from "@angular/core";
import { Course } from "src/app/model/course";
import { CoursesService } from "../courses.service";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit
{
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output("courseChanged")
  courseEmitter = new EventEmitter<Course>();

  constructor(private coursesService: CoursesService) {
    console.log("constructor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }

  // CUIDADO! Este evento é chamado a cada ciclo do change detection
  ngAfterContentChecked(): void {
    // utilizado para verificar as alterações do content projection. É executado com frequencia e não deve contar lógicas que impactem na performance
    console.log("ngAfterContentChecked");
    this.course.description = "ngAfterContentChecked";
    this.course.category = "ADVANCED";

    // vai ocasionar erro, pois não se pode mudar o conteúdo de um valor que está sendo usado no content
    // projection neste evento que é disparado após a verificação do conteúdo projetado
    this.course.iconUrl = "";
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }

  // CUIDADO! Este evento é chamado a cada ciclo do change detection
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }

  onSaveClicked(description: string) {
    this.courseEmitter.emit({ ...this.course, description });
  }

  onTitleChanged(newTitle: string): void {
    this.course.description = newTitle;
  }
}
