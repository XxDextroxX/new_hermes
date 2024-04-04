import { UserModel } from '@/models/user_model';
import { create } from 'zustand';

interface UserState {
    user: UserModel
    setUser: (user: UserModel) => void
    resetUser: () => void
}

export const useUserStore = create<UserState>()((set) => ({
    user: new UserModel(),
    setUser: (user: UserModel) => set({ user }),
    resetUser: () => set({ user: new UserModel() }),
}));