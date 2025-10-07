

import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  public title: string = 'Hello World!';
  public result: number = 0;
  public fruits: string[] = ['Apple', 'Banana', 'Orange'];

  subtractOne() {
    this.result = this.result - 1;
  }

  addOne() {
    this.result = this.result + 1;
  }
}