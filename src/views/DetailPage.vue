<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">订单详情</span>
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
                        <span class="fontFamliy" id="chargingInformation">充电信息</span>
                        <span class="fontFamliy" id="chargeId">ID:{{ msg.chargeId }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content id="chargingContent">
                    <div id="car">
                        <img src="../../resources/car.png" alt="车">
                    </div>
                    <div class="fontFamliy" id="vehicleModel">
                        <span v-if="msg.vehicleModel == 1">直流快充</span>
                        <span v-if="msg.vehicleModel == 2">交流漫充</span>
                        <span v-if="msg.vehicleModel == 3">交直流混合充电</span>
                    </div>
                    <div v-for="lp in msg.licencePlate">
                        <span class="licencePlates fontFamliy">{{ lp }}</span>
                    </div>
                    <br>
                    <hr style="border: 0px;">
                    <div id="electricityTime">
                        <span class="fontFamliy">开始时间：{{ msg.startTime }}</span>
                        <br>
                        <span class="fontFamliy">结束时间：{{ msg.endTime }}</span>
                    </div>
                    <hr id="line">
                    <div class="fontFamliy" style="line-height: 20px;">
                        <span id="totalElectricityWords">合计充电电量</span>
                        <span id="totalElectricity">
                            <span id="totalElectricityNumber">{{ msg.electricity }}</span>
                            <span id="totalElectricityDegree">KW·h</span>
                        </span>
                    </div>
                </ion-card-content>
           </ion-card>

            <ion-card v-if="msg.state >= 3">
                <ion-card-header>
                    <ion-card-title>
                        <span class="fontFamliy" id="userEvaluate">用户体验评价</span>
                        <span class="fontFamliy" id="createTime">{{ msg.feedbackTime }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content v-if="msg.state == 4">
                    <p id="starBox">
                        <span class="stars" v-for="s in msg.star"><ion-icon :icon="star" slot="start" size="large"></ion-icon></span>
                        <span class="stars" v-for="s in (5-msg.star)"><ion-icon :icon="starOutline" slot="start" size="large"></ion-icon></span>
                    </p>
                    <p class="fontFamliy" id="feedbackNote" v-if="msg.feedbackNote.length!=0">
                        <span>备注：{{ String(msg.feedbackNote).length>40 ? msg.feedbackNote.slice(0,39)+"..." : msg.feedbackNote }}</span>
                    </p>
                    <br>
                    <br>
                </ion-card-content>
                <ion-card-content v-if="msg.state ==3">
                    <div class="fontFamliy" id="darkStarBox">
                        <span class="stars" v-for="s in 5"><ion-icon :icon="starOutline" slot="start" size="large"></ion-icon></span>
                    </div>
                    <div class="fontFamliy">
                        <a id="gpMark" :href="`/tabs/ReviewPage?chargeId=${msg.chargeId}&userId=${msg.userId}`">还未评分，前往评分</a>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span class="fontFamliy" id="costInformation">支付信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content id="costContent">
                    <span class="fontFamliy" id="amountCost">支付金额</span>
                    <span class="fontFamliy" id="cost">
                        <span id="costNumber" v-if="msg.cost">{{ msg.cost }}</span>
                        <span id="costNumber" v-if="!msg.cost">--</span>
                        <span id="costWords">元</span>
                    </span>
                    <hr id="line">
                    <span>
                        <span class="fontFamliy" id="paymentStatus">支付状态</span>
                        <span class="fontFamliy" id="status">
                            <span id="chargeUnfinished" v-if="msg.state == 1"><a :href="`/tabs/TopupPage?chargeId=${msg.chargeId}`">查看充电状态</a></span>
                            <span id="goPaid" v-else-if="msg.state == 2"><a :href="`/tabs/PaymentPage?id=${msg.id}&chargeId=${msg.chargeId}`">尚未支付，前往支付</a></span>
                            <span id="havePaid" v-else="msg.state >= 3">已支付</span>
                        </span>
                    </span>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span class="fontFamliy" id="stationInformation">站点信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content class="fontFamliy" id="stationDetails">
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
            msg: {}
        }
    },
    methods: {
        //返回上一页
        goBack: function(){
            window.location.href = "/tabs/OrderPage";
        },

        //GET 获取订单详情信息
        async getMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            let chargeId = urlParams.get('chargeId') || '';
            const request = await this.getService(chargeId);
            console.log(request.data);
            this.msg = request.data.data;
        },
        getService:function(chargeId) {
            return request({
                url: '/chargingRecords/detail/' + chargeId,
                mothod: 'GET',
            })
        },
    },
    mounted: function(){
        this.getMsg();
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

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
    left: 45px;
    bottom: 20px;
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
    font-size: 18px;
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

#chargeUnfinished a{
    font-size: 16px;
    text-decoration: none;
    outline: none;
    color: #f9c521;
}

#goPaid a{
    font-size: 16px;
    text-decoration: none;
    outline: none;
    color: #7045ff
}

#havePaid{
    font-size: 16px;
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
    font-size: 16px;
    color: #636363;
}

#starBox{
    float: left;
    position: relative;
    left: 10px;
    bottom: 5px;
    color: #f9c521;
}

.stars{
    font-size: 25px;
    padding-left: 10px;
}

#darkStarBox{
    /* float: left; */
    position: relative;
    left: 10px;
    color: #6f6f6f;
}

#feedbackNote{
    /* float: left; */
    position: absolute;
    top: 30px;
    font-size: 14px;
    color: #636363;
}

#gpMark{
    font-size: 16px;
    float: right;
    padding-bottom: 10px;
    text-decoration: none;
    color: #f9c521;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>