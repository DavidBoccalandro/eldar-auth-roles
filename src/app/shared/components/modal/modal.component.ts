import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title = '';
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  content: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((modalData) => {
      if (modalData) {
        this.title = modalData.title;
        this.content = modalData.content;
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  saveModal() {
    this.save.emit();
    this.closeModal();
  }
}
