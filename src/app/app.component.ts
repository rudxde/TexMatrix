import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Matrix: string[][];
  row: number;
  cols: number;
  oldrow: number;
  oldcols: number;
  result: string;
  constructor() {
    this.Matrix = [];
    this.row = this.cols = 3;
    this.oldcols = this.oldrow = 0;
    this.changeSize();
  }

  changeSize(): void {
    while (this.oldrow < this.row) {
      const newLine = [];
      for (let i = 0; i < this.oldcols; i++) {
        newLine.push(this.getDefaultCellLable(this.oldrow, i));
      }
      this.Matrix.push(newLine);
      this.oldrow++;
    }
    while (this.oldrow > this.row) {
      this.Matrix.pop();
      this.oldrow--;
    }
    while (this.oldcols < this.cols) {
      for (let i = 0; i < this.Matrix.length; i++) {
        this.Matrix[i].push(this.getDefaultCellLable(i, this.oldcols));
      }
      this.oldcols++;
    }
    while (this.oldcols > this.cols) {
      for (let i = 0; i < this.Matrix.length; i++) {
        this.Matrix[i].pop();
      }
      this.oldcols--;
    }
    this.updateView();
  }

  getDefaultCellLable(row: number, col: number) {
    return this.numberToString(row, '') + '_' + (col + 1);
  }

  numberToString(num: number, oldString: string): string {
    if (num > 25) {
      return this.numberToString(Math.round(num / 26 - 1), String.fromCharCode((num % 26) + 97) + oldString);
    } else {
      return String.fromCharCode(num % 26 + 97) + oldString;
    }
  }

  updateView() {
    this.result = '$ \\begin{bmatrix}\n';
    const rows = [];
    for (let i = 0; i < this.Matrix.length; i++) {
      const colls = [];
      for (let ii = 0; ii < this.Matrix[i].length; ii++) {
        colls.push(this.Matrix[i][ii]);
      }
      rows.push(colls.join(' & '));
    }
    this.result += rows.join(' \\\\\n');
    this.result += '\n\\end{bmatrix}  $';
  }

  setVal(a: number, b: number, event: string) {
    console.log(a, b, event);
    this.Matrix[a][b] = event;
    this.updateView();
  }

  // Solves Problem with tow way binding by elements created dynamic with ngFor
  trackByFn(index: any, item: any) {
    return index;
  }
}
