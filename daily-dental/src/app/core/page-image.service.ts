import { Injectable } from '@angular/core';

@Injectable()
export class PageImageService {

  image: string

  constructor() { }

  getPageImage(pageUrl): string {
    switch(pageUrl) {
        case '/home': {
            this.image = 'home.jpg'
            break;
        }
        case '/about-us/clinic-info': {
            this.image = 'home.jpg'
            break;
        }
        case '/about-us/dental-offices': {
            this.image = 'home.jpg'
            break;
        }
        case '/about-us/staff': {
            this.image = 'staff'
            break;
        }
        case '/about-us/price-list': {
            this.image = 'price-list'
            break;
        }
        case '/about-us/staff': {
            this.image = 'staff'
            break;
        }
        case '/patients': {
            this.image = 'patients'
            break;
        }
        case '/reception': {
            this.image = 'reception'
            break;
        }
        default: {
            this.image = 'Default'
        }
    }
    return this.image;
  }

}
