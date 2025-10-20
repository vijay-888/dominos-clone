import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appOdometer]'
})
export class OdometerDirective implements OnChanges {
    @Input('appOdometer') targetValue: number = 0;
    @Input() durationMs: number = 1200;
    @Input() decimals: number = 0;

    private animationFrameId: number | null = null;
    private startTimestamp: number | null = null;
    private startValue: number = 0;
    private lastRenderedValue: string | null = null;

    constructor(private host: ElementRef<HTMLElement>) { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('targetValue' in changes || 'appOdometer' in changes) {
            this.startAnimation();
        }
    }

    private startAnimation(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        const element = this.host.nativeElement;
        const currentText = element.innerText.trim();
        const parsed = Number(currentText.replace(/[^0-9.\-]/g, ''));
        this.startValue = isNaN(parsed) ? 0 : parsed;
        this.startTimestamp = null;

        const animate = (timestamp: number) => {
            if (this.startTimestamp === null) {
                this.startTimestamp = timestamp;
            }

            const elapsed = timestamp - this.startTimestamp;
            const progress = Math.min(elapsed / Math.max(1, this.durationMs), 1);
            const eased = this.easeOutCubic(progress);
            const current = this.startValue + (this.targetValue - this.startValue) * eased;
            const formatted = this.formatValue(current);

            if (formatted !== this.lastRenderedValue) {
                element.innerText = formatted;
                this.lastRenderedValue = formatted;
            }

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                // Ensure final value is precise
                const finalText = this.formatValue(this.targetValue);
                if (finalText !== this.lastRenderedValue) {
                    element.innerText = finalText;
                    this.lastRenderedValue = finalText;
                }
                this.animationFrameId = null;
            }
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    private formatValue(value: number): string {
        const factor = Math.pow(10, this.decimals);
        const rounded = Math.round(value * factor) / factor;
        return this.decimals > 0 ? rounded.toFixed(this.decimals) : Math.round(rounded).toString();
    }

    private easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }
}


