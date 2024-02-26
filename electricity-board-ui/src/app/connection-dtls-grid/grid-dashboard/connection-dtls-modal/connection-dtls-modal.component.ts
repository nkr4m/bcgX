import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Connections } from '../../../shared/models/connections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from './../../../shared/services/connection-service/connection.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-connection-dtls-modal',
  templateUrl: './connection-dtls-modal.component.html',
  styleUrls: ['./connection-dtls-modal.component.css']
})
export class ConnectionDtlsModalComponent {
  connDtlsForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConnectionDtlsModalComponent>,
    private fb: FormBuilder,private connService:ConnectionService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.initConnDtlsForm();
  }

  initConnDtlsForm() {

    this.connDtlsForm = this.fb.group({
      'id': [this.data.user?.id,],
      'applicantName': [this.data.user?.applicantName,],
      'gender': [this.data.user?.gender,],
      'district': [this.data.user?.district,],
      'state': [this.data.user?.state,],
      'pincode': [this.data.user?.pincode,],
      'ownership': [this.data.user?.ownership,],
      'govtIdType': { value: this.data.user?.govtIdType, disabled: true },
      'idNumber': { value: this.data.user?.idNumber, disabled: true },
      'category': [this.data.user?.category,],
      'loadApplied': [this.data.user?.loadApplied, [Validators.required, this.validateLoadApplied]],
      'dateOfApplication': { value: this.data.user?.dateOfApplication, disabled: true },
      'dateOfApproval': [this.data.user?.dateOfApproval,],
      'modifiedDate': [this.data.user?.modifiedDate,],
      'status': [this.data.user?.status,],
      'reviewerId': [this.data.user?.reviewerId,],
      'reviewerName': [this.data.user?.reviewerName,],
      'reviewerComments': [this.data.user?.reviewerComments,],
    }
    )
  }


  onClose(): void {
    this.dialogRef.close({
      refreshed: true,
    });
  }

  handleFormSubmit() {
    this.handleFormSaveCall();
    // console.log(this.userDtlsForm.value)
  }

  handleFormSubmitAndClose() {
    this.handleFormSaveCall()
    // console.log(this.data.user)
  }

  handleFormSaveCall() {
    // console.log("reaching")
    // Extract values of disabled controls
    const govtIdTypeValue = this.connDtlsForm.get('govtIdType')?.value;
    const idNumberValue = this.connDtlsForm.get('idNumber')?.value;
    const dateOfApplicationValue = this.connDtlsForm.get('dateOfApplication')?.value;
  

    const formValues = {
      ...this.connDtlsForm.value,
      govtIdType: govtIdTypeValue,
      idNumber: idNumberValue,
      dateOfApplication: dateOfApplicationValue,
    };

    // console.log(formValues)
    this.connService.updateConnectionrDtls(formValues).subscribe(
      (data) => {
        
        this.openSnackBar(`The Connection Details with id #${ this.connDtlsForm.value.id}` + ' was successfully saved');
        this.dialogRef.close({
      refreshed: true,
    }
    );

      },
      (error) => {
        this.openSnackBar(`There was some problem while updating connection id #${ this.connDtlsForm.value.id},` + ' Please try again later.');

        // Handle errors
      }
    );
  }

  validateLoadApplied(control:any) {
    const maxLoad = 20;
    const loadApplied = control.value;

    if (loadApplied > maxLoad) {
      return { 'loadExceeded': true };
    }

    return null;
  }

  openSnackBar(msg: string) {
    // console.log(msg)
    this.snackBar.open(msg, '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'], // Add this line
    });
  }

}
