<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>登录</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="logo">
                <img src="../../resources/logo.png" alt="logo">
            </div>

            <ion-card>
                <ion-card-header>
                    <ion-card-title id="loginTitle">
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-input class="input" label="用户名" label-placement="floating" fill="solid" placeholder="请输入用户名"></ion-input>
                    <br>
                    <ion-input class="input" label="密码" label-placement="floating" fill="solid" placeholder="请输入密码"></ion-input>
                </ion-card-content>
            </ion-card>

            <ion-button v-if="hasAccount" class="mainButton" expand="block">登录</ion-button>
            <ion-button v-else="!hasAccount" class="mainButton" expand="block">注册</ion-button>
            <ion-button v-if="hasAccount" class="secondButton" expand="block">没有账号？前往登录</ion-button>
            <ion-button v-else="!hasAccount" class="secondButton" expand="block">已有账号，去登陆</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonButton,
} from '@ionic/vue';
import { 
    arrowBackOutline,
} from 'ionicons/icons';
</script>

<script>
export default {
    name: 'LoginPage',
    data(){
        return{
            hasAccount: true,
        }
    },
    methods:{
        //返回行一页
        goBack: function(){
            history.go(-1);
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

#logo{
    width: 80px;
    height: 80px;
    margin: 10% 40%
}

#login{
    text-align: center;
}

.input{
    border: 2px solid #1E90FF;
    border-radius: 5px;
}

.mainButton{
    margin: 10px;   
}

.secondButton{
    margin: 10px;
}
</style>