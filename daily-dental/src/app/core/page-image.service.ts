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
            this.image = 'clinic.jpg'
            break;
        }
        case '/about-us/dental-offices': {
            this.image = 'dental-offices.jpg'
            break;
        }
        case '/about-us/staff': {
            this.image = 'staff.jpg'
            break;
        }
        case '/about-us/price-list': {
            this.image = 'price-list.jpg'
            break;
        }
        case '/about-us/staff': {
            this.image = 'staff.jpg'
            break;
        }
        case '/patients': {
            this.image = 'patients.jpg'
            break;
        }
        case '/reception': {
            this.image = 'staff-2.jpg'
            break;
        }
        default: {
            this.image = 'clinic-6.jpg'
        }
    }
    return this.image;
  }

}
