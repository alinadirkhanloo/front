import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddComponent } from '../dialogs/dialog-add/dialog-add.component';
// import { findIndex } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
// import { write } from 'fs';
import { DialogEditComponent } from '../dialogs/dialog-edit/dialog-edit.component';



export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  password:string
}

export interface DialogData {
  animal: string;
  name: string;
}
const ELEMENT_DATA: UserData[] = [
  {id: 1, name: 'Hydrogen', email: 'jolan@gmail.com', username: 'H',password:'12345'},
  {id: 2, name: 'Helium', email:'jolan@gmail.com', username: 'He',password:'12345'},
  {id: 3, name: 'Lithium', email:'jolan@gmail.com', username: 'Li',password:'12345'},
  {id: 4, name: 'Beryllium', email:'jolan@gmail.com', username: 'Be',password:'12345'},
  {id: 5, name: 'Boron', email:'jolan@gmail.com', username: 'B',password:'12345'},
  {id: 6, name: 'Carbon', email:'jolan@gmail.com', username: 'C',password:'12345'},
  {id: 7, name: 'Nitrogen', email:'jolan@gmail.com', username: 'N',password:'12345'},
  {id: 8, name: 'Oxygen', email:'jolan@gmail.com', username: 'O',password:'12345'},
  {id: 9, name: 'Fluorine', email: 'jolan@gmail.com', username: 'F',password:'12345'},
  {id: 10, name: 'Neon', email:'jolan@gmail.com', username: 'Ne',password:'12345'},
  {id: 1, name: 'Hydrogen', email: 'jolan@gmail.com', username: 'H',password:'12345'},
  {id: 2, name: 'Helium', email:'jolan@gmail.com', username: 'He',password:'12345'},
  {id: 3, name: 'Lithium', email:'jolan@gmail.com', username: 'Li',password:'12345'},
  {id: 4, name: 'Beryllium', email:'jolan@gmail.com', username: 'Be',password:'12345'},
  {id: 5, name: 'Boron', email:'jolan@gmail.com', username: 'B',password:'12345'},
  {id: 6, name: 'Carbon', email:'jolan@gmail.com', username: 'C',password:'12345'},
  {id: 7, name: 'Nitrogen', email:'jolan@gmail.com', username: 'N',password:'12345'},
  {id: 8, name: 'Oxygen', email:'jolan@gmail.com', username: 'O',password:'12345'},
  {id: 9, name: 'Fluorine', email: 'jolan@gmail.com', username: 'F',password:'12345'},
  {id: 10, name: 'Neon', email:'jolan@gmail.com', username: 'Ne',password:'12345'},
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ['select','id','name','email','username','password'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialog: MatDialog) {}
  id: number;
  name: string;
  username: string;
  email: string;
  password:string

   ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openAddDialog(): void {
    // const user=this.dataSource[this.selection.selected.]
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '550px', height:'550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result;
    });
  }

  openEditDialog(): void{
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '550px', height:'550px',
      data: {name: this.name, username: this.username,email:this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result;
    });
  }

  setdata(){
    this.dataSource.data.forEach(row => {
      if(this.selection.isSelected(row)){
        this.id=row.id
        this.name=row.name
        this.username=row.username
        this.email=row.email 
      }
    });
  }
}


// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = ELEMENT_DATA[Math.round(Math.random() * (ELEMENT_DATA.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };

  



