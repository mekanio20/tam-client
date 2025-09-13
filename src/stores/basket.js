import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast.js";
import api from "@/api/index.js";

export const useBasketStore = defineStore("basket", () => {
  // --- State ---
  const customerCards = ref([]);
  const currentCard = ref({});
  const loading = ref(false);
  const error = ref(null);
  
  // Toast composable
  const { success, error: showError, handleApiError } = useToast();

  // --- Actions ---

  // 1. Create a new customer card (POST /cards/customer-cards/)
  const createCustomerCard = async (cardData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cards/customer-cards/", {
        customer_id: cardData.customer_id,
        loyalty_card_id: cardData.loyalty_card_id || 0,
        card_number: cardData.card_number,
        expiry_date: cardData.expiry_date,
        notes: cardData.notes || "",
        is_active: cardData.is_active !== undefined ? cardData.is_active : true,
      });
      customerCards.value.push(data);
      success("Card Added", "Customer card has been added successfully");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to create customer card";
      handleApiError(err, "Failed to create customer card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2. Get customer cards (GET /cards/customer-cards/)
  const fetchCustomerCards = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/cards/customer-cards/", {
        params: queryParams,
      });
      customerCards.value = data.results || data;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch customer cards";
      handleApiError(err, "Failed to fetch customer cards");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3. Get customer cards by customer_id and card_id
  const fetchCustomerCardsByQuery = async (customerId, cardId = null) => {
    loading.value = true;
    error.value = null;
    try {
      const params = { customer_id: customerId };
      if (cardId) {
        params.card_id = cardId;
      }
      
      const { data } = await api.get("/cards/customer-cards/", {
        params,
      });
      customerCards.value = data.results || data;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch customer cards";
      handleApiError(err, "Failed to fetch customer cards");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4. Get specific customer card detail (GET /cards/customer-cards/{id}/)
  const fetchCustomerCardDetail = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/cards/customer-cards/${id}/`);
      currentCard.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch card details";
      handleApiError(err, "Failed to fetch card details");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5. Update customer card (PUT /cards/customer-cards/{id}/)
  const updateCustomerCard = async (id, cardData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.put(`/cards/customer-cards/${id}/`, {
        customer_id: cardData.customer_id,
        loyalty_card_id: cardData.loyalty_card_id || 0,
        card_number: cardData.card_number,
        expiry_date: cardData.expiry_date,
        notes: cardData.notes || "",
        is_active: cardData.is_active !== undefined ? cardData.is_active : true,
      });
      
      // Update the card in the local array
      const index = customerCards.value.findIndex(card => card.id === id);
      if (index !== -1) {
        customerCards.value[index] = data;
      }
      
      // Update current card if it's the same
      if (currentCard.value.id === id) {
        currentCard.value = data;
      }
      
      success("Card Updated", "Customer card has been updated successfully");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to update customer card";
      handleApiError(err, "Failed to update customer card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 6. Partially update customer card (PATCH /cards/customer-cards/{id}/)
  const patchCustomerCard = async (id, cardData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/cards/customer-cards/${id}/`, cardData);
      
      // Update the card in the local array
      const index = customerCards.value.findIndex(card => card.id === id);
      if (index !== -1) {
        customerCards.value[index] = { ...customerCards.value[index], ...data };
      }
      
      // Update current card if it's the same
      if (currentCard.value.id === id) {
        currentCard.value = { ...currentCard.value, ...data };
      }
      
      success("Card Updated", "Customer card has been updated successfully");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to update customer card";
      handleApiError(err, "Failed to update customer card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 7. Delete customer card (DELETE /cards/customer-cards/{id}/)
  const deleteCustomerCard = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/cards/customer-cards/${id}/`);
      
      // Remove the card from the local array
      customerCards.value = customerCards.value.filter(card => card.id !== id);
      
      // Clear current card if it's the same
      if (currentCard.value.id === id) {
        currentCard.value = {};
      }
      
      success("Card Deleted", "Customer card has been deleted successfully");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to delete customer card";
      handleApiError(err, "Failed to delete customer card");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 8. Clear all customer cards from state
  const clearCustomerCards = () => {
    customerCards.value = [];
    currentCard.value = {};
    error.value = null;
  };

  // 9. Get card by ID from local state
  const getCardById = (id) => {
    return customerCards.value.find(card => card.id === id);
  };

  // 10. Get cards by customer ID from local state
  const getCardsByCustomerId = (customerId) => {
    return customerCards.value.filter(card => card.customer_id === customerId);
  };

  return {
    // State
    customerCards,
    currentCard,
    loading,
    error,
    // Actions
    createCustomerCard,
    fetchCustomerCards,
    fetchCustomerCardsByQuery,
    fetchCustomerCardDetail,
    updateCustomerCard,
    patchCustomerCard,
    deleteCustomerCard,
    clearCustomerCards,
    getCardById,
    getCardsByCustomerId,
  };
});
