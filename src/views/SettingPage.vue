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
                    <ion-label id="signOut">注销账号</ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    trigger="signOut"
                    header="请确认是否注销"
                    :buttons="signOutButtons"
                ></ion-alert>
            </ion-list>

            <ion-list inset="true">
                <ion-item id="quitBtn" button="true" @click="">
                    <ion-label id="quitwords">退出登录</ion-label>
                </ion-item>
                <ion-alert
                    trigger="quitBtn"
                    header="请确认是否退出"
                    :buttons="quitButtons"
                ></ion-alert>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController, IonList, IonItem, IonLabel, IonAlert
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
            //退出提示框
            quitButtons: [
                {
                    text: '取消',
                },
                {
                    text: '确定',
                    handler: () => {
                        this.quit();
                    },
                },
            ],

            //注销提示框
            signOutButtons: [
                {
                    text: '取消',
                },
                {
                    text: '确定',
                    handler: () => {
                        this.signOut();
                    },
                },
            ],
        }
    },
    methods: {
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //GET 用户退出
        async quit() {
            const request = await this.getQuitMsg();
            console.log(request.data);
            if(request.data.code==200){
                this.setLocalIsLoginFalse();
                this.quitSuccess();
            }else{
                this.quitFailure(request.data.message);
            }
        },
        getQuitMsg:function() {
            return request({
                url: '/logout',
                methods: 'GET',
            })
        },

        //DELET 用户注销
        async signOut()  {
            const request = await this.deletSignOut();
            console.log(request.data);
            if(request.data.code==200){
                this.setLocalIsLoginFalse();
                this.signOutSuccess();
            }else{
                this.signOutFailure(request.data.message);
            }
        },
        deletSignOut:function() {
            return request({
                url: '/person',
                method: 'DELETE',
            })
        },

        //设置isLogin为false
        setLocalIsLoginFalse: function(){
            localStorage.setItem('isLogin', 0);
        },

        //退出成功弹窗
        quitSuccess :async() => {
            const alert = await alertController.create({
                header: '退出成功',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            
                            window.location.href = "/tabs/PersonPage";
                        }
                    }
                ]
            });
            await alert.present();
        },

        //退出失败弹窗
        quitFailure :async(message) => {
            const alert = await alertController.create({
                header: '退出失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //注销成功弹窗
        signOutSuccess :async() => {
            const alert = await alertController.create({
                header: '注销成功',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/PersonPage";
                        }
                    }
                ]
            });
            await alert.present();
        },

        //注销失败弹窗
        signOutFailure :async(message) => {
            const alert = await alertController.create({
                header: '注销失败',
                message: message,
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

#quitBtn{
    --ion-background-color: #cb1a27;
    border-radius: 5px;
}

#quitwords{
    text-align: center;
    color: #f7f9fc;
}
</style>