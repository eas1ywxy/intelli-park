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
                <ion-card-content v-if="hasAccount">
                    <ion-input class="input" id="username1" label="用户名" label-placement="floating" fill="solid" placeholder="请输入用户名"></ion-input>
                    <br>
                    <ion-input class="input" id="password1" label="密码" label-placement="floating" fill="solid" placeholder="请输入密码"></ion-input>
                </ion-card-content>
                <ion-card-content v-else="!hasAccount">
                    <ion-input class="input" id="username2" label="用户名" label-placement="floating" fill="solid" placeholder="请输入用户名"></ion-input>
                    <br>
                    <ion-input class="input" id="phoneNum" label="手机号" label-placement="floating" fill="solid" placeholder="请输入手机号"></ion-input>
                    <br>
                    <ion-input class="input" id="password2" label="密码" label-placement="floating" fill="solid" placeholder="请输入密码"></ion-input>
                </ion-card-content>
            </ion-card>

            <ion-button v-if="hasAccount" class="mainButton" @click="postLoginMsg" expand="block">登录</ion-button>
            <ion-button v-else="!hasAccount" class="mainButton" @click="postRegistrationMsg" expand="block">注册</ion-button>
            <ion-button v-if="hasAccount" class="secondButton" @click="RegisterOrLogin" expand="block">没有账号？前往登录</ion-button>
            <ion-button v-else="!hasAccount" class="secondButton" @click="RegisterOrLogin" expand="block">已有账号，去登陆</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonButton, alertController,
} from '@ionic/vue';
import { 
    arrowBackOutline,
} from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: 'LoginPage',
    data(){
        return{
            hasAccount: true,
            loginMsg: {
                username: String,
                password: String,
            },
            registrationMsg: {
                username: String,
                password: String,
                phoneNum: Number,
            },
            userId: Number,
        }
    },
    methods:{
        //返回行一页
        goBack: function(){
            history.go(-1);
        },

        //注册或者登录
        RegisterOrLogin(){
            this.hasAccount = !this.hasAccount;
        },

        //POST 用户登录
        async postLoginMsg()  {
            let username = document.getElementById("username1");
            this.loginMsg.username = username.value;

            let password = document.getElementById("password1");
            this.loginMsg.password = password.value; 

            const request = await this.postLoginInformation(this.loginMsg);
            console.log(request);

            if (request.data.code==200){
                this.setLocalUserMsg(request.headers.authorization);
                this.loginSuccess(this.loginMsg.username);
            }else{
                this.loginFailure(request.data.message);
            }
        },
        postLoginInformation: function(info) {
            return request({
                url: '/login/user',
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: Object.keys(info).map(key => `${key}=${encodeURI(info[key])}`).join('&'),
            })
        },

        //POST 用户注册
        async postRegistrationMsg()  {
            let username = document.getElementById("username2");
            this.registrationMsg.username = username.value;

            let phoneNum = document.getElementById("phoneNum");
            this.registrationMsg.phoneNum = phoneNum.value;

            let password = document.getElementById("password2");
            this.registrationMsg.password = password.value; 

            const request = await this.postRegistrationInformation(this.registrationMsg);
            console.log(request.data);

            if (request.data.code==200){
                this.registrationSuccess();
                this.hasAccount = true;
            }else{
                this.registrationFailure(request.data.message);
            }
        },
        postRegistrationInformation: function(info) {
            return request({
                url: '/person/register/user',
                method: 'POST',
                data: info,
            })
        },

        //登录失败
        loginFailure :async(message) => {
            const alert = await alertController.create({
                header: '登录失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //登录成功
        loginSuccess :async(message) => {
            const alert = await alertController.create({
                header: '登录成功',
                message: '欢迎登录，'+message,
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/PersonPage";
                        }
                    }
                ],
            });
            await alert.present();
        },

        //注册失败
        registrationFailure :async(message) => {
            const alert = await alertController.create({
                header: '注册失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //注册成功
        registrationSuccess :async() => {
            const alert = await alertController.create({
                header: '注册成功',
                message: '请登录',
                buttons: ['确定'],
            });
            await alert.present();
        },

        //localStorage 保存用户登录信息
        setLocalUserMsg(authorization){
            let token = authorization.replace('Bearer','').trim();
            localStorage.setItem('token', token);
            localStorage.setItem('isLogin', 1);
        },

    },
    mounted: function() {
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
    margin: 20% 40% 10% 40%;
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