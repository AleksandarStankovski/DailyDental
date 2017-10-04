import { 
    Directive,
    ElementRef,
    Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTransitionElement]'
})
export class TransitionElementDirective {

    constructor(
        private el: ElementRef,
        private rendered: Renderer2) { 
            setTimeout(() => {
                this.rendered.addClass(this.el.nativeElement, 'finish-transition');
            }, 200); 
        }

}
