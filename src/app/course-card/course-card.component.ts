import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  SkipSelf,
  ViewEncapsulation,
} from "@angular/core";
import { Course } from "../model/course";
import { CourseImageComponent } from "../course-image/course-image.component";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],

  // desta forma vai criar um CoursesService novo para CADA CourseCardComponent novo, Isso é o que se chama de Hierarchical DI.
  // Pois se os serviço é fornecido no root todos abaixo dele utilizarão a mesma instância, se comportando com um singleton na aplicação
  // Contudo neste exemplo, o serviço foi declarado como um provider do componente e a partir deste ponto tem uma nova instãncia de CoursesService
  // que todos os componentes filhos deste componente utilizarão caso injetem o CoursesService.
  providers: [CoursesService],
})
export class CourseCardComponent implements OnInit {
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output("courseChanged")
  courseEmitter = new EventEmitter<Course>();

  constructor(@SkipSelf() private coursesService: CoursesService) {}

  ngOnInit() {}

  onSaveClicked(description: string) {
    this.courseEmitter.emit({ ...this.course, description });
  }
}
