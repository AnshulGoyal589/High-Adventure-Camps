import { create } from 'zustand';

interface ContactPopupState {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

export const useContactPopupStore = create<ContactPopupState>((set) => ({
  isPopupOpen: false,
  openPopup: () => set({ isPopupOpen: true }),
  closePopup: () => set({ isPopupOpen: false }),
}));