import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ElmSearchService {
  perform(offset = 1, limit = 10,searchSlug=''){
    return axios.get<BookDto[]>(`http://localhost:5226/fetch?offset=${offset}&limit=${limit}&SearchSlug=${searchSlug}`);
  }
}

export interface BookDto {
  bookId:Number
  bookInfo:string
}

export interface BookInfo{
  bookId:Number
  BookTitle: string
  BookDescription: string
  Author: string
  PublishDate: Date
  CoverBase64: string
}