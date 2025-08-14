function formatAmount(value: string | number): string {
    if (value === null || value === undefined || value === '') return '';

    const number = typeof value === 'string' ? parseFloat(value.replace(/,/g, '.')) : value;

    if (isNaN(number)) return '';

    const fixed = number.toFixed(3);

    const [intPart, decPart] = fixed.split('.');

    const intWithDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return decPart ? `${intWithDots},${decPart}` : intWithDots;
}

export default formatAmount;
