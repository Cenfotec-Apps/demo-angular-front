import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public profileService = inject(ProfileService);

  constructor() {
    this.profileService.getUserInfoSignal();
  }
}
