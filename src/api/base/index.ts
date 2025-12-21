export const calculateRate = (lpr?: number, bp?: number): string => {
  if (lpr === undefined || lpr === null || bp === undefined || bp === null) {
    return '-';
  }

  const actualRate = lpr + (bp / 100);

  const formattedRate = actualRate.toFixed(2);

  return isNaN(Number(formattedRate)) ? '-' : `${formattedRate}`;
};