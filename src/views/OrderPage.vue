<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">订单信息</span>
                </ion-title>
            </ion-toolbar>

            <ion-toolbar>
                <ion-segment :value="conductOrders.length>0 ? 'conduct' : (unpaidOrders.length>0 ? 'unpaid' : 'completed')">
                    <ion-segment-button @click="changeOption(1)" value="conduct">
                        <ion-label><span class="fontFamliy note">进行中</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(2)" value="unpaid">
                        <ion-label><span class="fontFamliy note">待支付</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(3)" value="completed">
                        <ion-label><span class="fontFamliy note">已完成</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(4)" value="pending">
                        <ion-label><span class="fontFamliy note">已评价</span></ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <order-card v-if="option == 1" v-for="conductOrder in conductOrders" :msg="conductOrder"></order-card>
            <order-card v-if="option == 2" v-for="unpaidOrder in unpaidOrders" :msg="unpaidOrder"></order-card>
            <order-card v-if="option == 3" v-for="completedOrder in completedOrders" :msg="completedOrder"></order-card>
            <order-card v-if="option == 4" v-for="pendingOrder in pendingOrders" :msg="pendingOrder"></order-card>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/vue';
import { 
    arrowBackOutline,
 } from 'ionicons/icons';

 import { IonProgressBar } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';

 import orderCard from '@/components/orderCard.vue';
 import request from '@/utils/require.ts';
</script>

<script>
export default defineComponent({
    name: "OrderPage",
    components: {
        orderCard,
        IonProgressBar,
    },
    data() {
        return{
            option: 1,
            conductOrders: [],
            unpaidOrders: [],
            completedOrders: [],
            pendingOrders: [],
        }
    },
    methods: {
        //判断有无充电中或者未支付的订单
        isChargingOrUnpaid(){
            if(this.conductOrders.length>0){
                this.option = 1;
            }else if(this.unpaidOrders.length>0){
                this.option = 2;
            }else{
                this.option = 3;
            }
        },

        //修改订单类别
        changeOption: function(data){
            this.option = data;
            console.log("option改为"+data);
        },

        //返回上一页
        goBack: function(){
            window.location.href = "/tabs/PersonPage";
        },

        //GET 获取用户充电记录
        async getOrderMsg(state)  {
            const request = await this.getChargingRecords({state: state});
            console.log(state, request.data.data);
            if(state == 1){
                this.conductOrders = request.data.data;
            }else if(state == 2){
                this.unpaidOrders = request.data.data;
            }else if(state == 3){
                this.completedOrders = request.data.data;
            }else if(state == 4){
                this.pendingOrders = request.data.data;
            }
            this.isChargingOrUnpaid();
        },
        getChargingRecords:function(info) {
            return request({
                url: '/chargingRecords',
                method: 'GET',
                params: info,
            })
        },
    },
    mounted: function() {
        this.getOrderMsg(1);
        this.getOrderMsg(2);
        this.getOrderMsg(3);
        this.getOrderMsg(4);
    }
})
</script>

<style>
.note{
    font-size: 18px;
}

.fontFamliy{
    font-family: "楷体";
    font-weight: 500;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>