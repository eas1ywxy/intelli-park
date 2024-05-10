<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>请确认拔枪设备</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="equipmentBox">
                <img id="equipmentImg" src="../../resources/equipment.png" alt="充电桩"/>
                <div id="equipmentMsg">
                    <span>ID：{{ equipmentMsg.equipmentId }}</span>
                    <br/>
                    <span>设备名称：{{ equipmentMsg.equipmentName }}</span>
                    <br/>
                    <span>所属充电站：{{ equipmentMsg.stationName }}</span>
                    <br/>
                    <span>设备型号：{{ equipmentMsg.equipmentModel }}</span>
                    <br/>
                    <span>设备类型：{{ equipmentMsg.equipmentType }}</span>
                    <br/>
                    <span>设备功率：{{ equipmentMsg.power }}W</span>
                </div>
            </div>
            
            <connect-card v-for="connect in equipmentMsg.connects" :connectMsg="connect"></connect-card>

            </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToast, IonButton,
} from '@ionic/vue';
import { 
    arrowBackOutline,
 } from 'ionicons/icons';
import connectCard from '@/components/connectCard.vue'
import request from '@/utils/require.ts';
</script>

<script>
export default {
    data(){
        return{
            equipmentMsg:{
                // equipmentName: "编号1设备",
                // equipmentId: 124555,
                // stationName: "成都信息工程大学",
                // equipmentModel: "A074",
                // equipmentType: 1,
                // power: 380,
                connects: [
                    {
                        // connectorName: "1号接口",
                        // connectorId: 12423,
                        // connectorType: 2,
                        // power: 80,
                        // matchCars: 2,
                        // state: 2,
                    },
                    {
                        // connectorName: "2号接口",
                        // connectorId: 32423,
                        // connectorType: 1,
                        // power: 80,
                        // matchCars: 1,
                        // state: 0,
                    }
                ]
            },
        }
    },
    methods: {
        goBack: function(){
            history.go(-1);
        },
        async getEquipmentMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            const request = await this.getService({equipmentId: urlParams.get('equipmentId') || ''});
            console.log(request.data.data);
            this.equipmentMsg = request.data.data;
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/DrawGunPage',
                params: pageData
            })
        },
    },
    mounted: function(){
        this.getEquipmentMsg();
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#equipmentBox{
    margin: 20px 15px;
    height: 420px;
    border: 2px solid #1E90FF;
    border-radius: 5px;
}

#equipmentImg{
    margin: 0px 100px;
    width: 200px;
    height: 240px;
    position: relative;
    left: -20px;
}

#equipmentMsg{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 16px;
}
</style>