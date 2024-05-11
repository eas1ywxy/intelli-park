<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>车辆登记</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-input id="vehicleBrand" label="车辆品牌" label-placement="floating" fill="solid" placeholder="请输入车辆品牌"></ion-input>
                <ion-input id="vehicleModel" label="充电车型" label-placement="floating" fill="solid" placeholder="直流快充/交流慢充/交直流混合充电"></ion-input>
                <ion-input id="licencePlate" label="电池容量" label-placement="floating" fill="solid" placeholder="请输入车辆电池容量，单位：kw·h"></ion-input>
                <ion-input id="electricity" label="车辆牌照" label-placement="floating" fill="solid" placeholder="请输入有效车牌号"></ion-input>
            </ion-card>
            <ion-button id="addCarBtn" expand="block" @click="keepVehicleMsg">保存信息</ion-button>
            <!-- <ion-alert
                :is-open="isOpen"
                header="A Short Title Is Best"
                sub-header="A Sub Header Is Optional"
                message="A message should be a short, complete sentence."
                :buttons="alertButtons"
                @didDismiss="setOpen(false)"
            ></ion-alert> -->
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

            if(this.vehicleMsg.vehicleBrand==''){
                this.registerBrandFailure();
            }else if(this.vehicleMsg.vehicleModel<0){
                this.registerModelFailure();
            }else if(this.vehicleMsg.licencePlate==''){
                this.registerPlateFailure();
            }else if(!(this.vehicleMsg.electricity>0)){
                // console.log(this.vehicleMsg.electricity);
                this.registerElectricityFailure()
            }else{
                this.postVehicleMsg(this.vehicleMsg);
                let str = (String)("/tabs/VehiclePage?id=" + this.vehicleMsg.userId);
                window.open(str);
            }
        },

        //POST 登记用户车辆
        postVehicleMsg: function(registerMsg)  {
            const urlParams = new URLSearchParams(window.location.search);
            this.vehicleMsg.userId = urlParams.get('id') || '';
            console.log(this.vehicleMsg);
            if(!this.vehicleMsg.userId){
                console.log('获取userId失败');
                this.registerFailure();
            }else{
                console.log('获取到userId');
                
                const request = this.postVehicleInformation(registerMsg);
                console.log(request);
                if(request){
                    this.registerSuccess();
                }else{
                    this.registerFailure();
                }
            }
        },
        postVehicleInformation: function(info) {
            return request({
                url: '/tabs/RegisterPage',
                method: 'POST',
                data: info,
            })
        },

        //登记成功
        registerSuccess :async() => {
            const alert = await alertController.create({
                header: '登记成功',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //登记车辆品牌失败
        registerBrandFailure :async() => {
            const alert = await alertController.create({
                header: '登记失败',
                message: '请确保车辆品牌信息不为空',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //登记车辆类型失败
        registerModelFailure :async() => {
            const alert = await alertController.create({
                header: '登记失败',
                message: '请确保充电车型为：直流快充/交流快充/交直流混合充电',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //登记车辆牌照失败
        registerPlateFailure :async() => {
            const alert = await alertController.create({
                header: '登记失败',
                message: '请确保车辆牌照不为空',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //登记车辆电池容量失败
        registerElectricityFailure :async() => {
            const alert = await alertController.create({
                header: '登记失败',
                message: '请确保电池容量不为空',
                buttons: ['确定'],
            });
            await alert.present();
        },
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>