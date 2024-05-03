import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { JoinGroupService } from './join-group.service';
import { GroupDataModel } from './join-group.model';
import { environment } from '../../../environments/environment';
import { PascalCaseDirective } from '../../shared/directives/pascal-case.directive';

@Component({
  selector: 'app-join-group',
  standalone: true,
  imports: [PascalCaseDirective, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FlexLayoutModule, MatProgressBarModule, MatFormFieldModule, RouterLink, NgIf],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.scss'
})
export class JoinGroupComponent {
  groupForm: FormGroup;
  nicknameForm: FormGroup;
  isLoading = false;
  isNew = false;
  nicknameApplied = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private notif: NotificationService,
      private service: JoinGroupService
  ) {
      this.groupForm = this.fb.group({
          groupId: ['', [Validators.required, Validators.minLength(36)]]
      });
      this.nicknameForm = this.fb.group({
          nickname: ['', [Validators.required]]
      });
  }

  onSubmitNickname() {
    if(this.isNew)
    {
      this.createGroup();
    }
    else
    {
      this.gotoChatPage();
    }
  }

  gotoChatPage() {
    localStorage.setItem(environment.n, this.nicknameForm.controls["nickname"].value);
    this.router.navigate(['/chat']);
  }

  onCreateGroup() {
    this.isNew = true;
    this.toggleSetNicknameClass();
  }

  createGroup() {
    this.isLoading = true;
    this.service.create()
      .subscribe({
        next: response => {
          console.log(response);
          this.setGroupData(response);
          this.gotoChatPage();
        },
        error: error => {
          console.log(error);
          this.notif.openSnackBarError(error);
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  setGroupData(gd: GroupDataModel) {
    localStorage.setItem(environment.g, gd.groupId!);
    localStorage.setItem(environment.e, gd.dateTimeExpiration!);
  }

  onJoinGroup() {
    this.isNew = false;
    this.isLoading = true;
    this.service.get(this.groupForm.controls["groupId"].value)
      .subscribe({
        next: response => {
          console.log(response);
          this.setGroupData(response);
          this.nicknameApplied = !this.nicknameApplied;
        },
        error: error => {
          console.log(error);
          this.notif.openSnackBarError(error);
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  toggleSetNicknameClass() {
    this.nicknameApplied = !this.nicknameApplied;
  }
}
