# 使用 Node.js 作为构建环境
#FROM node:22-alpine AS build
FROM scratch AS build

## 设置为环境变量（可选）
#ENV COS_SECRET_ID=
#ENV COS_SECRET_KEY=

#RUN echo "SecretId: $COS_SECRET_ID" && echo "SecretKey: $COS_SECRET_KEY"

#RUN printenv | grep COS_

# 设置工作目录
WORKDIR /app

# 复制所有文件到工作目录
COPY . .

# 安装依赖
#RUN npm config set registry "https://registry.npmmirror.com" && \
    # npm install


#RUN npm run build:cos
#RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build
###
#### 使用 Nginx 作为 Web 服务器
FROM nginx:latest
###
ENV DEBIAN_FRONTEND=noninteractive
##
WORKDIR /data/app/admin_front
###
RUN apt update && apt install -y \
    certbot \
    python3-certbot-nginx \
    && mkdir -p /data/logs/nginx/shahefu.cn \
    && rm -rf /var/lib/apt/lists/*
###
###
#### 复制 Vue 编译后的文件到 Nginx 目录
COPY --from=build /app/dist /data/app/admin_front
###
### 复制自定义的 Nginx 配置（可选）
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/admin.conf /etc/nginx/conf.d/admin.conf
###
###
ENV TZ=Asia/Shanghai
### 暴露端口 80 和 443
EXPOSE 443
###
#### 暴露端口
EXPOSE 80
##
### 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
