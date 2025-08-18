import { defineStore } from 'pinia'

const useAuthStore = defineStore("auth", {
    state: () => ({
        jwtToken: localStorage.getItem("jwt_token") || null, // 保存 JWT Token
        userName: localStorage.getItem("user_name") || null, // 保存用户信息
    }),
    actions: {
        login(token, userName) {
            this.jwtToken = token;
            this.userName = userName;
            // 将 Token 存储到 Local Storage
            localStorage.setItem("jwt_token", token);
            localStorage.setItem("user_name", userName);
        },
        logout() {
            this.jwtToken = null;
            this.userName = null;
            // 清除 Local Storage 中的 Token
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("user_name");
        },
        isAuthenticated() {
            return !!this.jwtToken; // 判断是否已登录
        },
        refreshToken(token) {
            this.jwtToken = token;
            // 将 Token 存储到 Local Storage
            localStorage.setItem("jwt_token", token);
        },
    },
});

export default useAuthStore;