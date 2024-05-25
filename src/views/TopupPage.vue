<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">车辆充电中</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <!-- <span>111111</span> -->
            <ion-card class="fontFamliy">
                <ion-card-header>
                    <ion-card-title>
                        <span>充电订单编号：{{ msg.startChargeSeq }}</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>充电开始时间：{{ msg.StartTime }}</span>
                    <br>
                    <span>充电结束时间：{{ msg.EndTime }}</span>
                </ion-card-content>
            </ion-card>

            <ion-card class="fontFamliy">
                <ion-card-content>
                    <span>
                        <span id="totalMoney">累计费用：{{ msg.totalMoney }}元</span>
                        <span id="totalPower">累计充电量：{{ msg.totalPower }}kw·h</span>
                    </span>

                    <div id="charging">
                        <div id="charingBox">
                            <div id="greenBox">
                                <span id="soc">{{ (msg.soc*100).toFixed(2) }}%</span>
                            </div>
                        </div>
                        <div id="charingBoxAfter"></div>
                    </div>
                </ion-card-content>
            </ion-card>
            
            <ion-button class="fontFamliy" @click="postEndCharing" id="endCharing" expand="block">结束充电</ion-button>
            <ion-button class="fontFamliy" @click="changDetails" id="details" expand="block">计费详情</ion-button>

            <ion-card class="fontFamliy" v-if="ifDetails == true" v-for="detail in msg.chargeDetails">
                <ion-card-header>
                    <ion-card-title>
                        <span>开始时间：{{ detail.DetailStartTime }}</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>结束时间：{{ detail.DetailEndTime }}</span>
                    <br>
                    <span>时段电价：{{ detail.elecPrice }}</span>
                    <br>
                    <span>时段服务费价格：{{ detail.servicePrice }}</span>
                    <br>
                    <span>时段充电量：{{ detail.detailPower }}</span>
                    <br>
                    <span>时段电费：{{ detail.detailElecMoney }}</span>
                    <br>
                    <span>时段服务费：{{ detail.detailServiceMoney }}</span>
                </ion-card-content>
            </ion-card>

            <ion-button class="fontFamliy" @click="getCode" id="endCharing" expand="block">手动停止充电</ion-button>

        </ion-content>

        <!-- <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span>充电订单编号：{{ msg.startChargeSeq }}</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>充电开始时间：{{ msg.StartTime }}</span>
                    <br>
                    <span>充电结束时间：{{ msg.EndTime }}</span>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-content>
                    <span>
                        <span id="totalMoney">累计费用：{{ msg.totalMoney }}元</span>
                        <span id="totalPower">累计充电量：{{ msg.totalPower }}kw·h</span>
                    </span>

                    <div id="charging">
                        <div id="charingBox">
                            <div id="greenBox">
                                <span id="soc">{{ (msg.soc*100).toFixed(2) }}%</span>
                            </div>
                        </div>
                        <div id="charingBoxAfter"></div>
                    </div>
                </ion-card-content>
                
            </ion-card>

            <ion-button @click="postEndCharing" id="endCharing" expand="block">结束充电</ion-button>
            <ion-button @click="changDetails" id="details" expand="block">计费详情</ion-button>

            <ion-card v-if="ifDetails == true" v-for="detail in msg.chargeDetails">
                <ion-card-header>
                    <ion-card-title>
                        <span>开始时间：{{ detail.DetailStartTime }}</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>结束时间：{{ detail.DetailEndTime }}</span>
                    <br>
                    <span>时段电价：{{ detail.elecPrice }}</span>
                    <br>
                    <span>时段服务费价格：{{ detail.servicePrice }}</span>
                    <br>
                    <span>时段充电量：{{ detail.detailPower }}</span>
                    <br>
                    <span>时段电费：{{ detail.detailElecMoney }}</span>
                    <br>
                    <span>时段服务费：{{ detail.detailServiceMoney }}</span>
                </ion-card-content>
            </ion-card>

            <ion-button @click="getCode" id="endCharing" expand="block">手动停止充电</ion-button>
        </ion-content> -->
    </ion-page>
</template>

<script setup>
import {IonHeader, IonToolbar, IonTitle, IonPage, IonContent, IonList, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, alertController} from '@ionic/vue';
import { 
    arrowBackOutline,
 } from 'ionicons/icons';
 import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: 'TopupPage',
    data(){
        return{
            ifDetails: false,
            msg:{
                // StartTime: "2024-05-05 02:03:07",
                // EndTime: "2024-05-05 02:03:22",
                // startChargeSeq: "34434116888000168",
                // totalMoney: 260,
                // totalPower: 200,
                // soc: 0.4,
                // chargeDetails: [
                //     {
                //         "DetailStartTime": "2024-05-05 02:03:07",
                //         "DetailEndTime": "2024-05-05 02:03:22",
                //         "elecPrice": 1.2,
                //         "detailServiceMoney": 20,
                //         "detailElecMoney": 240,
                //         "servicePrice": 0.1,
                //         "detailPower": 200
                //     }
                // ],
            }
        }
    },
    methods:{
        //返回上一页
        goBack: function(){
            history.go(-1);
        },

        //设置充电剩余量
        changeSoc(){
            document.getElementById("greenBox").style.width = String((300*(this.msg.soc)) + "px");
        },
        

        //显示/隐藏计费详情
        changDetails(){
            this.ifDetails = !this.ifDetails;
            console.log(this.ifDetails);
        },

        //POST 获取充电实时状态
        async postChargingStatus()  {
            const urlParams = new URLSearchParams(window.location.search);
            let id = urlParams.get('chargeId') || '';
            const request = await this.postStatus(id);
            console.log(request.data);
            if(request.data.code==200){
                this.msg = request.data.data;
                this.changeSoc();
                if(request.data.data.startChargeSeqStat==4){  
                    this.chargingSuccess(id);
                }
            }
        },
        postStatus: function(id) {
            return request({
                url: '/charging/status/' + id,
                method: 'GET',
            })
        },

        //POST 停止充电
        async postEndCharing() {
            let info = {
                stopChargeSeq: this.msg.startChargeSeq,
                connectorID: this.msg.connectorID,
            };
            const request = await this.postEnd(info);
            if(request.data.code==200){
                console.log('startCharing',request.data);
                this.chargingSuccess(this.msg.startChargeSeq);
            }else{
                this.failure(request.data.message);
            }
        },
        postEnd:function(info) {
            return request({
                url: '/charging/stop',
                method: 'POST',
                data: info
            }) 
        },

        //GET 手动停止
        async getCode()  {
            const request = await this.getStopCode();
            console.log('code',request.data.data);
            this.endCode(request.data.data);
        },
        getStopCode:function() {
            return request({
                url: '/charging/code/'+ this.msg.startChargeSeq,
                method: 'GET',
            })
        },

        //充电完成
        chargingSuccess :async(id) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy',
                header: '充电完成',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/DetailPage?chargeId=" + id;
                        }
                    }
                ],
            });
            await alert.present();
        },

         //手动充电结束
         endCode :async(code) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy',
                header: '停止充电验证码：' + code,
                buttons: [
                    {
                        text: '确定',
                    }
                ],
            });
            await alert.present();
        },
    },
    mounted: function(){
        setInterval(() => {
            this.postChargingStatus();
        }, 5000);
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#totalMoney{
    float: left;
}

#totalPower{
    float: right;
}

#charging{
    margin: 60px 0px;
    position: relative;
    bottom: 20px;
    left: 15px;
}

#charingBox{
    float: left;
    width: 300px;
    height: 100px;
    border: 2px solid #6f6f6f;
    border-radius: 5%;
    /* background-color: rgb(45,213,91); */
}

#greenBox{
    width: 0px;
    height: 96px;
    border-radius: 5%;
    background-color: rgb(45,213,91);
}

#charingBoxAfter{
    float: left;
    margin-top: 10px;
    width: 10px;
    height: 80px;
    border: 2px solid #6f6f6f;
    background-color: #6f6f6f;
    border-radius: 10%;
}

#endCharing{
    margin: 5px 10px ;
}

#details{
    margin: 10px;
}

#soc{
    float: left;
    color: #000;
    position: relative;
    top: 40px;
    left: 50px;
}
</style>