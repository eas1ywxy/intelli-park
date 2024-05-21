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
            stationMsgs: [],
        }
    },
    methods: {
        //GET 获取充电站信息
        async getStationMsgs()  {
            const request = await this.getService({maxDistance: 10000, longitude: 103.98748, latitude:30.5817, isNormal:true, isPublic:true, maxKW:1000, isHS: false});
            console.log(request.data);
            this.stationMsgs = request.data.data;
        },
        getService:function(pageData) {
            return request({
                url: '/stations/near',
                params: pageData
            })
        }
    },
    mounted: function() {
        this.getStationMsgs();
        // this.getLongitudeLatitude();
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