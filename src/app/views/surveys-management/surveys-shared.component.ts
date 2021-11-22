import { Component, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "hello",
  template: `
    <div style="width:700px">
      <h2 mat-dialog-title>Đường dẫn khảo sát</h2>
      <div mat-dialog-content >
 
          <p style = "border-style: groove;">{{ linkShare }}</p>
      </div>
      <div mat-dialog-actions align="end">
        <span>
        
          <button
            type="button"
            mat-stroked-button
            color="primary"
            (click)="CloseDialog()"
          >
            Close
          </button>
        </span>
      </div>
    </div>
  `
})
export class ShareDialog {
  linkShare: string;
  constructor(
    private _mdr: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.linkShare = data.linkShare;
  }
  CloseDialog() {
    this._mdr.close(false)
  }
}
