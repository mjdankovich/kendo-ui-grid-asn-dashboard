import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './model';
import { EditService } from './edit.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  template: `
      <kendo-grid #grid
          [data]="view | async"
          [height]="533"
          [pageSize]="gridState.take" [skip]="gridState.skip" [sort]="gridState.sort"
          [pageable]="true" [sortable]="true"
          (dataStateChange)="onStateChange($event)"
          (cellClick)="cellClickHandler($event)"
          (cellClose)="cellCloseHandler($event)"
          (cancel)="cancelHandler($event)"
          (save)="saveHandler($event)"
          (remove)="removeHandler($event)"
          (add)="addHandler($event)"
          [navigable]="true"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand>Add new</button>
            <button class='k-button' [disabled]="!editService.hasChanges()" (click)="saveChanges(grid);">Save Changes</button>
            <button class='k-button' [disabled]="!editService.hasChanges()" (click)="cancelChanges(grid);">Cancel Changes</button>
        </ng-template>
        <kendo-grid-column field="ASNTYPE" title="ASN TYPE" width="100" [locked]="true">
            </kendo-grid-column>
            <kendo-grid-column field="ASNCODE" title="ASN CODE" width="100" [locked]="true">
            </kendo-grid-column>
            <kendo-grid-column field="P/C" title="P/C" width="80" [locked]="true">
            </kendo-grid-column>
            <kendo-grid-column field="F/U" title="F/U" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="A/C" title="A/C" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="A/R" title="A/R" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="PART" title="PART" width="100">
            </kendo-grid-column>
            <kendo-grid-column field="PARTNAME" title="PART NAME" width="160">
            </kendo-grid-column>
            <kendo-grid-column field="DUNS" title="DUNS" width="100">
            </kendo-grid-column>
            <kendo-grid-column field="SUPPLIERNAME" title="SUPPLIER NAME" width="160">
            </kendo-grid-column>
            <kendo-grid-column field="C/C" title="C/C" width="150">
            </kendo-grid-column>
            <kendo-grid-column field="QTY" title="QTY" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="CS" title="CS" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="SHIPDATE" title="SHIP DATE" width="120">
            </kendo-grid-column>
            <kendo-grid-column field="EDA" title="EDA" width="120">
            </kendo-grid-column>
            <kendo-grid-column field="ETA" title="ETA" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="ST" title="ST" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="SID" title="SID" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="PONUMBER" title="PO NUMBER" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="SHIPCOMMENT" title="SHIP COMMENT" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="M" title="M" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="NM" title="NM" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="UM" title="UM" width="80">
            </kendo-grid-column>
            
            <kendo-grid-column field="NCX" title="NCX" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="ROUTE" title="ROUTE" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="CARRIER" title="CARRIER" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="TRAILER" title="TRAILER" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="MANIFEST" title="MANIFEST" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="SCAC" title="SCAC" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="DOCK" title="DOCK" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="DOCKSPOT" title="DOCK SPOT" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="NUMBERCONT" title="NUMBER CONT" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="TOTALPARTWT" title="TOTAL PART WT" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="PRO" title="PRO" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="PTA" title="PTA" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="RECVATDUNS" title="RECV AT DUNS" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="ERD" title="ERD" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="EDATOERDVARIANCE" title="EDA TO ERD VARIANCE" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="ASN/SCHPK" title="ASN/SCH PK" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="ANS/STDPK" title="ASN/STD PK" width="80">
            </kendo-grid-column>

      </kendo-grid>
  `
})
export class AppComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public changes: any = {};

    constructor(private formBuilder: FormBuilder, public editService: EditService) {
    }

    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));

        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }

    public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
        if (!isEdited) {
            sender.editCell(rowIndex, columnIndex, this.createFormGroup(dataItem));
        }
    }

    public cellCloseHandler(args: any) {
        const { formGroup, dataItem } = args;

        if (!formGroup.valid) {
             // prevent closing the edited cell if there are invalid values.
            args.preventDefault();
        } else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    }

    public addHandler({ sender }) {
        sender.addRow(this.createFormGroup(new Product()));
    }

    public cancelHandler({ sender, rowIndex }) {
        sender.closeRow(rowIndex);
    }

    public saveHandler({ sender, formGroup, rowIndex }) {
        if (formGroup.valid) {
            this.editService.create(formGroup.value);
            sender.closeRow(rowIndex);
        }
    }

    public removeHandler({ sender, dataItem }) {
        this.editService.remove(dataItem);

        sender.cancelCell();
    }

    public saveChanges(grid: any): void {
        grid.closeCell();
        grid.cancelCell();

        this.editService.saveChanges();
    }

    public cancelChanges(grid: any): void {
        grid.cancelCell();

        this.editService.cancelChanges();
    }

    public createFormGroup(dataItem: any): FormGroup {
        return this.formBuilder.group({
            'ProductID': dataItem.ProductID,
            'ProductName': [dataItem.ProductName, Validators.required],
            'UnitPrice': dataItem.UnitPrice,
            'UnitsInStock': [dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])],
            'Discontinued': dataItem.Discontinued
        });
    }
}
