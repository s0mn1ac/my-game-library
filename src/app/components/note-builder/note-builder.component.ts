import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-note-builder',
  templateUrl: './note-builder.component.html',
  styleUrls: ['./note-builder.component.scss'],
})
export class NoteBuilderComponent {

  @ViewChild('modal') modal: IonModal;

  @Output() noteEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  public breakpoints: number[] = [0, 0.5];
  public initialBreakpoint = 0.5;

  public value: string;

  public show(value = ''): void {
    this.value = value;
    this.modal.present();
  }

  public onClickModalButton(note: string): void {
    this.noteEventEmitter.emit(note);
    this.modal.dismiss();
  }

}
