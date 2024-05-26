<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="fontFamliy" style="text-align: center;">您附近的充电站</ion-title>
            </ion-toolbar>
            <ion-toolbar>
                <ion-segment value="1km">
                    <ion-segment-button @click="changeSearchDistance(1)" value="1km">
                        <ion-label><span class="fontFamliy">1km</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeSearchDistance(2)" value="10km">
                        <ion-label><span class="fontFamliy">10km</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button @click="changeSearchDistance(3)" value="100km">
                        <ion-label><span class="fontFamliy">100km</span></ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <station-card class="stationCard" v-for="stationMsg in stationMsgs" :msg="stationMsg" :user-msg="userMsg"></station-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel} from '@ionic/vue';
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
            normalDistace: 1000,
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
            const request = await this.getService({maxDistance: this.normalDistace, longitude: this.userMsg.userLng, latitude: this.userMsg.userLat, isNormal:false, isPublic:true, maxKW:1000, isHS: false});
            console.log(request.data);
            this.stationMsgs = request.data.data;
        },
        getService:function(pageData) {
            return request({
                url: '/stations/near',
                method: 'GET',
                params: pageData,
            })
        },

        //修改搜索距离
        changeSearchDistance(option){
            if(option==1){
                this.normalDistace = 1000;
            }else if(option==2){
                this.normalDistace = 10000;
            }else if(option==3){
                this.normalDistace = 100000;
            }

            this.getStationMsgs();
        },

        //获取用户经纬度
        success(pos) {
            let crd = pos.coords;
            this.userMsg.userLat = crd.latitude;
            this.userMsg.userLng = crd.longitude;
        },
        error(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
        },
        getUserPosition(){
            let options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };
            navigator.geolocation.getCurrentPosition(this.success, this.error, options);
            this.getStationMsgs();
        }
    },
    mounted: function() {
        this.getUserPosition();
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

.stationCard{
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>