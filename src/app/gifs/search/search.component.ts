import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ){}

  buscar ( ){
    const valor = this.txtSearch.nativeElement.value;

    if( valor.trim(). length === 0){
      return;
    }

    this.gifsService.searchGifs( valor );

    this.txtSearch.nativeElement.value = '';
  }
}
