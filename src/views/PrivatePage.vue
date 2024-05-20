<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>个人信息</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list inset="true">
                <ion-item id="avator-alert" button="true">
                    <!-- color: danger红, tertiary蓝, success绿, warning黄 -->
                    <ion-label>头像</ion-label>
                    <ion-avatar aria-hidden="true" slot="end">
                        <img v-if="avatar == 4" id="avatar" alt="girl2" src="../../resources/girl2.png" />
                        <img v-else-if="avatar == 3" id="avatar" alt="girl1" src="../../resources/girl1.png" />
                        <img v-else-if="avatar == 2" id="avatar" alt="boy2" src="../../resources/boy2.png" />
                        <img v-else="avatar == 1" id="avatar" alt="boy1" src="../../resources/boy1.png" />
                    </ion-avatar>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    trigger="avator-alert"
                    header="请选择你喜欢的头像"
                    :buttons="alertButtons1"
                    :inputs="alertInputs1"
                ></ion-alert>

                <ion-item id="name-alert" button="true">
                    <ion-label>用户名</ion-label>
                    <ion-note id="note" slot="end">{{ userMsg.username }}</ion-note>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    trigger="name-alert"
                    header="重新设置用户名"
                    :buttons="alertButtons2"
                    :inputs="alertInputs2"
                ></ion-alert>

                <ion-item id="passward-alert" button="true">
                    <ion-label>修改密码</ion-label>
                    <!-- <span id="note">
                        <ion-note id="passward" slot="end" v-for="p in userMsg.password">{{ "·" }}</ion-note>
                    </span> -->
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    trigger="passward-alert"
                    header="重新设置用户密码"
                    :buttons="alertButtons3"
                    :inputs="alertInputs3"
                ></ion-alert>

                <ion-item id="phoneNum-alert" button="true">
                    <ion-label>绑定手机</ion-label>
                    <ion-note id="note" slot="end">{{ userMsg.phoneNum }}</ion-note>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-alert
                    trigger="phoneNum-alert"
                    header="重新绑定用户手机号"
                    :buttons="alertButtons4"
                    :inputs="alertInputs4"
                ></ion-alert>

                <ion-item button="true" :href="`/tabs/WalletPage?id=${userMsg.id}`">
                    <ion-label>账户余额</ion-label>
                    <ion-note id="note" slot="end">{{ userMsg.balance }}</ion-note>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>

                <ion-item button="true">
                    <ion-label>会员到期时间</ion-label>
                    <ion-note id="note" v-if="userMsg.vip==1" slot="end">{{ userMsg.vipDisableTime }}</ion-note>
                    <ion-note id="note" v-else="userMsg.vip==0" slot="end">未开通</ion-note>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>
        </ion-content> 
    </ion-page>
</template>

<script setup>
import {IonHeader, IonToolbar, IonTitle, IonLabel, IonPage, IonContent, IonAlert, IonList, IonIcon, IonItem, IonNote, IonAvatar, alertController } from '@ionic/vue';
import { 
    chevronForward,
    arrowBackOutline,
 } from 'ionicons/icons';
 import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "PrivatePage",
    components: {

    },
    data() {
        return {
            avatar: Number,
            userMsg: {},

            //修改用户头像选择提示框
            alertButtons1: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('取消更新用户头像');
                    }
                },
                {
                    text: '确定',
                    handler: (data) => {
                        console.log('更新用户头像', data);
                        this.setUserAvatar(data);
                        this.avatar = this.getUserAvatar();
                    }
                }
            ],
            alertInputs1: [
                {
                    label: '一号头像-男',
                    type: 'radio',
                    value: 1,
                    id: 'avatar1',
                },
                {
                    label: '二号头像-男',
                    type: 'radio',
                    value: 2,
                },
                {
                    label: '三号头像-女',
                    type: 'radio',
                    value: 3,
                },
                {
                    label: '四号头像-女',
                    type: 'radio',
                    value: 4,
                },
            ],

            //修改用户名称选择提示框
            alertButtons2: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('取消更改用户名称');
                    }
                },
                {
                    text: '确定',
                    handler: (data) => {
                        console.log("更新用户名称",data[0]);
                        this.putUsername(data[0]);
                    }
                }
            ],
            alertInputs2: [
                {
                    placeholder: '不超过10个字符',
                    attributes: {
                        maxlength: 10,
                    },
                }
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

            //修改用户手机号选择提示框
            alertButtons4: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('取消更改用户手机号');
                    }
                },
                {
                    text: '确定',
                    handler: (data) => {
                        console.log("更新用户手机号",data[0]);
                        this.putPhoneNum(data[0]);
                    }
                }
            ],
            alertInputs4: [
                {
                    placeholder: '请输入11位的手机号',
                    attributes: {
                        maxlength: 11,
                    },
                }
            ],
        }
    },
    methods: {
        //返回上一页
        goBack: function(){
            history.go(-1);
        },

        //获取用户头像
        getUserAvatar(){
            return localStorage.getItem('avatar');
        },

        //设置用户头像
        setUserAvatar(data){
            localStorage.setItem('avatar', data);
        },

        //GET 获取用户个人信息
        async getUserMsg()  {
            const request = await this.getService();
            console.log(request.data);
            this.userMsg = request.data.data;
        },
        getService:function() {
            return request({
                url: '/person/getInfo',
                method: 'GET',
            })
        },

        //PUT 修改用户名称
        async putUsername(username){
            let info = {
                username: username,
            };
            const request = await this.updateUsername(info);
            console.log(request);
            if(request.data.code==200){
                this.changeSuccess();
                this.setLocalUserMsg(request.headers.authorization);
                this.getUserMsg();
            }else{
                this.changeFailure(request.data.message);
            }
        },
        updateUsername: function(info) {
            return request({
                url: '/person/update/' + this.userMsg.id,
                method: 'PUT',
                data: info,
            })
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
                this.changePasswordSuccess();
                this.getUserMsg();
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
        
        //PUT 修改用户手机号
        async putPhoneNum(phoneNum){
            let info = {
                phoneNum: phoneNum,
            }
            const request = await this.updatePhoneNum(info);
            console.log(request.data);
            if(request.data.code==200){
                this.changeSuccess();
                this.getUserMsg();
            }else{
                this.changeFailure(request.data.message);
            }
        },
        updatePhoneNum: function(info) {
            return request({
                url: '/person/update/' + this.userMsg.id,
                method: 'PUT',
                data: info,
            })
        },

        //修改失败
        changeFailure :async(message) => {
            const alert = await alertController.create({
                header: '修改失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },
        //修改成功
        changePasswordSuccess :async() => {
            const alert = await alertController.create({
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
        //修改成功
        changeSuccess :async() => {
            const alert = await alertController.create({
                header: '修改成功',
                buttons: ['确定'],
            });
            await alert.present();
        },

        //localStorage 保存用户登录信息
        setLocalUserMsg(authorization){
            let token = authorization.replace('Bearer','').trim();
            localStorage.setItem('token', token);
        },
    },
    mounted: function() {
        this.avatar = this.getUserAvatar();
        this.getUserMsg();
    }
    
}


</script>

<style>
#note{
    font-size: 16px;
    margin-bottom: 5px;
    position: relative;
    bottom: 1px;
}

#passward{
    font-size: 30px;
    position: relative;
    top: 4px;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>