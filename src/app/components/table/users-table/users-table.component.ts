import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';



export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  password:string
}

/** Constants used to fill up our data base. */
// const COLORS: PeriodicElement[]  = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: PeriodicElement[]  = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

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

  displayedColumns: string[] = ['select','id','name','email','username','password','add'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor() {}

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

  



