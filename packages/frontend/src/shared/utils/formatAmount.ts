const formatAmount = (amount: number, decimalPlaces = 2): string => {
  // Convert the amount to string with fixed decimal places
  const formattedAmount = amount.toFixed(decimalPlaces);

  // Split thr string into integer and decimal part
  const parts = formattedAmount.split(".");

  const integerPart = parts[0];

  const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

  // Adding Commas to the Integer part
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the part with commas and the decimal part

  return withCommas + decimalPart;
};

export default formatAmount;
