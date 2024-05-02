<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>详情信息</span>
                </ion-title>
            </ion-toolbar>
            <ion-toolbar>
                <ion-segment value="conduct">
                    <ion-segment-button @click="changeOption(1)" value="conduct">
                        <ion-label>进行中</ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(2)" value="unpaid">
                        <ion-label>待支付</ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(3)" value="completed">
                        <ion-label>已完成</ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeOption(4)" value="pending">
                        <ion-label>已评价</ion-label>
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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonSegment, IonSegmentButton, IonLabel, IonIcon} from '@ionic/vue';
import { 
    arrowBackOutline,
 } from 'ionicons/icons';
 import orderCard from '@/components/orderCard.vue';
</script>

<script>
export default {
    components: {
        orderCard,
    },
    data() {
        return{
            option: 1,
            conductOrders: [
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 0,
                    cost: 0,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 0,
                    startTime: "2024-4-25-10:30",
                    endTime: "",
                    state: 1,
                },
            ],
            unpaidOrders: [
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 2,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 2,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 2,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 2,
                },
            ],
            completedOrders: [
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 3,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 3,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 3,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 3,
                },
                {
                    chargeId: 1223234,
                    connectorId: 24242525,
                    electricity: 100,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startElectricity: 30,
                    endElectricity: 90,
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 3,
                },

            ],
            pendingOrders: [
                {
                    chargeId: 1223234,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 4,
                },
                {
                    chargeId: 1223234,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 4,
                },
                {
                    chargeId: 1223234,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 4,
                },
                {
                    chargeId: 1223234,
                    cost: 15.7,
                    licencePlate: "川A98D3A",
                    startTime: "2024-4-25-10:30",
                    endTime: "2024-4-25-12:30",
                    state: 4,
                },
            ]
        }
    },
    methods: {
        changeOption: function(data){
            this.option = data;
            console.log("option改为"+data);
        },
        goBack: function(){
            history.go(-1);
        }
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