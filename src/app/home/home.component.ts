import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../common/table/table.component";
import { DataService } from '../common/data/data.service';
import { Player } from '../common/interfaces/player.interface';
import { TableColumn } from '../common/interfaces/table-column.interface';
import { Table2Component } from "../common/table2/table2.component";

@Component({
  selector: 'app-home',
  imports: [Table2Component],
  providers: [DataService],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data!:any;
  playerColumns:TableColumn[] = [
    {data: 'id', title: 'Sl. No.', name: 'id'},
    {data: 'sku', title: 'SKU', name: 'sku'},
    {data: 'thumbnail', title: 'Thumb', name: 'thumbnail',type:'image'},
    {data: 'title', title: 'Name', name: 'title'},
    {data: 'warrantyInformation', title: 'Warranty', name: 'warrantyInformation'},
    {data: 'tags', title: 'Tags', name: 'tags'},
    {data: 'weight', title: 'Weight', name: 'weight'},
    {data: 'price', title: 'RenPrice', name: 'price', render: (data: any) => '$' + data, className: 'text-end'},
    {data: 'price', title: 'Price', name: 'price'},
    {data: 'minimumOrderQuantity', title: 'minimumOrderQuantity', name: 'minimumOrderQuantity'},
    {data: 'description', title: 'Description', name: 'description'}
  ]
  constructor(private dataService: DataService) { }
  ngOnInit() {
    let player$ = this.dataService.getdata().subscribe(data => {
      this.data = data;
      player$.unsubscribe();
    });
  }
}
