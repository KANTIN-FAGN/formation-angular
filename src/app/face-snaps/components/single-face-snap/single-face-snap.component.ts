import { Component, OnInit } from '@angular/core';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgIf,
  NgStyle,
  UpperCasePipe,
} from "@angular/common";
import { FaceSnapsService } from "../../../core/services/face-snaps.services";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FaceSnap } from "../../../core/models/face-snap";
import { Observable, tap } from "rxjs";

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'], // Plural corrected
})
export class SingleFaceSnapComponent implements OnInit {
  snapButtonText!: string;
  userHasSnapped!: boolean;
  faceSnap$!: Observable<FaceSnap>;

  constructor(
    private faceSnapService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  onSnap(id: string | undefined): void {
    const faceSnapId = +this.route.snapshot.params['id']; // Convert to number
    if (this.userHasSnapped) {
      this.unSnap(faceSnapId);
    } else {
      this.snap(faceSnapId);
    }
  }

  private prepareInterface(): void {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  private snap(faceSnapId: number): void {
    this.faceSnapService
      .snapFaceSnapById(faceSnapId, "snap")
      .pipe(
        tap(() => {
          this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
          this.userHasSnapped = true;
          this.snapButtonText = 'Unsnap';
        })
      )
      .subscribe();
  }

  private unSnap(faceSnapId: number): void {
    this.faceSnapService
      .snapFaceSnapById(faceSnapId, "unsnap")
      .pipe(
        tap(() => {
          this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
          this.userHasSnapped = false;
          this.snapButtonText = 'Oh Snap!';
        })
      )
      .subscribe();
  }

  private getFaceSnap(): void {
    const faceSnapId = +this.route.snapshot.params['id']; // Convert to number
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
  }
}
