import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.scss']
})
export class ArrangementComponent implements OnInit {
  @Input() songName: string;
  @Input() songId: number;
  @Input() arrangementId: number;
  arrangement: any;
  lyricVerses = {};
  editRaw = false;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.arrangement = await this.api.get_arrangement(this.songId, this.arrangementId);

    let currentVerseName = '';
    let currentVerse = '';
    for (const line of this.arrangement.chord_chart.split('\n')) {
      // TODO: add all types of verses
      if (line.startsWith('Verse') || line.startsWith('Chorus') || line.startsWith('Tag')) {
        this.lyricVerses[currentVerseName] = currentVerse;
        currentVerseName = line.trim();
        currentVerse = '';
      } else {
        currentVerse += line + '\n';
      }
    }
    if (currentVerse.length > 0) {
      this.lyricVerses[currentVerseName] = currentVerse;
    }
  }

  raw_lyric_size(lyrics: string): number {
    return lyrics.split('\n').length;
  }
}
