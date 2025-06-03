import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CourrsesService } from '../../services/courrses.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-avilable-tracks',
  imports: [CommonModule],
  templateUrl: './avilable-tracks.component.html',
  styleUrl: './avilable-tracks.component.css'
})
export class AvilableTracksComponent implements OnInit {
  couresId!: number;
  track: any;
  choosedTrackId: any;
  exams:any[]=[]
  constructor(
    private availableTracks: CourrsesService,
    private activeRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.couresId = Number(this.activeRoute.snapshot.paramMap.get('id') || '')
    console.log(this.couresId)
    this.availableTracks.getCourseById(this.couresId).subscribe(
      {
        next: (data) => this.track = data,
        error: (err) => console.log(err),
      }
    )
  }
  choosedCourseId(trackId: number) {
    this.choosedTrackId = trackId
    this.availableTracks.getExamsByTrackId(this.couresId,this.choosedTrackId).subscribe({
      next:(data:any)=>{
  this.exams=data
  console.log(this.exams)
      }
    })

  }
}


