




export const getDateString = (date: Date, short: boolean=false) => {

    const options: Intl.DateTimeFormatOptions = short ? {year: 'numeric', month: '2-digit', day: 'numeric'} : { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('ru-Ru', options)
}