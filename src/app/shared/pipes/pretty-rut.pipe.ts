import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyRut',
})
export class PrettyRutPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return '';

    // Solo dígitos
    let rut = value.toString().replace(/\D/g, '');

    if (rut.length < 7) return rut; // Demasiado corto para ser válido

    const body = rut;
    const dv = this.calculateDV(body);

    const formattedBody = body
      .split('')
      .reverse()
      .reduce((acc, digit, i) => {
        return i > 0 && i % 3 === 0 ? digit + '.' + acc : digit + acc;
      }, '');

    return `${formattedBody}-${dv}`;
  }

  private calculateDV(rut: string): string {
    let sum = 0;
    let multiplier = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
      sum += parseInt(rut[i], 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = 11 - (sum % 11);
    if (remainder === 11) return '0';
    if (remainder === 10) return 'K';
    return remainder.toString();
  }
}
