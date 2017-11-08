import { Injectable } from '@angular/core';

@Injectable()
export class PageWallpaperService {

    getPageWallpaper(pageUrl): string {
        let image: string;
        switch(pageUrl) {
            case '/home': {
                image = 'home.jpg'
                break;
            }
            case '/about-us/clinic-info': {
                image = 'clinic.jpg'
                break;
            }
            case '/about-us/dental-offices': {
                image = 'dental-offices.jpg'
                break;
            }
            case '/about-us/staff': {
                image = 'staff.jpg'
                break;
            }
            case '/about-us/price-list': {
                image = 'price-list.jpg'
                break;
            }
            case '/about-us/staff': {
                image = 'staff.jpg'
                break;
            }
            case '/patients': {
                image = 'patients.jpg'
                break;
            }
            case '/reception': {
                image = 'reception.jpg'
                break;
            }
            default: {
                image = 'default.jpg'
            }
        }
        return image;
    }

}
