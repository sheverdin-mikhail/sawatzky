export function parseTimeString(timeString: string): number {
  const regex = /(\d+)(?:ч\s*(\d+)мин)?/;
  const match = timeString.match(regex);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  }

  return 0; // Возвращаем 0, если строка не соответствует формату "чч мин" или "чч".
}
