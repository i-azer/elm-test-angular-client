import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BookDto, BookInfo, ElmSearchService } from '../services/elm-search-service.service';
import { AppSearchInputComponent } from '../@shared/app-search-input/app-search-input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, AppSearchInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: BookInfo[] = [];
  isLoading = false;
  offset = 0;
  limit = 10;
  currentText = '';


  constructor(private searchService: ElmSearchService) {
  }

  toggleLoading = () => this.isLoading = !this.isLoading;

  // this method will be called on scrolling the page
  appendData = () => {
    this.toggleLoading();
    this.searchService
      .perform(this.offset, this.limit, this.currentText)
      .then(response => {
        this.items = [...this.items, ...response.data.map(x => { 
          let bookInfo:BookInfo = JSON.parse(x.bookInfo);
          bookInfo.bookId = x.bookId;
          return bookInfo;
        })];
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onScroll = () => {
    this.offset = this.offset + this.limit;
    this.appendData();
  }

  onTextChange(changedText: string) {
    console.log(changedText);
    this.currentText = changedText;
    this.searchService
      .perform(this.offset, this.limit, changedText)
      .then(response => {
        this.items = response.data.map(x => { 
          let bookInfo:BookInfo = JSON.parse(x.bookInfo);
          bookInfo.bookId = x.bookId;
          return bookInfo;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
