<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                <span id="vehicleBrand">品牌：{{ msg.vehicleBrand }}</span>
                <div id="vehicleModel">
                    <span v-if="msg.vehicleModel==1">直流快充</span>
                    <span v-if="msg.vehicleModel==2">交流漫充</span>
                    <span v-if="msg.vehicleModel==3">交直流混合充电</span>
                </div>
            </ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <div id="licencePlatesBox" v-for="lp in msg.licencePlate">
                <span class="licencePlates">{{ lp }}</span>
            </div>
            <br>
            <span id="electricity">{{ msg.electricity }}W</span>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, } from '@ionic/vue';

export default {
    name: "vehicleCard",
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
#vehicleModel{
    float: right;
    font-size: 16px;
}

#vehicleBrand{
    font-size: 16px;
    position: relative;
    left: 10px;
}

#licencePlatesBox{
    margin-left: 20px;
}

.licencePlates{
    float: left;
    font-size: 20px;
    width: 24px;
    height: 24px;
    text-align: center;
    margin-left: 10px;
    background-color: #d8dade;
    border-radius: 3px;
    color: #2f2f2f;
    line-height: 24px;
}

#electricity{
    font-size: 16px;
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>