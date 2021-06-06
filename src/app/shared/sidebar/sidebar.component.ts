import { Component, OnInit } from '@angular/core';
import {GifsService} from "../../gifs/services/gifs.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  get history(){
    return this.gifsService.history;
  }

  deleteHistory(){
    this.gifsService.deleteHistory();
  }

  search(arg: string){
    this.gifsService.searchGifs(arg);
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {

  }

}
