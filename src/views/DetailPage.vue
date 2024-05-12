<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>订单详情</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="chargingcar">
                <img src="../../resources/chargingcar2.jpg" alt="汽车">
            </div>

           <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="chargingInformation">充电信息</span>
                        <span id="chargeId">ID:{{ msg.chargeId }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content id="chargingContent">
                    <div id="car">
                        <img src="../../resources/car.png" alt="车">
                    </div>
                    <div id="vehicleModel">
                        <span v-if="msg.vehicleModel == 1">直流快充</span>
                        <span v-if="msg.vehicleModel == 2">交流漫充</span>
                        <span v-if="msg.vehicleModel == 3">交直流混合充电</span>
                    </div>
                    <div v-for="lp in msg.licencePlate">
                        <span class="licencePlates">{{ lp }}</span>
                    </div>
                    <br>
                    <hr style="border: 0px;">
                    <div id="electricityTime">
                        <span>时间：{{ msg.startTime }} {{ "--->" }} {{ msg.endTime }}</span>
                    </div>
                    <hr id="line">
                    <div style="line-height: 20px;">
                        <span id="totalElectricityWords">合计充电电量</span>
                        <span id="totalElectricity">
                            <span id="totalElectricityNumber">{{ msg.electricity }}</span>
                            <span id="totalElectricityDegree">度</span>
                        </span>
                    </div>
                </ion-card-content>
           </ion-card>

            <ion-card v-if="msg.state >= 3">
                <ion-card-header>
                    <ion-card-title>
                        <span id="userEvaluate">用户体验评价</span>
                        <span id="createTime">{{ msg.createTime }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content v-if="msg.state == 4">
                    <div id="starBox">
                        <span class="stars" v-for="s in msg.star"><ion-icon :icon="star" slot="start" size="large"></ion-icon></span>
                        <span class="stars" v-for="s in (5-msg.star)"><ion-icon :icon="starOutline" slot="start" size="large"></ion-icon></span>
                    </div>
                    <br>
                    <div id="feedbackNote">
                        <span>备注：{{ msg.feedbackNote.length>20 ? msg.feedbackNote.slice(0,30)+"..." : msg.feedbackNote }}</span>
                    </div>
                    <br>
                    <br>
                </ion-card-content>
                <ion-card-content v-if="msg.state ==3">
                    <div id="darkStarBox">
                        <span class="Stars" v-for="s in 5"><ion-icon :icon="starOutline" slot="start" size="large"></ion-icon></span>
                    </div>
                    <br>
                    <div>
                        <a id="gpMark" :href="`/tabs/ReviewPage?chargeId=${msg.chargeId}`">还未评分，前往评分>></a>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="costInformation">支付信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content id="costContent">
                    <span id="amountCost">支付金额</span>
                    <span id="cost">
                        <span id="costNumber">{{ msg.cost }}</span>
                        <span id="costWords">元</span>
                    </span>
                    <hr id="line">
                    <span>
                        <span id="paymentStatus">支付状态</span>
                        <span id="status">
                            <span id="chargeUnfinished" v-if="msg.state == 1">充电未结束</span>
                            <span id="goPaid" v-else-if="msg.state == 2">前往支付</span>
                            <span id="havePaid" v-else="msg.state >= 3">已支付</span>
                        </span>
                    </span>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="stationInformation">站点信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content id="stationDetails">
                    <span>充电站：{{ msg.stationName }}</span>
                    <br>
                    <span>设备型号：{{ msg.equipmentModel }}</span>
                    <br>
                    <span>接口名称：{{ msg.connectorName }}</span>
                    <br>
                    <span>联系电话：{{ msg.serviceTel }}</span>
                </ion-card-content>
            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent,} from '@ionic/vue';
import { 
    starOutline,
    star,
    arrowBackOutline,
} from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "DetailPage",
    data() {
        return{
            msg: {
                // stationName: "成都信息工程大学（航空港）南门充电站",
                // equipmentModel: "A074",
                // connectorName: "1号接口",
                // serviceTel: "18x-xxxx-xxxx",
                // star: 4,
                // chargeId: 1223234,
                // feedbackNote: "充电迅速，体验感好",
                // createTime: "2024-04-25",
                // state: 4,
                // vehicleModel: 1,
                // licencePlate: "川A98D3A",
                // startTime: "2024-04-05 12:30:00",
                // endTime: "2024-04-05 13:30:00",
                // electricity: 13.53,
                // cost: 8.43,
            }
        }
    },
    methods: {
        //返回上一页
        goBack: function(){
            history.go(-1);
        },

        //GET 获取订单详情信息
        async getMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            const request = await this.getService({chargeId: urlParams.get('chargeId') || ''});
            console.log(request.data.data);
            this.msg = request.data.data;
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/DetailPage',
                params: pageData
            })
        },
    },
    mounted: function(){
        this.getMsg();
    }
}
</script>

<style>
#chargingcar{
    position: relative;
    padding: 0.2rem;
    background-size: 40%, contain;
    background-repeat: no-repeat;
    background-position: bottom;
    background-color: #f6f8fc;
}

#chargingcar::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0%;
    width: 100%;
    height: 100%;
    transform: translateY(-40%);
    background: linear-gradient(to bottom, transparent, #f6f8fc);
}

#chargingInformation{
    font-size: 20px;
}

#chargingContent{
    margin-left: 10px;
}

#vehicleModel{
    color: #0163aa;
    font-size: 16px;
    margin-bottom: 5px;
}

#car{
    float: right;
    height:65px;
    position: relative;
    right: 20px;
}

#electricityTime{
    color: #6f6f6f;
}

#line{
    height: 1px;
    background-color: #444444;
}

#totalElectricityWords{
    font-size: 16px;
    color: #2f2f2f;
}

#totalElectricity{
    float: right;
    color: #2f2f2f;
}

#totalElectricityNumber{
    font-size: 20px;
}

#totalElectricityDegree{
    padding-left: 5px;
}

#paidInformation{
    font-size: 20px;
}

#costInformation{
    font-size: 20px;
}

#costContent{
    margin-left: 10px;
}

#amountCost{
    font-size: 16px;
    color: #2f2f2f;
}

#cost{
    float: right;
    color: #2f2f2f;
}

#costNumber{
    font-size: 20px;
}

#costWords{
    padding-left: 5px;
}

#paymentStatus{
    font-size: 16px;
    color: #2f2f2f;
}

#status{
    float: right;
}

#chargeUnfinished{
    color: #ffca22;
}

#goPaid{
    color: #7045ff;
}

.licencePlates{
    float: left;
    font-size: 16px;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-left: 3px;
    background-color: #d8dade;
    border-radius: 3px;
    color: #2f2f2f;
    line-height: 20px;
}

#stationInformation{
    font-size: 20px;
}

#chargeId{
    float: right;
    font-size: 14px;
    color: #636363;
}

#stationDetails{
    position: relative;
    left: 10px;
}

#userEvaluate{
    font-size: 20px;
}

#createTime{
    float: right;
    font-size: 14px;
    color: #636363;
}

#starBox{
    float: left;
    position: relative;
    left: 10px;
    color: #ffc409;
}

.stars{
    font-size: 25px;
    padding-left: 10px;
}

#darkStarBox{
    float: left;
    position: relative;
    left: 10px;
    color: #6f6f6f;
}

#feedbackNote{
    float: left;
    margin-top: 10px;
    position: relative;
    left: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #636363;
}

#gpMark{
    float: right;
    padding-bottom: 10px;
    text-decoration: none;
    color: #ffca22;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>