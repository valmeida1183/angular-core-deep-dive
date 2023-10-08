import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit {
    courses = COURSES;
    startDate = new Date(2000, 0, 1);
    title = COURSES[1].description;
    price = 9.99;
    percent = 0.67;
    firstCourse = COURSES[1];
    secondCourse = COURSES[2];

    // @ViewChild(CourseCardComponent) // buscar o primeiro CourseCardComponent que encontrar
    // card: CourseCardComponent;

    // @ViewChild("cardRef") // busca o CourseCardComponent com a template reference #cardRef
    // card: CourseCardComponent;

    @ViewChild("cardRef", { read: ElementRef }) // busca o componente como um elemento nativo do HTML
    card: ElementRef;

    @ViewChild("containerRef")
    containerRef: ElementRef;

    @ViewChild("courseImage")
    courseImage: ElementRef;

    @ViewChildren(CourseCardComponent)
    cards: QueryList<CourseCardComponent>;

    constructor() {}

    ngOnInit(): void {
        this.changeCourseAfterTime();
    }

    ngAfterViewInit(): void {
        console.log("Container Div", this.containerRef);
        console.log(this.cards);

        //emite um valor toda vez que houver uma mudança no array
        this.cards.changes.subscribe((cards) =>
            console.log("New card was added!", cards)
        );

        //this.courses[1].description = "this test will throw an error";
    }

    onCourseSelected(course: Course): void {
        // console.log(this.card);
        // console.log("Container Div", this.containerRef);
        //console.log("App component - click event button bubbled...", course);
    }

    onCoursesEdit(): void {
        this.courses.push({
            id: 9,
            description: "Angular Architecture Course",
            longDescription:
                "Learn the core RxJs Observable Pattern as well and many other Design Patterns for building Reactive Angular Applications.",
            iconUrl:
                "https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png",
            category: "BEGINNER",
        });
    }

    private changeCourseAfterTime(): void {
        setTimeout(() => {
            this.courses[1].description = "Angular Core Deep Dive Updated";
        }, 5000);
    }
}
