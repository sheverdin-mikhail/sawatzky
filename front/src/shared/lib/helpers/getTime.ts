interface TimeString {
    hours: number;
    minuts: number;
}

export const getTime = (num: number): TimeString => ({
    hours: Math.floor(num / 60),
    minuts: num % 60,
});
