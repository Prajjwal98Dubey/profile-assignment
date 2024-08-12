export const discountedPrice = (originalPrice,discount)=>{
    return originalPrice * (1 - (discount/100))
}