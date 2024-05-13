import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {
  private static hubConnection: HubConnection;

  private createConnection(gi: string, nn: string) {
    let params = new HttpParams();
    params = params.set("k", environment.k);
    params = params.set("gi", gi);
    params = params.set("nn", nn);
    ChatGroupService.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.serviceUrl}${environment.chatHubEndpoint}?${params.toString()}`)
      .withAutomaticReconnect()
      .build()
      ChatGroupService.hubConnection.start().then(() => {
        console.log('Feeds started');
      }).catch(err => {
        console.error('Error starting connection:', err);
      });
  }

  disconnect() {
    ChatGroupService.hubConnection.stop()
      .then(() => {
        this.unsubscribe();
      })
      .catch(error => console.error(error));
  }

  unsubscribe() {
    ChatGroupService.hubConnection.off(environment.publishedChatMessageFromSubscriberMethod);
    ChatGroupService.hubConnection.off(environment.publishedGroupSubscribersMethod);
    ChatGroupService.hubConnection.off(environment.publishedPreviousMessagesInGroupMethod);
    ChatGroupService.hubConnection.off(environment.sendChatMessageToGroupAsSubscriberMethod);
  }

  startConnection(gi: string, nn: string) {
    if(ChatGroupService.hubConnection == null) {
      this.createConnection(gi, nn);
    }
  }

  registerOnPublishedChatMessageFromSubscriberMethod(onMessageReceived: (message: any) => void) {
    if (ChatGroupService.hubConnection) {
      ChatGroupService.hubConnection.off(environment.publishedChatMessageFromSubscriberMethod);
      ChatGroupService.hubConnection.on(environment.publishedChatMessageFromSubscriberMethod, (data: any) => {
        onMessageReceived(data);
      });
    }
  }

  registerOnPublishedGroupSubscribersMethod(onMessageReceived: (message: any) => void) {
    if (ChatGroupService.hubConnection) {
      ChatGroupService.hubConnection.off(environment.publishedGroupSubscribersMethod);
      ChatGroupService.hubConnection.on(environment.publishedGroupSubscribersMethod, (data: any) => {
        onMessageReceived(data);
      });
    }
  }

  registerOnPublishedPreviousMessagesInGroupMethod(onMessageReceived: (message: any) => void) {
    if (ChatGroupService.hubConnection) {
      ChatGroupService.hubConnection.off(environment.publishedPreviousMessagesInGroupMethod);
      ChatGroupService.hubConnection.on(environment.publishedPreviousMessagesInGroupMethod, (data: any) => {
        onMessageReceived(data);
      });
    }
  }

  sendMessage(message: any) {
    if (ChatGroupService.hubConnection) {
      ChatGroupService.hubConnection.invoke(environment.sendChatMessageToGroupAsSubscriberMethod, message)
        .catch(err => console.error(err));
    }
  }
}
