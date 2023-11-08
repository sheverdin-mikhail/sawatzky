export const getDateString = (date: Date, short = false) => {
    const options: Intl.DateTimeFormatOptions = short
        ? { year: 'numeric', month: '2-digit', day: '2-digit' }
        : { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('ru-Ru', options);
};
