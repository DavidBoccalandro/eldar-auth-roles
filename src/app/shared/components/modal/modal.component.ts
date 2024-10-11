import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() closable = true;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  ngOnDestroy(): void {
    this.isVisible = false;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  saveModal() {
    this.isVisible = false;
    this.save.emit();
    this.closeModal();
  }
}
