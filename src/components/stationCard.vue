<template>
    <ion-card href=''>
        <ion-card-header>
            <ion-card-title class="stationTitle">{{ msg.stationName.length>12 ? msg.stationName.slice(0,12)+"..." : msg.stationName  }}
                <span class="regionName">
                    <div class="stationStatusOnline">
                        <span>在线{{ msg.fastFree }}/{{ msg.fastSum }}</span>
                    </div>
                    <br/>
                    所属园区：{{ msg.regionName }}
                </span>
            </ion-card-title>
            <ion-card-subtitle>
                <span class="stationParkFee">计时充电费用：
                    <span class="parkFee">{{ msg.parkFee }}</span>
                    元/度
                </span>
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <span class="stationStressMsg">
                距离当前 
                <span class="stationDistance">{{ (getDistance(msg.stationLat, msg.stationLng, userMsg.userLat, userMsg.userLng)/1000).toFixed(1) }}</span>
                km，服务电话：
                <span class="stationPhoneNumber">{{ msg.serviceTel }}</span>
            </span>
        </ion-card-content>
    </ion-card>
</template>

<script setup >
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/vue';
</script>

<script>

export default {
    name: "chargingStation",
    props: {
        userMsg: Array,
        msg: Array,
    },
    data() {
        return {
            userMsg: this.userMsg,
            msg: this.msg,
        }
    },
    methods: {
        //通过经纬度求两地间的距离
        getDistance(lat1, lng1, lat2, lng2) {
            lat1 = lat1 || 0;
            lng1 = lng1 || 0;
            lat2 = lat2 || 0;
            lng2 = lng2 || 0;

            var rad1 = lat1 * Math.PI / 180.0;
            var rad2 = lat2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
            var r = 6378137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

            return Math.ceil(distance);
        }
    }
}
</script>

<style>
.stationTitle{
    color: #1E90FF;
}

.regionName{
    font-size: 13px;
    color: var(--ion-card-color, var(--ion-item-color, var(--ion-color-step-550, #737373)));
}

.stationStatusOnline{
    font-size: 16px;
    color: #3CB371;
    float: right;
}

.stationParkFee{
    padding-left: 0.3rem;
}

.parkFee{
    font-size: 18px;
    color: #636363;
}

.stationMsg{
    font-size: 18px;
    color: #636363;
}

.stationPhoneNumber{
    color: #000;
}

.stationDistance{
    color: #000;
}

</style>