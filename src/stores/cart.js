import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast.js";
import api from "@/api/index.js";

export const useCartStore = defineStore("cart", () => {
  // --- State ---
  const cartItems = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const giftCard = ref(null);
  const loyaltyCard = ref(null);
  const subtotal = ref(0);
  const discount = ref(0);
  const couponDiscount = ref(0);
  const total = ref(0);

  // Toast composable
  const { success, handleApiError } = useToast();

  // --- Actions ---

  // 1) Get cart (GET /cart/)
  const fetchCart = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/cart/");
      cartItems.value = data.items || [];
      subtotal.value = data.subtotal || 0;
      discount.value = data.discount || 0;
      couponDiscount.value = data.coupon_discount || 0;
      total.value = data.total || 0;
      giftCard.value = data.gift_card || null;
      loyaltyCard.value = data.loyalty_card || null;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch cart";
      handleApiError(err, "Failed to fetch cart");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2) Add item to cart (POST /cart/add_item/)
  const addItem = async (productId, city = "ashgabat", quantity = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/add_item/", {
        product_id: productId,
        city: city,
        quantity: quantity
      });
      await fetchCart(); // Refresh cart data
      success("Added to Cart", "Product has been added to your cart");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to add item to cart";
      handleApiError(err, "Failed to add item to cart");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3) Remove item from cart (DELETE /cart/{id}/remove_item/)
  const removeItem = async (itemId) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/cart/${itemId}/remove_item/`);
      await fetchCart(); // Refresh cart data
      success("Removed from Cart", "Item has been removed from your cart");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove item from cart";
      handleApiError(err, "Failed to remove item from cart");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4) Update item quantity (PATCH /cart/{id}/update_item/)
  const updateItemQuantity = async (itemId, quantity) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/cart/${itemId}/update_item/`, {
        quantity: quantity
      });
      await fetchCart(); // Refresh cart data
      return data;
    } catch (err) {
      error.value = err.message || "Failed to update item quantity";
      handleApiError(err, "Failed to update item quantity");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5) Apply gift card (POST /cart/apply_gift_card/)
  const applyGiftCard = async (giftCardNumber) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/apply_gift_card/", {
        gift_card_number: giftCardNumber
      });
      await fetchCart(); // Refresh cart data
      success("Gift Card Applied", "Gift card has been applied to your cart");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to apply gift card";
      handleApiError(err, "Failed to apply gift card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 6) Apply loyalty card (POST /cart/apply_loyalty_card/)
  const applyLoyaltyCard = async (loyaltyCardId, action = "use_balance") => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/apply_loyalty_card/", {
        loyalty_card_id: loyaltyCardId,
        action: action
      });
      await fetchCart(); // Refresh cart data
      success("Loyalty Card Applied", "Loyalty card has been applied to your cart");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to apply loyalty card";
      handleApiError(err, "Failed to apply loyalty card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 7) Checkout (POST /cart/checkout/)
  const checkout = async (checkoutData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/checkout/", {
        delivery_address: checkoutData.deliveryAddress,
        delivery_note: checkoutData.deliveryNote,
        payment_method: checkoutData.paymentMethod,
        notes: checkoutData.notes,
        delivery_method_id: checkoutData.deliveryMethodId,
        selected_time_slot: checkoutData.selectedTimeSlot,
        preferred_delivery_date: checkoutData.preferredDeliveryDate
      });
      await fetchCart(); // Refresh cart data
      success("Order Placed", "Your order has been placed successfully");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to checkout";
      handleApiError(err, "Failed to checkout");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 8) Clear cart (DELETE /cart/clear/)
  const clearCart = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete("/cart/clear/");
      cartItems.value = [];
      subtotal.value = 0;
      discount.value = 0;
      couponDiscount.value = 0;
      total.value = 0;
      giftCard.value = null;
      loyaltyCard.value = null;
      success("Cart Cleared", "All items have been removed from your cart");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to clear cart";
      handleApiError(err, "Failed to clear cart");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 9) Remove gift card (DELETE /cart/remove-gift-card/)
  const removeGiftCard = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete("/cart/remove-gift-card/");
      await fetchCart(); // Refresh cart data
      success("Gift Card Removed", "Gift card has been removed from your cart");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove gift card";
      handleApiError(err, "Failed to remove gift card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 10) Remove loyalty card (DELETE /cart/remove-loyalty-card/)
  const removeLoyaltyCard = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete("/cart/remove-loyalty-card/");
      await fetchCart(); // Refresh cart data
      success("Loyalty Card Removed", "Loyalty card has been removed from your cart");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove loyalty card";
      handleApiError(err, "Failed to remove loyalty card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Helper methods
  const increaseQuantity = async (itemId) => {
    const item = cartItems.value.find(item => item.id === itemId);
    if (item) {
      await updateItemQuantity(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = async (itemId) => {
    const item = cartItems.value.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      await updateItemQuantity(itemId, item.quantity - 1);
    }
  };

  const getItemCount = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    // State
    cartItems,
    loading,
    error,
    giftCard,
    loyaltyCard,
    subtotal,
    discount,
    couponDiscount,
    total,
    // Actions
    fetchCart,
    addItem,
    removeItem,
    updateItemQuantity,
    applyGiftCard,
    applyLoyaltyCard,
    checkout,
    clearCart,
    removeGiftCard,
    removeLoyaltyCard,
    // Helpers
    increaseQuantity,
    decreaseQuantity,
    getItemCount
  };
});
