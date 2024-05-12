<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>订单评分</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title id="starTitle">
                        请为本次订单打分
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <div id="markBox">
                        <span id="mark">
                            {{ starNum>0 ? (starNum-1).toFixed(1) : (starNum).toFixed(1) }}
                        </span>
                        <span id="markword">分</span>
                    </div>
                    <div id="starBox">
                        <span v-for="index in 5" :key="index">
                            <ion-icon class="stars" @click="keepStarsNum(index)" :icon="starNum>=index+1?star:starOutline" slot="start" size="large"></ion-icon>
                        </span>
                    </div>
                    
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        您对本次服务有哪些建议？
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <textarea id="feedbackNote" placeholder="欢迎为我们提供建议"></textarea>
                </ion-card-content>
            </ion-card>

            <ion-button id="keepReviewBtn" expand="block" @click="postFeedbackNote()">保存信息</ion-button>

            <img id="caky" src="../../resources/caky.png">
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader
} from '@ionic/vue';
import { 
    arrowBackOutline,
    star,
    starOutline,
 } from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: 'ReviewPage',
    data(){
        return{
            starNum: 0,
            chargeMsg:{
                chargeId: Number,
                star: Number,
                feedbackNote: String,
                createTime: String,
            }
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //修改星星个数
        keepStarsNum: function(index){
            this.starNum = index+1;
        },

        //POST 提交用户反馈信息
        postFeedbackNote: function()  {
            const urlParams = new URLSearchParams(window.location.search);
            let chargeId = urlParams.get('chargeId') || '';
            let feedbackNote = document.getElementById("feedbackNote").innerHTML;
            let createTime = new Date();
            let info = {
                chargeId: chargeId,
                starNum: this.starNum,
                feedbackNote: feedbackNote,
                createTime: createTime,
            }
            console.log(info);
            if(info.starNum > 0){
                const request = this.postReviewInformation(info);
                console.log('request:',request);
                if(request){
                    this.keepSuccess();
                    return 0;
                }else{
                    this.keepFailure();
                    return -1;
                }
            }else{
                this.markFailure();
                return -1;
            }
        },
        postReviewInformation: function(info) {
            return request({
                url: '/tabs/ReviewPage',
                method: 'POST',
                data: info,
            })
        },

        //保存失败弹窗
        keepFailure :async() => {
            const alert = await alertController.create({
                header: '保存失败',
                message: '请稍后重试',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //订单打分失败
        markFailure :async() => {
            const alert = await alertController.create({
                header: '保存失败',
                message: '请确保您已对本订单打分',
                buttons: ['确定'],
            });
            await alert.present();
        },
        //保存成功
        keepSuccess :async() => {
            const alert = await alertController.create({
                header: '保存成功',
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

#starBox{
    float: left;
    position: relative;
    left: 10px;
    color: #ffc409;
}

.stars{
    font-size: 25px;
    padding-left: 10px;
}

#feedbackNote{
    width: 100%;  
    height: 150px;
    font-size: 15px;
    border: 2px solid #b3b3b3;
    border-radius: 5px;
    outline-color: #1E90FF;
}

#caky{
    width: 300px;
    margin: 30px 50px;
}

#markBox{
    float: right;
    position: relative;
    bottom: 10px;
    right: 5px;
}

#mark{
    font-size: 40px;
    position: relative;
    right: 3px;
}

#markword{
    font-size: 20px
}
</style>