<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>支付</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="costTitle">本次订单所需支付金额：</span>
                        <span id="cost">{{ costMsg.cost }}元</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>充电消费：{{ costMsg.chargingCost }}元</span>
                    <br>
                    <span>服务费：{{ costMsg.serviceCost }}元</span>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="userBalance">您的余额：</span>
                        <span id="balance">{{ userMsg.balance }}元</span>
                    </ion-card-title>
                </ion-card-header>
            </ion-card>

            <ion-button v-if="costMsg.cost < userMsg.balance" id="open-toast" expand="block">确认支付</ion-button>
            <ion-button v-else="costMsg.cost > userMsg.balance" id="open-toast" expand="block" :href="`/tabs/WalletPage?id=${userMsg.id}`">去充值</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController, IonButton, IonList, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonAlert
} from '@ionic/vue';
import { 
    arrowBackOutline,
} from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "PaymentPage",
    data(){
        return{
            costMsg:{
                // chargeId: 1234235,
                // cost: 12.50,
                // chargingCost: 9.00,
                // serviceCost: 3.50,
            },
            userMsg:{
                // id: 1111,
                // balance: 50.00,
                // vip: 1,
            }
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //GET 获取用户信息
        async getMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            const request = await this.getService({chargeId: urlParams.get('chargeId') || ''});
            console.log(request.data.data);
            this.userMsg = request.data.data.userMsg;
            this.costMsg = request.data.data.costMsg;
            
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/PaymentPage',
                params: pageData
            })
        },
    },
    mounted: function(){
        this.getMsg();
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#cost{
    float: right;
}

#balance{
    float: right;
}
</style>