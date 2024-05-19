import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="stroke-icon">
      <use attr.xlink:href="assets/svg/icon-sprite.svg#stroke-{{ icon }}"></use>
    </svg>
  `,
})
export class SvgIconComponent {
  @Input('icon') public icon: string | undefined;
}
