import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[highlighted]",
  exportAs: "hl",
})
export class HighlightedDirective {
  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  constructor() {
    console.log("Directive created!");
  }

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostBinding("atrr.disabled")
  get disabled() {
    return "true";
  }

  @HostListener("mouseover", ["$event"])
  mouseOver(event: MouseEvent) {
    console.log(event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // Expoe um método para ser utilizado através do "exportAs" no template que é o host dessa diretiva (olhar exemplo em app.component.html).
  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
