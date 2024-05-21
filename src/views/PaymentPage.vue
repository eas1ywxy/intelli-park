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
                        <span id="cost">{{ msg.cost }}元</span>
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <span>服务费：{{ msg.serviceCost }}元</span>
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

            <ion-button v-if="msg.cost < userMsg.balance" id="open-toast" @click="postWalletRecharge(msg.cost)" expand="block">确认支付</ion-button>
            <ion-button v-else="msg.cost > userMsg.balance" id="open-toast" expand="block" href="/tabs/WalletPage">去充值</ion-button>
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
            msg:{},
            userMsg:{},
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //GET 获取订单详情信息
        async getMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            let chargeId = urlParams.get('chargeId') || '';
            const request = await this.getService(chargeId);
            console.log('charge',request.data);
            this.msg = request.data.data;
        },
        getService:function(chargeId) {
            return request({
                url: '/chargingRecords/detail/' + chargeId,
                mothod: 'GET',
            })
        },

        //GET 获取用户个人信息
        async getUserMsg()  {
            const request = await this.getUserService();
            console.log('user',request.data);
            this.userMsg = request.data.data;
        },
        getUserService:function() {
            return request({
                url: '/person/getInfo',
                method: 'GET',
            })
        },

        //POST 充电费用支付
        async postWalletRecharge(money)  {
            console.log(money);
            const urlParams = new URLSearchParams(window.location.search);
            let chargeId = urlParams.get('chargeId') || '';
            const request = await this.postWallet({money: money}, chargeId);
            console.log(request.data);
            if(request.data.code==200){
                this.paySuccess();
            }else{
                this.payFailure(request.data.message);
            }
        },
        postWallet:function(money, id) {
            return request({
                url: '/charging/pay/' + id,
                method: 'POST',
                params: money,
                //data: chargeId
            })
        },

        //支付成功
        paySuccess :async() => {
            const alert = await alertController.create({
                header: '支付成功',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/OrderPage";
                        }
                    }
                ],
            });
            await alert.present();
        },

        //支付失败
        payFailure :async(message) => {
            const alert = await alertController.create({
                header: '支付失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },
    },
    mounted: function(){
        this.getMsg();
        this.getUserMsg();
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