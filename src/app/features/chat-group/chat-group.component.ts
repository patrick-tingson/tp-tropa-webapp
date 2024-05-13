import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, NgModule, NgZone, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { environment } from '../../../environments/environment';
import { PascalCaseDirective } from '../../shared/directives/pascal-case.directive';
import { ChatMessageModel } from './chat-group.model';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { v4 as uuidv4 } from 'uuid'; 
import { ChatGroupService } from './chat-group.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [FormsModule, MatToolbarModule, MatIconModule, MatGridListModule, CommonModule, NgFor, MatNativeDateModule, PascalCaseDirective, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FlexLayoutModule, MatProgressBarModule, MatFormFieldModule, RouterLink, NgIf],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss'
})
export class ChatGroupComponent {
  isLoading = false;
  nickname = "";
  groupId = "";
  bindedMessage = "";
  members: string[] = []
  messages: ChatMessageModel[] = []
  @ViewChild('scrollableContent') scrollableContent: any;

  constructor(
    private router: Router, 
    private _ngZone: NgZone,
    private service: ChatGroupService,
    private clipboard: Clipboard,
    private notif: NotificationService,
    private renderer: Renderer2
  ) {
   
  }

  onShareLink() {
    try {
      if(this.clipboard.copy(`${window.location.origin}?g=${this.groupId}`))
      {
        this.notif.openSnackBarSuccess("Share link copied to clipboard.");
      }
    } catch (error) {
      this.notif.openSnackBarError(error);
    }
  }

  onLeaveGroup() {
    localStorage.removeItem(environment.g);
    localStorage.removeItem(environment.n);
    localStorage.removeItem(environment.e);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.nickname = localStorage.getItem(environment.n) || "";
    this.groupId = localStorage.getItem(environment.g) || "";
    this.service.startConnection(
      localStorage.getItem(environment.g)!,
      localStorage.getItem(environment.n)!
    );
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.service.registerOnPublishedPreviousMessagesInGroupMethod(messages => {
      this.messages = messages;
      this.service.registerOnPublishedChatMessageFromSubscriberMethod(message => {
        this.addDataInSource(message)
      });
    });
    this.service.registerOnPublishedGroupSubscribersMethod(members => {
      this.members = members
    });
    this.isLoading = false;
  }
  
  ngAfterViewChecked() {
    this.onScrollDown();
  }

  addDataInSource(d: ChatMessageModel) {
    if(d.id != null) {
      if(this.messages.find(f => f.id == d.id) == undefined)
      {
        this._ngZone.run(() => {
          this.messages.push(d);
        });
      }
    }
  }

  sendMessage() {
    const m = {
      id: uuidv4(),
      dateTimeSent: new Date().toISOString(),
      groupId: this.groupId,
      message: this.bindedMessage,
      nickname: this.nickname
    }
    this.addDataInSource(m);
    this.service.sendMessage(m);
    this.bindedMessage = "";
  }

  onScrollDown() {
    if (this.scrollableContent) {
      this.renderer.setProperty(this.scrollableContent.nativeElement, 'scrollTop', this.scrollableContent.nativeElement.scrollHeight);
    }
  }
}
