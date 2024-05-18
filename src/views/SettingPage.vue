<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>其他设置</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list inset="true">
                <ion-item button="true">
                    <ion-label>注销账号</ion-label>
                    <!-- <ion-note id="note" slot="end">{{ userMsg.username }}</ion-note> -->
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list inset="true">
                <ion-item id="quitBtn" button="true" @click="quit">
                    <ion-label id="quitwords">退出登录</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController, IonButton, IonList, IonItem
} from '@ionic/vue';
import { 
    arrowBackOutline,
    chevronForward,
 } from 'ionicons/icons';
 import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: 'SettingPage',
    data(){
        return{

        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //GET 用户退出
        async quit()  {
            const request = await this.getQuitMsg();
            console.log(request.data);
            this.setLocalIsLoginFalse();
            window.location.href = "/tabs/PersonPage";
        },
        getQuitMsg:function() {
            return request({
                url: '/logout',
                methods: 'GET',
            })
        },

        //设置isLogin为false
        setLocalIsLoginFalse(){
            localStorage.setItem('isLogin', 0);
        }
    }
}
</script>

<style>
#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}

#quitBtn{
    --ion-background-color: #cb1a27;
    border-radius: 5px;
}

#quitwords{
    text-align: center;
    color: #f7f9fc;
}
</style>