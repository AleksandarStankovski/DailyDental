import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDetailsFormComponent } from './clinic-details-form.component';

describe('ClinicDetailsFormComponent', () => {
    let component: ClinicDetailsFormComponent;
    let fixture: ComponentFixture<ClinicDetailsFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ClinicDetailsFormComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicDetailsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
