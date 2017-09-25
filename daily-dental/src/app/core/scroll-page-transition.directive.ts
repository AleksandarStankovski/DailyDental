import { 
    Directive,
    ElementRef,
    HostListener, 
    Renderer2,
    Input } from '@angular/core';

@Directive({
  selector: '[appScrollPageTransition]'
})
export class ScrollPageTransitionDirective {

    @Input() toggleClass: string;

    constructor(
        private el: ElementRef,
        private rendered: Renderer2) { }

    @HostListener('window:scroll', []) onScrollEvent(){
        this.toggleClassTransition();
    }

    toggleClassTransition(): void {
        let isModalOpen = this.el.nativeElement.ownerDocument.all[0].classList.contains('cdk-global-scrollblock');
        let hasClass = this.el.nativeElement.classList.contains(this.toggleClass);
        if (!isModalOpen) {
            if (window.pageYOffset > 0) {
                if (!hasClass) {
                    this.rendered.addClass(this.el.nativeElement, this.toggleClass);
                }
            } else {
                if (hasClass) {
                    this.rendered.removeClass(this.el.nativeElement, this.toggleClass);
                }
            }
        }
    }
}
