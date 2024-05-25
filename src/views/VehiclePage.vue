<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">车辆信息</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fontFamliy">
            <ion-button id="addCarBtn" expand="block" :href='`/tabs/RegisterPage?id=${userId}`'>+</ion-button>

            <vehicle-card v-for="vehicleMsg in vehiclelist" :msg="vehicleMsg"></vehicle-card>
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
            vehiclelist: Array,
            userId: 0,
        }
    },
    methods: {
        //返回上一页
        goBack: function(){
            window.location.href = "/tabs/PersonPage";
        },
        
        //GET 获取用户车辆信息
        async getUserVehicle()  {
            const urlParams = new URLSearchParams(window.location.search);
            this.userId = urlParams.get('id') || '';
            const request = await this.getVehicle({userId: urlParams.get('id') || '', pageNum:1, pageSize: 20});
            console.log(request.data);
            this.vehiclelist = request.data.data.records;
        },
        getVehicle:function(info) {
            return request({
                url: '/vehicle/list',
                method: 'GET',
                params: info
            }) 
        },
    },
    mounted: function(){
        this.getUserVehicle();
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#addCarBtn{
    font-size: 20px;
}
</style>