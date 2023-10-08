import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { Course } from "../model/course";
import { ICssClassRule } from "../model/css-class-rule";
import { ICssPropertyRule } from "../model/css-property-rule";
import { CourseImageComponent } from "../course-image/course-image.component";

@Component({
    selector: "course-card",
    templateUrl: "./course-card.component.html",
    styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements OnInit, AfterContentInit {
    @Input({ required: true })
    course: Course;

    @Input({ required: false })
    cardIndex: number;

    @Input()
    noImageTemplate: TemplateRef<any>;

    @Output("courseSelected")
    courseEmitter = new EventEmitter<Course>();

    @ContentChild(CourseImageComponent)
    image: CourseImageComponent;

    beginnerCssRule: ICssClassRule;
    underlineCssRule: ICssPropertyRule;

    constructor() {}

    ngOnInit(): void {
        this.loadBeginnerCardCssRule();
        this.loadUnderlineCssRule();
    }

    ngAfterContentInit(): void {
        console.log("Content Projection", this.image);
    }

    onCourseViewed(): void {
        console.log("Card component - button clicked ...");

        this.courseEmitter.emit(this.course);
    }

    /*
      Exemplo de como setar regras de Css definindo um objeto pelo componente
      Evitando desta forma poluir o template com objetos anônimos complexos ou com chamada de funções 
      como valor de inputs (que é um code smell no Angular, pois é chamada a cada ciclo de Change detection) 
    */
    private loadBeginnerCardCssRule(): void {
        this.beginnerCssRule = {
            beginner: this.course?.category === "BEGINNER",
            teste: true,
        };
    }

    private loadUnderlineCssRule(): void {
        this.underlineCssRule = {
            "text-decoration": "underline",
        };
    }
}
