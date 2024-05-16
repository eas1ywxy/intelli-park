<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title id="connectTitle">{{ connectMsg.connectorName }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <div id="connectMsg">
                <span id="connectorId">ID：{{ connectMsg.connectorId }}</span>
                <br>
                <span id="connectorType">接口类型：
                     <!-- 1:家用插座（模式2）; 2:交流接口插座（模式3,连 接方式B）; 3:交流接口插头（带枪线， 模式3,连接方式C）; 4:直流接口枪头（带枪线， 模式4）; 5:无线充电座； 6:其他 -->
                    <span v-if="connectMsg.connectorType==1">家用插座（模式2）</span>
                    <span v-else-if="connectMsg.connectorType==2">交流接口插座（模式3,连 接方式B）</span>
                    <span v-else-if="connectMsg.connectorType==3">交流接口插头（带枪线， 模式3,连接方式C）</span>
                    <span v-else-if="connectMsg.connectorType==4">直流接口枪头（带枪线， 模式4</span>
                    <span v-else-if="connectMsg.connectorType==5">无线充电座</span>
                    <span v-else="connectMsg.connectorType==6">其他</span>
                </span>
                <br>
                <span id="power">额定功率：{{ connectMsg.power }}W</span>
                <br>
                <span id="matchCars">适用车型：
                    <!-- 1. 直流快充；2. 交流慢充；3. 交直流混合充电； -->
                    <span v-if="connectMsg.matchCars==1">直流快充</span>
                    <span v-else-if="connectMsg.matchCars==1">交流慢充</span>
                    <span v-else="connectMsg.matchCars==1">交直流混合充电</span>
                </span>
            </div>
            <ion-button v-if="connectMsg.state==1" class="connects" expand="block">点击取枪</ion-button>
            <ion-button v-if="connectMsg.state!=1" class="connects" expand="block" :disabled="true">已被占用</ion-button>
        
        </ion-card-content>
    </ion-card>
</template>

<script setup>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton} from '@ionic/vue';
</script>

<script>
export default {
    name: 'connectCard',
    props: {
        connectMsg: Array,
    },
    data(){
        return{
            connectMsg: this.connectMsg,
        }
    },
    methods: {
    },
    mounted: function(){
    }
}
</script>

<style>
#connectTitle{
    font-size: 16px;
}

#connectMsg{
    position: relative;
    left: 10px;
}
</style>