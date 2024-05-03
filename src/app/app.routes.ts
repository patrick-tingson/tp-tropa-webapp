import { Routes } from '@angular/router';
import { JoinGroupComponent } from './features/join-group/join-group.component';
import { ChatGroupComponent } from './features/chat-group/chat-group.component';

export const routes: Routes = [
    {path: '', component: JoinGroupComponent },
    {path: 'chat', component: ChatGroupComponent },
];
