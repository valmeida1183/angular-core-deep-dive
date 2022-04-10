import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pipe-display',
  templateUrl: './pipe-display.component.html',
  styleUrls: ['./pipe-display.component.css'],
})
export class PipeDisplayComponent implements OnInit {
  startDate = new Date(2022, 3, 1);
  titleExample = 'Angular core deep dive';
  price = 9.99678545;
  pi = 3.14159265359;
  rate = 0.67;

  constructor() {}

  ngOnInit(): void {}
}
