<template>
    <ion-card :href='`/tabs/StationPage?stationId=${msg.stationId}&longitude=${userMsg.userLng}&latitude=${userMsg.userLat}`'>
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
                <span class="stationDistance">{{ msg.distance }}</span>
                m，服务电话：
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
    name: "chargingCard",
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