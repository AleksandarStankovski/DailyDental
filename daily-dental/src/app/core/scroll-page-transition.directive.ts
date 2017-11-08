import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appScrollPageTransition]'
})
export class ScrollPageTransitionDirective {

    @Input() toggleClass: string;

    constructor(
        private elementRef: ElementRef,
        private rendered: Renderer2) { }

    @HostListener('window:scroll', []) onScrollEvent(){
        this.toggleClassTransition();
    }

    toggleClassTransition(): void {
        let isModalOpen = this.elementRef.nativeElement.ownerDocument.all[0].classList.contains('cdk-global-scrollblock');
        let hasClass = this.elementRef.nativeElement.classList.contains(this.toggleClass);
        if (!isModalOpen) {
            if (window.pageYOffset > 0) {
                if (!hasClass) {
                    this.rendered.addClass(this.elementRef.nativeElement, this.toggleClass);
                }
            } else {
                if (hasClass) {
                    this.rendered.removeClass(this.elementRef.nativeElement, this.toggleClass);
                }
            }
        }
    }

}
