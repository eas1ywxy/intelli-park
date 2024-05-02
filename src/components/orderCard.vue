<template>
    <ion-card href=''>
        <ion-card-header>
            <ion-card-title>
                <span id="startTime">{{ msg.startTime }}</span>
                <span id="orderState">
                    <span v-if="msg.state == 1" style="color: #2dd55b;">进行中</span>
                    <span v-else-if="msg.state == 2" style="color: #ffc409;">待支付</span>
                    <span v-else-if="msg.state == 3" style="color: #0054e9;">已完成</span>
                    <span v-else="msg.state == 4" style="color: #5f5f5f;">已评价</span>
                </span>
                <br>
                <span id="orderId">ID：{{ msg.chargeId }}</span>
            </ion-card-title>
        </ion-card-header>

        <ion-card-content id="cardContent" style="float: left;">
            <span>登记车牌：{{ msg.licencePlate }}<br></span>
            <span>
                <span v-if="msg.endTime != ''">结束时间：{{ msg.endTime }}</span>
                <span v-else="msg.endTime == ''">结束时间：未结束</span>
                <br>
            </span>
            <span v-if="msg.state != 3 && msg.state != 4">接口编码：{{ msg.connectorId }}<br></span>
            <span>
                <span v-if="msg.electricity != 0 && msg.state != 3 &&msg.state != 4">本次充电量：{{ msg.electricity }}W<br></span>
            </span>
            <span id="cost" v-if="msg.cost != 0 && msg.state != 4">
                <span>充电费用：{{ msg.cost }}元<br></span>
            </span>
            
            <span v-if="msg.state != 4">
                <span v-if="msg.endElectricity==0" id="electricity">开始电量：{{ msg.startElectricity }}%</span>
                <span v-if="msg.endElectricity!=0" id="electricity">开始电量：{{ msg.startElectricity }}% => {{ msg.endElectricity }}</span>
            </span>
            
        </ion-card-content>
    </ion-card>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, } from '@ionic/vue';

export default {
    name: "orderCard",
    props: {
        msg: Array,
    },
    data() {
        return{
            msg: this.msg,
        }
    }
}
</script>

<style>
#orderState{
    font-size: 18px;
    float: right;
    /* color: #2dd55b; */
}

#startTime{
    font-size: 22px;
}

#orderId{
    float: right;
    font-size: 14px;
    padding-left: 10px;
    color: #636363;
}

#cardContent{
    position: relative;
    top: -15px;
    left: 10px;
    color: #454545;
}

#cost{
    font-size: 18px;
    color: #454545;
}
</style>