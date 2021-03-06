import {Component, OnInit} from '@angular/core';
import {AlbumService} from './album.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private albumService: AlbumService) {
  }

  albums = [];
  currentAlbum: any = {};
  tracks = [];

  currentAlbumTracks(id) {
    this.albumService.getAlbumTracks(id).subscribe((response: any) => {
      const {items} = response;
      this.tracks = items;
    });
  }

  onAlbumChange(album: any) {
    const {id} = album;
    this.currentAlbum = album;
    this.currentAlbumTracks(id);
  }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((response: any) => {
      const {albums} = response;
      const {items} = albums;
      this.currentAlbum = items[0];
      this.albums = items;
      this.currentAlbumTracks(this.currentAlbum.id);
    });
  }
}
