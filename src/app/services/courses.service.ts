import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

let counter = 0;

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {
    counter++;
    console.log("create CoursesService " + counter);
  }

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pageSize", "10");

    return this.http.get<Course[]>("/api/courses", { params });
  }

  saveCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders().set("X-Custom-Header", "userId");

    return this.http.put<Course>(`/api/courses/${course.id}`, course, {
      headers,
    });
  }
}
