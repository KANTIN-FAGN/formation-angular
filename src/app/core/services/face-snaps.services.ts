import {Injectable} from "@angular/core";
import {FaceSnap} from "../core/models/face-snap";
import {SnapType} from "../core/models/snap-type.type";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {}

  getFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: SnapType): Observable<FaceSnap> {
     return this.getFaceSnapById(faceSnapId).pipe(
       map(faceSnap => ({
         ...faceSnap,
         snaps: faceSnap.snaps + (snapType === "snap" ? 1 : -1)
       })),
       switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
     )
  }
  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getFaceSnaps().pipe(
      map(faceSnaps => ({
        id: faceSnaps.length + 1,
        title: formValue.title,
        description: formValue.description,
        imageUrl: formValue.imageUrl,
        location: formValue.location,
        snaps: 0
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap))
    )
  }
}
