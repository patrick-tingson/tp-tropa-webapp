import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JoinGroupService } from './join-group/join-group.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [JoinGroupService]
})
export class FeaturesModule {}
