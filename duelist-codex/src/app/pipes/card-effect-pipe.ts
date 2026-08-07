import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cardEffect',
})
export class CardEffectPipe implements PipeTransform {
    transform(value: unknown): string {
        if (!Array.isArray(value) || value.length === 0) {
            return 'Efecto:';
        }

        const types = value.filter((item): item is string => typeof item === 'string' && item.trim() !== '',);

        return types.length > 0
            ? `[${types.join('/')}]`
            : 'Efecto:';
    }
}