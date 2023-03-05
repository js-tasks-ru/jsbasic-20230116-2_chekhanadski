export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) { 
    
    if (!product) {
      return;
    }
    
    let target = this.cartItems.findIndex(item => item.product.id === product.id);
    if (target >= 0) {
      this.cartItems[target].count += 1;
    } else {
      this.cartItems.push({ product: product, count: 1 });
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let targetIndex = this.cartItems.findIndex(item => item.product.id === productId);

    if (this.cartItems[targetIndex].count > 0) {
      let target = this.cartItems.find(item => item.product.id === productId).count += (amount);
    }
    if (this.cartItems[targetIndex].count === 0) {
      this.cartItems.splice(targetIndex, 1);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let elem of this.cartItems) {
      totalCount += elem.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let elem of this.cartItems) {
      totalPrice += elem.product.price * elem.count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}