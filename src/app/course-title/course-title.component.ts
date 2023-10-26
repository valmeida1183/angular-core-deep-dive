import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "course-title",
  templateUrl: "./course-title.component.html",
  styleUrls: ["./course-title.component.css"],
  standalone: true,
})
export class CourseTitleComponent implements OnInit {
  @Input()
  title: string;

  constructor() {}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}