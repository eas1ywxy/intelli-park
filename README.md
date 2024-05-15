# INTELLIPARK-APP

## 下载依赖

### ionic
``` 
npm install -g @ionic/cli
```

### axios
```
npm install axios
```

### zxing
```
npm install @zxing/library --save
```

### Capacitor(PWA)
```
npm install @ionic/pwa-elements
```

### Ionic Secure Storage
```
npm install @ionic-enterprise/secure-storage
```

## 启动项目

### 浏览器下启动
```
ionic serve
```

## 部署到Android

1. 请优先取消在运行中的 **ionic serve** 终端，再执行以下命令。
2. 确保本机环境下有 **Android Studio**.

### 重新构建项目
```
ionic build
```

### 创建Android项目
```
ionic cap add android
```

### 每次项目修改后更新Android项目
```
ionic cap copy android
```

### 在Android Studio中打开本机Android项目
```
ionic cap open android
```