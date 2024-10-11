import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<{
    title: string;
    content: any;
    action: () => void;
  } | null>();
  modalState$ = this.modalSubject.asObservable();

  openModal(title: string, content: any, action: () => void) {
    this.modalSubject.next({ title, content, action });
  }

  closeModal() {
    this.modalSubject.next(null);
  }
}
