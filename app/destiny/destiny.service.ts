import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';

// https://angular.io/guide/http#adding-headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': '...'
  })
}

@Injectable()
export class DestinyService {

  constructor() { }

}