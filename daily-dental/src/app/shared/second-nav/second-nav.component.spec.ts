import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondNavComponent } from './second-nav.component';

describe('SidebarComponent', () => {
    let component: SecondNavComponent;
    let fixture: ComponentFixture<SecondNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SecondNavComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecondNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
