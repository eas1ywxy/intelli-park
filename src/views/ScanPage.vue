<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="fontFamliy" style="text-align: center; margin-right: 12px;">请对准设备二维码</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fontFamliy">
            <div id="sanBox">
                <video ref="video" id="video" autoplay></video>
                <!-- <div v-show="tipShow" id="scan-tip">{{ tipMsg }}</div>
                <ion-button id="open-toast" expand="block" :disabled="true">查看识别结果</ion-button>
                <ion-button id="drawGunBtn" expand="block" :disabled="true" :href='`/tabs/DrawGunPage?equipmentId=${equipmentMsg.equipmentId}`'>>> 前往拔枪 <<</ion-button> -->
                
            </div>
            
            <ion-toast id="toast" trigger="open-toast" message="识别出错" :duration="5000"></ion-toast>
  
            
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToast, IonButton, alertController
} from '@ionic/vue';
import { BrowserMultiFormatReader } from '@zxing/library';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "ScanPage",
    data() {
        return{
            codeReader: null,
            tipShow: false,  // 是否展示提示
            tipMsg: '',  // 提示文本内容
            scanText: '',  // 扫码结果文本内容
            jn: JSON,
            equipmentMsg: {
                equipmentId: Number,
                stationId: Number,
                equipmentModel: String,
                equipmentType: Number,
                power: Number,
                equipmntName: String,
            },
            isLongin: false,
            userMsg: {},
        }
    },
    created() {
        this.openScan();
    },
    watch: {
      '$route'(to, from) {
        if(to.path == '/ScanCodePage'){  // 当处于该页面时
          this.openScan();
        }
      }
    },
    destroyed(){
      this.codeReader.reset();
      this.codeReader = null;
    },
    methods: {
        // 初始化摄像头
        async openScan() {  
            this.codeReader = await new BrowserMultiFormatReader();
            this.codeReader.getVideoInputDevices().then(videoDevices => {
            this.tipMsg = '正在调用摄像头...';
            this.tipShow = true;
            console.log('get-videoDevices', videoDevices);
    
            // 默认获取摄像头列表里的最后一个设备id，通过几部测试机发现一般前置摄像头位于列表里的前面几位，所以一般获取最后一个的是后置摄像头
            let firstDeviceId = videoDevices[videoDevices.length - 1].deviceId; 
            // 一般获取了手机的摄像头列表里不止一个，有的手机摄像头高级多层，会有变焦摄像头等情况，需要做处理
            if (videoDevices.length > 1) {
                // 一般通过判断摄像头列表项里的 label 字段，'camera2 0, facing back' 字符串含有 'back' 和 '0'，大部分机型是这样，如果有些机型没有，那就还是默认获取最后一个
                firstDeviceId = videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }) ? 
                videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }).deviceId : 
                videoDevices[videoDevices.length - 1].deviceId;
            }
            console.log('get-firstDeviceId', firstDeviceId);
    
            this.decodeFromInputVideoFunc(firstDeviceId);
            }).catch(err => {
            this.tipShow = false;
            console.error(err);
            });
        },
        
        // 使用摄像头扫描
        decodeFromInputVideoFunc(firstDeviceId) { 
            this.codeReader.reset(); // 重置
            this.codeReader.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
            this.tipMsg = '正在尝试识别...';
            if (result) {
                console.log('扫码结果', result.text);

                console.log(this.isLongin);

                if(this.isLongin==true){
                    this.getUserMsg(result.text)
                    
                }else{
                    this.needLogin();
                }
            }
            });
        },
        
        //GET 获取用户个人信息
        async getUserMsg(info)  {
            const request = await this.getService();
            console.log(request.data);
            if(request.data.code==200){
                this.userMsg = request.data.data;
                window.location.href = "/tabs/DrawGunPage?request=" + info + "&id=" + this.userMsg.id;
            }else{
                localStorage.setItem('isLogin',0);
            }
        },
        getService:function() {
            return request({
                url: '/person/getInfo',
                methods: 'GET',
            })
        },

        //判断是否登录了
        getLocalIsLogin(){
            console.log('login',localStorage.getItem('isLogin'));
            if(localStorage.getItem('isLogin')==1){
                this.isLongin = true;
            }else{
                this.isLongin = false;
            }
        },

        //需要登录弹窗
        needLogin :async() => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '请先登录',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/LoginPage";
                        }
                    }
                ],
            });
            await alert.present();
        },
    },
    mounted:function(){
        this.getLocalIsLogin();
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

.alertOneButton{
    .alert-wrapper {
        border-radius: 15px;
    }
    .alert-title {
        text-align: center;
    }
    .alert-button-group {
      padding: 0;
      border-top: 1px solid #e1dce6;
      justify-content: center;
    }
    .alert-message {
      max-height: 240px;
      text-align:center;
    }
    .alert-button {
      widows: 100%;
      margin:0;
    }
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#video{
    width: 400px;
    height: 400px;
}

#sanBox{
    width: 400px;
    height: 800px;
    position: relative;
    top: 100px;
}
</style>