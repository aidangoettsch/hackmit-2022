export function truncate(str: string) {
  let len = 58;
  return str.substring(0, len) + (str.length > len ? "..." : "");
}

export function willTruncate(str: string): boolean {
  return str.length > 58;
}

// export function sumCart(cart: Cart): number {
//   return cart.reduce((acc, item) => acc + item.price, 0);
// }
