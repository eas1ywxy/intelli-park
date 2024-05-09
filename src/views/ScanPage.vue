<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">请对准设备二维码</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <!-- <span>{{ strToJson(virtualData)[0].equipmentId }}</span> -->
            <div id="sanBox">
                <video ref="video" id="video" autoplay></video>
                <div v-show="tipShow" id="scan-tip">{{ tipMsg }}</div>
                <ion-button id="open-toast" expand="block" :disabled="true">查看识别结果</ion-button>
                <ion-button id="drawGunBtn" expand="block" :disabled="true" :href='`/tabs/DrawGunPage?id=${equipmentId}`'>>> 前往拔枪 <<</ion-button>
            </div>
            
            <ion-toast id="toast" trigger="open-toast" message="识别出错" :duration="5000"></ion-toast>
  

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToast, IonButton,
} from '@ionic/vue';
import { 
    arrowBackOutline,
 } from 'ionicons/icons';
import { BrowserMultiFormatReader } from '@zxing/library';
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
            // virtualData: '{"equipmentId":"325345","stationId":"34534535","equipmentModel":"A074","equipmentType":"1","power":"380","equipmntName":"一号设备"}', //二维码虚拟数据
            // virtualData: '{"sex":"男","info":"我是好人"},{"sex":"女","info":"我是好人",}',
            jn: JSON,
            equipmentId: '',
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
        async openScan() {  // 初始化摄像头
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
        decodeFromInputVideoFunc(firstDeviceId) {  // 使用摄像头扫描
            this.codeReader.reset(); // 重置
            this.codeReader.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
            this.tipMsg = '正在尝试识别...';
            if (result) {
                
                console.log('扫码结果', result.text);
                this.scanText = result.text;
                console.log(this.scanText);
                this.jn = this.strToJson(this.scanText);
                this.equipmentId = this.jn[0].equipmentId;
                console.log(this.jn[0].equipmentId);
                this.tipMsg = '识别成功';

                let btn = document.getElementById('open-toast');
                btn.setAttribute('disabled', false);

                let toast = document.getElementById('toast');
                toast.setAttribute('message', result.text);

                let drawGunBtn = document.getElementById('drawGunBtn');
                drawGunBtn.setAttribute('disabled', false);
            }
            });
        },
        strToJson: function(str){ 
        var json = (new Function("return [" + str+"]"))(); 
        return json; 
        }
    },
}
</script>

<style>
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
    position: relative;
    top: 100px;
}
</style>