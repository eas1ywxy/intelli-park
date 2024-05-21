<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>请确认拔枪设备</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="equipmentBox">
                <img id="equipmentImg" src="../../resources/equipment.png" alt="充电桩"/>
                <div id="equipmentMsg">
                    <span>充电接口ID：{{ equipmentMsg.connectorID }}</span>
                    <br/>
                    <span>设备名称：{{ equipmentMsg.equipmentName }}</span>
                    <br/>
                    <span>所属充电站：{{ equipmentMsg.chargingStationName }}</span>
                    <br/>
                    <span>充电接口：
                        <span v-if="equipmentMsg.gunNum==1">A枪</span>
                        <span v-else="equipmentMsg.gunNum==2">B枪</span>
                    </span>
                    <br/>
                    <!-- 1:直流设备； 2:交流设备； 3:交直流一体设备； 4:无线设备； 5:其他 -->
                    <span>设备类型：
                        <span v-if="equipmentMsg.equipmentType==1">直流设备</span>
                        <span v-if="equipmentMsg.equipmentType==2">交流设备</span>
                        <span v-if="equipmentMsg.equipmentType==3">交直流一体设备</span>
                        <span v-if="equipmentMsg.equipmentType==4">无线设备</span>
                        <span v-if="equipmentMsg.equipmentType==5">其他类型设备</span>
                    </span>
                    <br/>
                    <span>设备功率：{{ equipmentMsg.equipmentPower }}KW·h</span>
                </div>
            </div>

            <ion-button id="chooseVehicle" expand="block">选择充电车辆</ion-button>
            <ion-modal id="chooseVehicleBreakPoints" ref="modal" trigger="chooseVehicle" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
                <ion-content class="ion-padding">
                    <ion-list v-for="(vehicle,index) in vehiclelist" @click="chooseVehicle(vehicle.vehicleId, index)">
                        <ion-item button="true">
                            <ion-label>
                                <h2>{{ vehicle.licencePlate }}</h2>
                                <p>充电车型：
                                    <span v-if="vehicle.vehicleModel==1">直流快充</span>
                                    <span v-else-if="vehicle.vehicleModel==2">交流慢充</span>
                                    <span v-else="vehicle.vehicleModel==3">交直流混合充电</span>
                                    ，电池容量：
                                    <span>{{ vehicle.electricity }}</span>
                                </p>
                            </ion-label>
                            <ion-icon v-if="this.chooseIndex == index" id="chooseIcon" aria-hidden="true" slot="end" :icon="checkmarkOutline" />
                        </ion-item>
                    </ion-list>
                </ion-content>
            </ion-modal>
            
            <!-- <connect-card v-for="connect in equipmentMsg.connects" :connectMsg="connect"></connect-card> -->

            <ion-button @click="postStartCharing" id="startCharing" expand="block">确认开始充电</ion-button>
            </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonModal, IonList, IonItem, alertController, IonImg, IonLabel, IonSearchbar
} from '@ionic/vue';
import { 
    arrowBackOutline,
    checkmarkOutline,
 } from 'ionicons/icons';
import connectCard from '@/components/connectCard.vue'
import request from '@/utils/require.ts';
import axios from 'axios';
</script>

<script>
export default {
    data(){
        return{
            equipmentMsg:{
                // equipmentName: "编号1设备",
                // equipmentId: 124555,
                // stationName: "成都信息工程大学",
                // equipmentModel: "A074",
                // equipmentType: 1,
                // power: 380,
                // connects: [
                //     {
                //         // connectorName: "1号接口",
                //         // connectorId: 12423,
                //         // connectorType: 2,
                //         // power: 80,
                //         // matchCars: 2,
                //         // state: 2,
                //     },
                // ]
            },
            userMsg:{},
            vehiclelist:[],
            chooseIndex: -1,
            chooseVehicleId: -1,
        }
    },
    methods: {
        //返回上一页
        goBack: function(){
            history.go(-1);
        },

        // //GET 获取充电桩设备信息
        // async getEquipmentMsg() {
        //     const urlParams = new URLSearchParams(window.location.search);
        //     const request = await this.getService({equipmentId: urlParams.get('equipmentId') || ''});
        //     console.log(request.data.data);
        //     this.equipmentMsg = request.data.data;
        // },
        // getService:function(pageData) {
        //     return request({
        //         url: '/tabs/DrawGunPage',
        //         params: pageData
        //     })
        // },

        //GET 获取用户个人信息
        async getUserMsg()  {
            const request = await this.getService();
            console.log('userMsg',request.data);
            if(request.data.code==200){
                this.userMsg = request.data.data;
                this.getUserVehicle(this.userMsg.id);
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

        //GET 获取用户车辆信息
        async getUserVehicle(id)  {
            const request = await this.getVehicle({userId: id, pageNum:1, pageSize: 20});
            console.log('userVehicle',request.data.data.records);
            this.vehiclelist = request.data.data.records;
            // console.log(this.vehiclelist[0].vehicleId);
        },
        getVehicle:function(info) {
            return request({
                url: '/vehicle/list',
                method: 'GET',
                params: info
            }) 
        },

        //POST 请求开始充电
        async postStartCharing() {
            let info = {
                vehicleId: this.chooseVehicleId,
                seq: this.equipmentMsg.seq,
                connectorId: this.equipmentMsg.connectorID,
            };
            if (info.vehicleId<0){
                this.needChooseVehicle();
            }else{
                const request = await this.getStart(info);
                if(request.data.code==200){
                    console.log('startCharing',request.data);
                }else{
                    this.failure(request.data.message);
                }
            }
            
            // this.vehiclelist = request.data.data.records;
            // console.log(this.vehiclelist[0].vehicleId);
        },
        getStart:function(info) {
            return request({
                url: '/charging/start',
                method: 'POST',
                data: info
            }) 
        },

        //GET 请求扫码链接
        getScanLink(){
            const urlParams = new URLSearchParams(window.location.search);
            let request = urlParams.get('request') || '';
            axios.get(request)
                .then(response => {
                    console.log('equipment',response.data);
                    if(response.data.code==200){
                        this.equipmentMsg = response.data.data;
                    }else if(response.data.code==400){
                        this.needScan();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //二维码失效弹窗
        needScan :async() => {
            const alert = await alertController.create({
                header: '二维码失效，请重新扫码',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/ScanPage";
                        }
                    }
                ],
            });
            await alert.present();
        },

        //用户未选择车辆
        needChooseVehicle :async() => {
            const alert = await alertController.create({
                header: '请优先选择充电车辆',
                buttons: [
                    {
                        text: '确定',
                        // handler: () => {
                        //     window.location.href = "/tabs/ScanPage";
                        // }
                    }
                ],
            });
            await alert.present();
        },

        //失败弹窗
        failure :async(message) => {
            const alert = await alertController.create({
                header: '操作失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //用户选择车辆
        chooseVehicle: function(vehicleId, index){
            this.chooseIndex = index;
            this.chooseVehicleId = vehicleId;
        }
    },
    mounted: function(){
        this.getScanLink();
        this.getUserMsg();
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#equipmentBox{
    margin: 20px 15px;
    height: 400px;
    border: 2px solid #1E90FF;
    border-radius: 5px;
}

#equipmentImg{
    margin: 0px 100px;
    width: 200px;
    height: 240px;
    position: relative;
    left: -20px;
}

#equipmentMsg{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 16px;
}

#chooseIcon{
    color: #2dd55b
}

#chooseVehicle{
    margin: 5px 10px;
}

#startCharing{
    margin: 10px 10px;
}
</style>