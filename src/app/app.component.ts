import { GifService } from './gif.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-assignment2';

  public trendingGifData: any; // assigning api data or model of trendingGIFs
  public searchData: any; // assigning & rendering value of api data or model of searchedGIFs
  public autocompleteData: any; // assigning api data or model of autocomplete or suggestions
  public searchVal: string; // property used for string interpolation
  public isTrending = false; // property used to render UI or not for trending GIFs
  public isSearch = false; // property used to render UI or not for searched GIFs
  public isHide = false; // property used to hide/unhide auto search

  constructor(private gifService: GifService) { }

  ngOnInit(): void {
    this.getTrending(); // calling getTrending() method whenever component loads
  }

  // getting api data of trending GIFs
  getTrending(): void {
    this.gifService.getTrendingGif().subscribe((response) => {
      this.trendingGifData = response.results;
      this.isTrending = true;
      this.isSearch = false;
    });
  }

  // getting suggestions from autocomplete api
  onAutocomplete(event: { target: { value: string; } }): void {
    const value = event.target.value;
    if (value === '') {
      this.isHide = true;
    } else if (value) {
      this.gifService.getAutocompleteGif(value).subscribe((response) => {
        this.autocompleteData = response.results;
        this.isHide = false;
      });
    }
  }

  // getting search input data from search api
  onSearchValue(event: { target: { value: string; } }): void {
    const value = event.target.value;
    this.gifService.getSearchGif(value).subscribe((response) => {
      this.searchData = response.results;
      this.isSearch = true;
      this.isTrending = false;
    });
  }

  // rendering data of search input from search api
  onReceiveAutoData(item: string): void {
    this.isHide = false;
    this.gifService.getSearchGif(item).subscribe((res) => {
      this.searchData = res.results;
      this.searchVal = item;
      this.isHide = true;
    });
  }

}
