<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">车辆登记</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <ion-card>
                <ion-input id="vehicleBrand" class="fontFamliy" label="车辆品牌" label-placement="floating" fill="solid" placeholder="请输入车辆品牌"></ion-input>
                <ion-input id="vehicleModel" class="fontFamliy" label="充电车型" label-placement="floating" fill="solid" placeholder="直流快充/交流慢充/交直流混合充电"></ion-input>
                <ion-input id="electricity" class="fontFamliy" label="电池容量" label-placement="floating" fill="solid" placeholder="请输入车辆电池容量，单位：kw·h"></ion-input>
                <ion-input id="licencePlate" class="fontFamliy" label="车辆牌照" label-placement="floating" fill="solid" placeholder="请输入有效车牌号"></ion-input>
            </ion-card>
            <ion-button id="addCarBtn" class="fontFamliy" expand="block" @click="keepVehicleMsg">保存信息</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon, IonButton, IonInput, alertController} from '@ionic/vue';
import {
    arrowBackOutline,
} from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: 'RegisterPage',
    data(){
        return{
            vehicleMsg: {
                userId: Number,
                vehicleBrand: String,
                vehicleModel: String,
                licencePlate: String,
                electricity: Number,
            },
        }
    },
    methods:{
        //返回上一页
        goBack: function(){
            history.go(-1);
        },
        
        //保存用户登记的车辆信息
        keepVehicleMsg(){
            let vehicleBrand = document.getElementById('vehicleBrand');
            this.vehicleMsg.vehicleBrand = vehicleBrand.value;
            
            let vehicleModel = document.getElementById('vehicleModel');
            if(vehicleModel.value=="直流快充"){
                this.vehicleMsg.vehicleModel = 1;
            }else if(vehicleModel.value=="交流慢充"){
                this.vehicleMsg.vehicleModel = 2;
            }else if(vehicleModel.value=="交直流混合充电"){
                this.vehicleMsg.vehicleModel = 3;
            }else{
                this.vehicleMsg.vehicleModel = -1;
            }
            
            let licencePlate = document.getElementById('licencePlate');
            this.vehicleMsg.licencePlate = licencePlate.value;
            
            let electricity = document.getElementById('electricity');
            this.vehicleMsg.electricity = Number(electricity.value);


            if(this.vehicleMsg.vehicleModel==-1){
                this.changeVehicleModel();
            }else{
                this.postVehicleMsg();
            }
            
        },

        //POST 登记用户车辆
        async postVehicleMsg(){
            const urlParams = new URLSearchParams(window.location.search);
            this.vehicleMsg.userId = urlParams.get('id') || '';
            console.log(this.vehicleMsg);
            const request = await this.postVehicleInformation(this.vehicleMsg);
            console.log(request.data);
            if(request.data.code==200){
                this.registerSuccess(this.vehicleMsg.userId);
            }else{
                this.registerFailure(request.data.message);
            }
        },
        postVehicleInformation: function(info) {
            return request({
                url: '/vehicle',
                method: 'POST',
                data: info,
            })
        },

        //请修改充电车型
        changeVehicleModel :async(userId) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '充电车型错误',
                message: '请确保输入的充电车型正确',
                buttons: ['确定'],
            });
            await alert.present();
        },

        //登记成功
        registerSuccess :async(userId) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '登记成功',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/VehiclePage?id=" + userId;
                        }
                    }
                ]
            });
            await alert.present();
        },
        
        //修改失败弹窗
        registerFailure :async(message) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '登记失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },
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
</style>