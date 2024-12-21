import { Component, HostListener, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { TableColumn } from '../interfaces/table-column.interface';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table2',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})
export class Table2Component implements AfterViewInit {
  rowHeight: number[] | string[] = [];
  data: any[] = [];
  columns: TableColumn[] = [];
  calculatingRowHeight: boolean = false;
  minRowHeight: number = 25;
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() id: string = Math.random().toString(36).substring(7);

  @Input('data') set dataSetter(d: any[]) {
    this.data = d;
    this.setRowData();
  }

  @Input('columns') set columnsSetter(c: TableColumn[]) {
    this.columns = c;
    this.setRowData();
  }

  ngAfterViewInit() {
    this.calculateRowHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateRowHeight();
  }

  setRowData() {
    this.columns.map((column: TableColumn) => {
      column.rowDatas = this.data.map((row: any) => row[column.data]);
      if(typeof column.render != 'function'){
        column.render = (data: any) => data;
      }
      return column;
    });
    this.calculateRowHeight();
  }

  onColumnDrop(event: any) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.cdr.detectChanges();
  }

  getRowHeight(index: number) {
    if (this.calculatingRowHeight) {
      return 'min-content';
    }
    return typeof this.rowHeight[index] === 'string' ? this.rowHeight[index] : `${this.rowHeight[index]}px`;
  }

  calculateRowHeight() {
    // this.rowHeight = this.data.map(() => 'auto');
    if(!this.calculatingRowHeight){
      setTimeout(() => {
        this.calculatingRowHeight = true;
        let lsri = '';
        for (let rowi = 0; rowi <= this.data.length; rowi++) {
          let rowHeight = this.minRowHeight;
          for (let coli = 0; coli < this.columns.length; coli++) {
            lsri=`#table2-${this.id}-col-${coli}-row-${rowi}`;
            let cell = document.querySelector(`#table2-${this.id}-col-${coli}-row-${rowi}`);
            if (cell && typeof cell=='object') {
              cell.classList.add('isCalculating');
              // if(rowi === 1){
              //   console.log(coli,rowi,rowHeight, cell.scrollHeight, cell.clientHeight);
              // }
              rowHeight = Math.max(rowHeight, cell.scrollHeight || 0);
              cell.classList.remove('isCalculating');
            }
          }
          this.rowHeight[rowi] = rowHeight;
        }
        this.calculatingRowHeight = false;
        this.cdr.detectChanges();
      }, 0);
    }
  }
}
