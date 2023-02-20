import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3lUpu2PkM9ATzSqvf07PXc3sGPFRUKSL';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public results: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem( 'historial' )!);
    this.results = JSON.parse( localStorage.getItem( 'results' )!);

  }

  searchGifs( query: string){
  
    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
    }
    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>( `${ this.urlService}/search`, { params } )
        .subscribe( ( resp: SearchGifsResponse ) => {
          this.results = resp.data;
          localStorage.setItem( 'results', JSON.stringify( this.results ) );
        });
  }
}
