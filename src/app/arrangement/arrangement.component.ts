import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.scss']
})
export class ArrangementComponent implements OnInit {
  @Input() songId;
  @Input() arrangementId;

  constructor(private api: ApiService) { }

  ngOnInit() {

  }

}
