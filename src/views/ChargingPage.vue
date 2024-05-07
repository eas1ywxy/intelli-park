<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center;">您附近的充电站</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <station-card class="stationCard" v-for="stationMsg in stationMsgs" :msg="stationMsg" :user-msg="userMsg"></station-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import stationCard from '@/components/stationCard.vue';
import request from '@/utils/require.ts';
</script>

<script>

export default {
    name: "ChargingPage",
    components: {
        stationCard,
    },
    data() {
        return {
            userMsg: {
                userLat: 30.5817,
                userLng: 103.98748,
            },
            stationMsgs: [
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            
        ],
        }
    },
    methods: {
        async getStationMsgs()  {
            const request = await this.getService({pageNum:1,pageSize:10,stationType:1});
            console.log(request.data.data.records);
            this.stationMsgs = request.data.data.records;
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/ChargingPage',
                params: pageData
            })
        }
    },
    mounted: function() {
        this.getStationMsgs();
    }
}
</script>

<style>
.stationCard{
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>