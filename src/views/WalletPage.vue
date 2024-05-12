<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>充值</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        我的余额：
                    </ion-card-title>
                </ion-card-header>
                <!-- <ion-card-content>
                    <span>

                    </span>
                </ion-card-content> -->
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="amountTitle">充值金额</span>
                        <span id="amountNum">{{ amount!=0 ? amount : '--' }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <div id="amountBox">
                        <div class="btn" @click="selectAmount(1)">
                            <span class="amount">￥50</span>
                        </div>
                        <div class="btn" @click="selectAmount(2)">
                            <span class="amount">￥80</span>
                        </div>
                        <div class="btn" @click="selectAmount(3)">
                            <span class="amount">￥100</span>
                        </div>
                        <div class="btn" @click="selectAmount(4)">
                            <span class="amount">￥200</span>
                        </div>
                        <div class="btn" @click="selectAmount(5)">
                            <span class="amount">￥500</span>
                        </div>
                        <div class="btn" @click="selectAmount(6)">
                            <span class="amount">￥600</span>
                        </div>
                        <div class="btn" @click="selectAmount(7)">
                            <span class="amount">￥800</span>
                        </div>
                        <div class="btn" id="otherBtn" @click="selectAmount(8)">
                            <span class="amount" id="otherAmount">其他面额</span>
                        </div>
                        <ion-alert
                            trigger="otherBtn"
                            header="请输入其他充值面额"
                            :buttons="alertButtons"
                            :inputs="alertInputs"
                        ></ion-alert>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-button id="open-toast" expand="block">确认充值</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController, IonButton, IonList, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonAlert
} from '@ionic/vue';
import { 
    arrowBackOutline,
} from 'ionicons/icons';
</script>

<script>
export default {
    name: 'WalletPage.vue',
    data(){
        return {
            amount: 0,
            amountList:[50, 80, 100, 200, 500, 600, 800],

            //输入其他面额
            alertButtons: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('取消自定义面额');
                    }
                },
                {
                    text: '确定',
                    handler: (data) => {
                        console.log("自定义面额",data[0]);
                        if(data[0]>1500||data[0]<=0){
                            this.changeFailure();
                            this.amount = 0;
                        }else{
                            this.amount = data[0];
                        }
                    }
                }
            ],
            alertInputs: [
                {
                    placeholder: '最高不超过1500元',
                    attributes: {
                        maxlength: 10,
                    },
                }
            ],
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //选择充值金额
        selectAmount(index){
            let btn = document.getElementsByClassName('btn');
            // console.log(btn.length);
            for(let i=0; i<btn.length; i++){
                btn[i].style.cssText = 'border: 2px solid #b3b3b3';
            }
            btn[index-1].style.cssText = 'border: 2px solid #1E90FF';
            if(index<=7){
                this.amount = this.amountList[index-1];
            }
        },

        //其他面额
        otherAmount(){

        },

        //自定义面额无效
        changeFailure :async() => {
            const alert = await alertController.create({
                header: '设置失败',
                message: '请输入有效面额',
                buttons: ['确定'],
            });
            await alert.present();
        },
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#amountBox{
    float: left;
    padding-bottom: 20px;
}

.btn{
    float: left;
    width: 100px;
    height: 100px;
    border: 2px solid #b3b3b3;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    margin: 7px 7px
}

.amount{
    position: relative;
    top: 35%;
    right: 5%;
}

#amountTitle{
    font-size: 20px;
}

#amountNum{
    font-size: 20px;
    float: right;
    padding-right: 20px;
}

#otherBtn{
    width: 215px;
}

#otherAmount{
    position: relative;
    right: 0%;
}
</style>