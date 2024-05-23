<template>
    <ion-card :href='`/tabs/DetailPage?chargeId=${msg.chargeId}`'>
        <ion-card-header>
            <ion-card-title>
                <span id="startTime" class="fontFamliy">{{ msg.startTime }}</span>
                <span id="orderState" class="fontFamliy">
                    <span v-if="msg.state == 1" style="color: #2dd55b;">进行中</span>
                    <span v-else-if="msg.state == 2" style="color: #ffc409;">待支付</span>
                    <span v-else-if="msg.state == 3" style="color: #0054e9;">已完成</span>
                    <span v-else="msg.state == 4" style="color: #5f5f5f;">已评价</span>
                    <br>
                </span>
                <span id="orderId" class="fontFamliy">ID：{{ msg.chargeId }}</span>
            </ion-card-title>
        </ion-card-header>
        <ion-card-content id="cardContent" >
            <span class="fontFamliy">登记车牌：{{ msg.licencePlate }}<br></span>
            <span class="fontFamliy">
                <span v-if="msg.endTime != ''">结束时间：{{ msg.endTime }}</span>
                <span v-else="msg.endTime == ''">结束时间：未结束</span>
                <br>
            </span>
            <span class="fontFamliy">
                <span v-if="msg.electricity != 0 && msg.state != 3 &&msg.state != 4">本次充电量：{{ msg.electricity }}KW·h<br></span>
            </span>
            <span class="fontFamliy" v-if="msg.state != 4">
                <span v-if="msg.endElectricity==0" id="electricity">开始电量：{{ msg.startElectricity }}%</span>
                <span v-if="msg.endElectricity!=0" id="electricity">本次充电：{{ msg.startElectricity }}% => {{ msg.endElectricity }}%</span>
            </span>
            <span class="fontFamliy" id="cost" v-if="msg.cost != 0 && msg.state != 4">
                <span v-if="msg.state!=1">{{ msg.cost }}元</span>
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
.fontFamliy{
    font-family: "楷体";
    font-weight: 500;
}

#orderState{
    font-size: 18px;
    float: right;
}

#startTime{
    font-size: 20px;
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
    float: right;
    font-size: 20px;
    color: #454545;
    position: relative;
    right: 15px;
    color: #f9c521;
}
</style>