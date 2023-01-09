export const getRemainingDays = (data) => {
  const days = Math.round(
    (Date.parse(data) - Date.parse(new Date())) / 86400000,
  );
  if (!Number.isNaN(days)) {
    return `${days} days`;
  }

  return `0 days`;
};
