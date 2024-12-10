import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import {RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {CoreModule} from "./core/core.module";
import {FaceSnapsModule} from "./face-snaps/face-snaps.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CoreModule,
    FaceSnapsModule,
    RouterOutlet,
    AsyncPipe,
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  interval$!: Observable<number>;

  ngOnInit() {
    this.interval$ = interval(1000);
  }
}
