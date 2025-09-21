export const calculateAge = (birthDate: string | Date): number => {
  const d = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
};

export const isAdult = (birthDate?: string | Date): boolean => {
  if (!birthDate) return false;
  return calculateAge(birthDate) >= 18;
};