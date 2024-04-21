# 使用官方的 Nginx 基础镜像
FROM nginx:alpine

# 删除默认配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将本地的nginx配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 复制构建后的静态资源到容器的工作目录
COPY build /usr/share/nginx/http-test

# 设置容器监听端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]