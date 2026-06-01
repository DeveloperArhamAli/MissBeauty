import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} UserStore
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {function(User):void} login
 * @property {function():void} logout
 */

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => {
                set({
                    user: userData,
                    isAuthenticated: true,
                })
            },
            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                })
            },
        })
    ),
    {
        name: "auth-storage",
    }
)

export default useAuthStore;