import { RecordDebtor } from './../record-debtor.model';
import { RecordCreditor } from './../record-creditor.model';
import { WalletService } from './../../wallet/wallet.service';
import { Wallet } from './../../wallet/wallet.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-transfer-creditor',
  templateUrl: './dialog-transfer-creditor.component.html',
  styleUrls: ['./dialog-transfer-creditor.component.css']
})
export class DialogTransferCreditorComponent implements OnInit {

  wallets: Wallet[] = [];
  walletOrigin: Wallet = {};
  walletDestiny: Wallet = {};
  valueTransfer?: number;
  monthCurrent: number = 0;

  constructor(private route: ActivatedRoute,
    private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogTransferCreditorComponent>) { }

  ngOnInit(): void {
    this.walletService.listAllCreditor(this.recordService.monthSelected, this.recordService.yearSelected).subscribe(response => {
      this.wallets = response.content;
    });

    this.walletOrigin = this.walletService.wallet;
  }

  confirm() {
    if (this.walletOrigin.uuid != undefined 
      && this.walletOrigin.value != undefined
      && this.walletDestiny.uuid != undefined 
      && this.valueTransfer != undefined 
      && this.valueTransfer > 0 
      && this.valueTransfer <= this.walletOrigin.value) {

      this.recordService.transfer(this.walletOrigin.uuid, this.walletDestiny.uuid, this.valueTransfer).subscribe(() => {
        this.messageService.showMessage("Transferência efetuada com sucesso.")
        this.dialogRef.close();
      })
    } 
  }

}
