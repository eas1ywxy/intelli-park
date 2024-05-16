<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>车辆信息</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-button id="addCarBtn" expand="block" :href='`/tabs/RegisterPage?id=${userId}`'>+</ion-button>

            <vehicle-card v-for="vehicleMsg in vehicleMsgs" :msg="vehicleMsg"></vehicle-card>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton} from '@ionic/vue';
import {
    arrowBackOutline,
} from 'ionicons/icons';
import vehicleCard from '@/components/vehicleCard.vue';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "VehiclePage",
    components: {
        vehicleCard,
    },
    data() {
        return {
            vehicleMsgs: [
                // {
                //     vehicleBrand: "红旗",
                //     vehicleModel: 1,
                //     licencePlate: "川A5235A9",
                //     electricity: 100
                // },
                // {
                //     vehicleBrand: "五凌红光",
                //     vehicleModel: 2,
                //     licencePlate: "川A5585d9",
                //     electricity: 100
                // },
            ],
            userId: Number,
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            // history.go(-1);
            window.open('/tabs/PersonPage');
        },

        
        //GET获取用户车辆信息
        async getVehicleMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            const request = await this.getService({id: urlParams.get('id') || ''});
            console.log(request.data.data.vehicleMsgs);
            this.vehicleMsgs = request.data.data.vehicleMsgs;
            console.log(request.data.data.id);
            this.userId = request.data.data.id; 
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/VehiclePage',
                params: pageData
            })
        },
    },
    mounted: function(){
        this.getVehicleMsg();
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#addCarBtn{
    font-size: 20px;
}
</style>