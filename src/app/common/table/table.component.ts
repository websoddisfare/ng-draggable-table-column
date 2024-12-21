import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableColumn } from '../interfaces/table-column.interface';
import {
  moveItemInArray,
  DragDropModule
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  movingCurrentIndex: number = -1;
  onColumnDrop(event: any) {
    this.movingCurrentIndex = -1;
    // moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  // onColumnDragStarted(t:string,event: any) {
  //   // console.log(t,event);
  // }
  // onColumnDragEnded(t:string,event: any) {
  //   this.currentDraggedColumnName = '';
  //   // console.log(t,event);
  // }
  // onColumnDragEntered(t:string,event: any) {
  //   console.log(t,event);
  // }
  // currentDraggedColumnName: string='';
  // onColumnDragMoved(t:string,event: any) {
    //   this.currentDraggedColumnName = event.source.data.name;
    //   // console.log(t,event,this.currentDraggedColumnName);
    // }
    onColumnSorted(event: any) {
      this.movingCurrentIndex = event.currentIndex;
      // moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
      // this.columns=JSON.parse(JSON.stringify(this.columns));
      let currentElement = this.columns[event.previousIndex];
      this.columns.splice(event.previousIndex, 1);
      this.columns.splice(event.currentIndex, 0, currentElement);
        console.log(event,this.movingCurrentIndex,this.columns.map(c=>c.name));
  }
}