export function parseTimeString(timeString: string): number {
  const regex = /(\d+)\s*ч\s*(\d*)\s*мин|\s*(\d+)\s*ч|\s*(\d+)\s*мин/;
  const match = timeString.match(regex);

  if (match) {
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  }

  return 0; // Возвращаем 0, если строка не соответствует формату "чч мин" или "чч".
}
