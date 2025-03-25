import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  currentUser: {
    id: null,
    username: null,
  },
};

export const useLoginStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      isAuthorized: () => {
        return get().currentUser.id != null;
      },
      setCurrentUser: ({ id, username } = {}) => {
        set(() => ({
          currentUser: {
            id,
            username,
          },
        }));
      },
      removeCurrentUser: () => {
        set(() => initialState);
      },
    }),
    {
      name: "oas_web_login_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
