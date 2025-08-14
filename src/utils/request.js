// src/utils/request.js
import axios from "axios";
import { createDiscreteApi } from "naive-ui";
import router from '../router/index.js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const { message } = createDiscreteApi(["message"]);

const service = axios.create({
    timeout: 1000000, // 请求超时时间 10s
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在请求头中加入全局参数或 Token
        const token = localStorage.getItem("jwt_token"); // 从本地存储中获取 Token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // 可添加全局默认参数
        config.params = {
            ...config.params,
            lang: "en-US", // 示例：全局默认语言
            userAgent: navigator.userAgent || "N/A",
            platform: navigator.platform || "N/A",
            language: navigator.language || "N/A",
            screenWidth: window.screen.width || 0,
            screenHeight: window.screen.height || 0,
            devicePixelRatio: window.devicePixelRatio || 1,
            hardwareConcurrency: navigator.hardwareConcurrency || "N/A",
            touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
        };
        async function getFingerprintSync() {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            return result.visitorId; // 返回唯一ID
        }
        return getFingerprintSync().then((res) => {
            config.params.fingerprint = res;
            return config
        })
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 可在这里统一处理响应数据
        if (response.data.errno === 403) {
            message.error("请重新登陆");
            return setTimeout(() => {
                router.push("/login").catch((err) => {
                    console.error(err);
                });
            }, 1200);
        }
        if (response.data.errno !== 0) {
            message.error(response.data.err_msg);
        }
        return response.data;
    },
    (error) => {
        // 可在这里处理全局错误，比如 Token 过期
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default service;