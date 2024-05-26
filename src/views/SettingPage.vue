<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">其他设置</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list inset="true">
                <ion-item button="true">
                    <ion-label id="signOut"><span class="fontFamliy">注销账号</span></ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    css-class="fontFamliy alertTwoButton"
                    trigger="signOut"
                    header="请确认是否注销"
                    :buttons="signOutButtons"
                ></ion-alert>

                <ion-item id="passward-alert" button="true">
                    <ion-label><span class="fontFamliy">修改密码</span></ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    css-class="fontFamliy alertTwoButton"
                    trigger="passward-alert"
                    header="重新设置用户密码"
                    :buttons="alertButtons3"
                    :inputs="alertInputs3"
                ></ion-alert>
            </ion-list>

            <ion-list inset="true" class="fontFamliy">
                <ion-item id="quitBtn" button="true" @click="">
                    <ion-label id="quitwords"><span class="fontFamliy">退出登录</span></ion-label>
                </ion-item>
                <ion-alert
                    css-class="fontFamliy alertTwoButton"
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

            //修改用户密码选择提示框
            alertButtons3: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('取消更改用户密码');
                    }
                },
                {
                    text: '确定',
                    handler: (data) => {
                        console.log("更新用户密码", data[0], data[1]);
                        this.postPassword(data[0], data[1]);
                    }
                }
            ],
            alertInputs3: [
                {
                    placeholder: '请输入旧密码',
                    attributes: {
                        maxlength: 20,
                    },
                },
                {
                    placeholder: '请输入新密码',
                    attributes: {
                        maxlength: 20,
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

        //POST 修改用户密码
        async postPassword(oldP, newP)  {
            let info = {
                oldPassword: oldP,
                newPassword: newP,
            };
            const request = await this.updatePassword(info);
            console.log(request.data);
            if(request.data.code==200){
                this.setLocalIsLoginFalse();
                this.changePasswordSuccess();
            }else{
                this.changeFailure(request.data.message);
            }
        },
        updatePassword: function(info) {
            return request({
                url: '/person/updatePassword',
                method: 'POST',
                data: info,
            })
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
                cssClass: 'fontFamliy alertOneButton',
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
                cssClass: 'fontFamliy alertOneButton',
                header: '退出失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //注销成功弹窗
        signOutSuccess :async() => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
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
                cssClass: 'fontFamliy alertOneButton',
                header: '注销失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },

        //修改密码成功
        changePasswordSuccess :async() => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '修改成功',
                message: '请重新登录',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            window.location.href = "/tabs/LoginPage";
                        }
                    }
                ],
            });
            await alert.present();
        },

        //修改失败
        changeFailure :async(message) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '修改失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

.alertOneButton{
    .alert-wrapper {
        border-radius: 15px;
    }
    .alert-title {
        text-align: center;
    }
    .alert-button-group {
      padding: 0;
      border-top: 1px solid #e1dce6;
      justify-content: center;
    }
    .alert-message {
      max-height: 240px;
      text-align:center;
    }
    .alert-button {
      widows: 100%;
      margin:0;
    }
}

.alertTwoButton{
    .alert-wrapper {
        border-radius: 15px;
    }
    .alert-title {
        text-align: center;
    }
    .alert-button-group {
      padding: 0;
      border-top: 1px solid #e1dce6;
    }
    .alert-message {
      max-height: 240px;
      text-align:center;
    }
    .alert-button {
      width: 50%;
      border-left: 1px solid #e1dce6;
      margin:0;
      padding-right: 45px;
    }
}

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
    font-size: 16px;
    text-align: center;
    color: #f7f9fc;
}
</style>