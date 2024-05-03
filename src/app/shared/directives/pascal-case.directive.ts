import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPascalCase]',
  standalone: true
})
export class PascalCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\b\w/g, match => match.toUpperCase());
  }
}
