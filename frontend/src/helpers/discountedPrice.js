export const discountedPrice = (originalPrice, discount) => {
  return (originalPrice * 83 * (1 - discount / 100)).toFixed(2);
};
