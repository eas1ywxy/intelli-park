<template>
    <ion-card>
        <ion-card-header id="cardHeader">
            <ion-card-title>
                <span>{{ msg.equipmentName }}</span>
            </ion-card-title>
        </ion-card-header>

        <ion-card-content style="float: left;">
            <span class="connectMsgs">设备生产厂商名称：{{ msg.manufacturerName }}</span>
            <br>
            <span class="connectMsgs">设备型号：{{ msg.equipmentModel }}</span>
            <br>
            <span class="connectMsgs">设备类型：
                <!-- 1:直流设备； 2:交流设备； 3:交直流一体设备； 4:无线设备； 5:其他 -->
                <span v-if="msg.equipmentType == 1">直流设备</span>
                <span v-else-if="msg.equipmentType == 2">交流设备</span>
                <span v-else-if="msg.equipmentType == 3">交直流一体设备</span>
                <span v-else-if="msg.equipmentType == 4">无线设备</span>
                <span v-else-if="msg.equipmentType == 5">其他</span>
            </span>
            <br>
            <span class="connectMsgs">充电设备总功率：{{ msg.power }}W</span>
            <br>


            <div class="equipmentConnectBtn" v-for="(connect, index) in msg.connects" :key="index">
                <ion-button @click="connectBtnOnclick(index)">{{ connect.connectorName }}</ion-button>
            </div>
            <br>
            <div class="connectMsgs" v-if="connectMsg">
                <span>充电接口类型：{{ getConnectMsg(index).connectorType }}</span>
                <br>
                <span>额定功率：{{ getConnectMsg(index).power }}W</span>
                <br>
                <span>适用车型：
                    <!-- 1. 直流快充；2. 交流慢充；3. 交直流混合充电； -->
                    <span v-if="getConnectMsg(index).matchCars == 1">直流快充</span>
                    <span v-else-if="getConnectMsg(index).matchCars == 2">直流快充</span>
                    <span v-else="getConnectMsg(index).matchCars==3">直流快充</span>
                </span>
                <br>
                <span>充电接口状态：
                    <!-- 0:离网； 1:空闲； 2:占用（未充电）; 3:占用（充电中）; 4:占用（预约锁定）; 255:故障 -->
                    <span v-if="getConnectMsg(index).state==0">离网</span>
                    <span v-if="getConnectMsg(index).state==1">空闲</span>
                    <span v-if="getConnectMsg(index).state==2">占用（未充电）</span>
                    <span v-if="getConnectMsg(index).state==3">占用（充电中）</span>
                    <span v-if="getConnectMsg(index).state==4">占用（预约锁定）</span>
                    <span v-if="getConnectMsg(index).state==255">故障</span>
                </span>
                <br>
                <span>地锁状态：
                    <!-- 0:未知； 10:已解锁； 50:已上锁 -->
                    <span v-if="getConnectMsg(index).lockStatus == 0">未知</span>
                    <span v-else-if="getConnectMsg(index).lockStatus == 0">已解锁</span>
                    <span v-else="getConnectMsg(index).lockStatus==0">已上锁</span>
                </span>
            </div>

        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';

export default {
    name: "equipmentCard",
    components: {
        IonButton,
    },
    props: {
        msg: Array,
    },
    data() {
        return {
            msg: this.msg,
            connectMsg: false,
            index: 0,
        }
    },
    methods: {
        connectBtnOnclick(index) {
            if (this.connectMsg && this.index != index) {
                this.index = index;
            } else if (this.connectMsg && this.index == index) {
                this.connectMsg = !this.connectMsg;
            } else {
                this.connectMsg = !this.connectMsg;
                this.index = index;
            }
        },
        getConnectMsg(index) {
            return this.msg.connects[index];
        }
    }
}
</script>

<style>
#cardHeader {
    padding-bottom: 0;
}

.equipmentConnectBtn {
    float: left;
}

.connectMsgs {
    float: left;
    padding-left: 8px;
}
</style>