import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalOptions } from 'src/app/shared/interfaces/modal-options.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  @ViewChild('modal') modal: IonModal;

  public breakpoints: number[] = [0, 0.3];
  public initialBreakpoint = 0.3;

  public modalOptions: ModalOptions;

  public show(nextLevelModalOptions: ModalOptions): void {
    this.modalOptions = nextLevelModalOptions;
    this.modal.present();
  }

  public onClickModalButton(): void {
    this.modalOptions.command();
    this.modal.dismiss();
  }

}
