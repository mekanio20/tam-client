<template>
  <div class="p-6 bg-white rounded-lg shadow-sm border">
    <h3 class="text-lg font-semibold text-[#0C1A30] mb-4">Toast Notification Demo</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <!-- Success Toast -->
      <button
        @click="showSuccess"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Success Toast
      </button>
      
      <!-- Error Toast -->
      <button
        @click="showError"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Error Toast
      </button>
      
      <!-- Warning Toast -->
      <button
        @click="showWarning"
        class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
      >
        Warning Toast
      </button>
      
      <!-- Info Toast -->
      <button
        @click="showInfo"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Info Toast
      </button>
      
      <!-- API Success Demo -->
      <button
        @click="simulateApiSuccess"
        class="px-4 py-2 bg-[#FEB918] text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200"
      >
        API Success
      </button>
      
      <!-- API Error Demo -->
      <button
        @click="simulateApiError"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
      >
        API Error
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast.js'

const { success, error, warning, info, handleApiResponse, handleApiError } = useToast()

const showSuccess = () => {
  success('Başarılı!', 'İşlem başarıyla tamamlandı')
}

const showError = () => {
  error('Hata!', 'Bir hata oluştu')
}

const showWarning = () => {
  warning('Uyarı!', 'Dikkatli olun')
}

const showInfo = () => {
  info('Bilgi', 'Bu bir bilgi mesajıdır')
}

const simulateApiSuccess = () => {
  const mockResponse = {
    status: 200,
    data: {
      message: 'Veri başarıyla kaydedildi'
    }
  }
  handleApiResponse(mockResponse, 'API İşlemi Başarılı', 'API işlemi başarısız')
}

const simulateApiError = () => {
  const mockError = {
    response: {
      data: {
        message: 'Sunucu hatası oluştu'
      }
    }
  }
  handleApiError(mockError, 'API Hatası')
}
</script>
