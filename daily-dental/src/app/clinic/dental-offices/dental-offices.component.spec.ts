import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalOfficesComponent } from './dental-offices.component';

describe('DentalOfficesComponent', () => {
    let component: DentalOfficesComponent;
    let fixture: ComponentFixture<DentalOfficesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DentalOfficesComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DentalOfficesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
