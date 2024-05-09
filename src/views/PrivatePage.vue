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
                        <img v-if="userLocalData.avatar == 4" id="avatar" alt="girl2" src="../../resources/girl2.png" />
                        <img v-else-if="userLocalData.avatar == 3" id="avatar" alt="girl1" src="../../resources/girl1.png" />
                        <img v-else-if="userLocalData.avatar == 2" id="avatar" alt="boy2" src="../../resources/boy2.png" />
                        <img v-else="userLocalData.avatar == 1" id="avatar" alt="boy1" src="../../resources/boy1.png" />
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

                <ion-item button="true">
                    <ion-label>密码</ion-label>
                    <span id="note">
                        <ion-note id="passward" slot="end" v-for="p in userMsg.password">{{ "·" }}</ion-note>
                    </span>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-item button="true">
                    <ion-label>绑定手机</ion-label>
                    <ion-note id="note" slot="end">{{ userMsg.phoneNum }}</ion-note>
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
import {IonHeader, IonToolbar, IonTitle, IonLabel, IonPage, IonContent, IonAlert, IonList, IonIcon, IonItem, IonNote, IonAvatar} from '@ionic/vue';
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
            userLocalData: {
                avatar: 1,
            },
            userMsg: {
                // role: "user",
                // id: "006909112525",
                // name: "18108070530",
                // phoneNum: "18108070530",
                // vip: 1,
                // vipDisableTime: "2024-6-30",
                // password: "123456789",
            },
            alertButtons1: [
                {
                    text: '确定',
                    handler: (data) => {
                        console.log('更新用户头像', data);
                        // var avatar = document.getElementById('avatar');
                        // if(data == 1) {
                        //     avatar.setAttribute('src','../../resources/boy1.png');
                        // }else if(data == 2){
                        //     avatar.setAttribute('src','../../resources/boy2.png');
                        // }else if(data == 3){
                        //     avatar.setAttribute('src','../../resources/girl1.png');
                        // }else{
                        //     avatar.setAttribute('src','../../resources/girl2.png');
                        // }

                        // var userLocalData = {
                        //     'avatar' : data,
                        // }
                        // var str_userLocalData = JSON.stringify(userLocalData);
                        // console.log(str_userLocalData);
                        // localStorage.setItem('userLocalData', str_userLocalData);
                        this.changeUserLocalData(data);
                        // location.reload();
                        // axios.get("../../resources/localData.json")
                        // .then(response => {
                        //     const d = response.data;
                        //     console.log(d);
                        //     // console.log(data);
                        //     d.avatar = data;
                        //     console.log(d);

                        //     axios.put('../../resources/localData.json', d)
                        //     .then(() => {
                        //         console.log('Json文件更新成功');
                        //     })
                        //     .catch(error => {
                        //         console.error('Json文件更新失败',error);
                        //     })
                        // })
                        // .catch(error => {
                        //     console.error('读取Json文件失败',error);
                        // })
                    }
                }
            ],
            alertInputs1: [
                {
                    label: '男一号头像',
                    type: 'radio',
                    value: 1,
                    id: 'avatar1',
                },
                {
                    label: '男二号头像',
                    type: 'radio',
                    value: 2,
                },
                {
                    label: '女一号头像',
                    type: 'radio',
                    value: 3,
                },
                {
                    label: '女二号头像',
                    type: 'radio',
                    value: 4,
                },
            ],
            alertButtons2: [
                {
                    text: '确定',
                    handler: (data) => {
                        console.log("更新用户名称",data[0]);
                        this.userMsg.name = data[0];
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
        }
    },
    methods: {
        changeUserLocalData: function(data){
            this.userLocalData = {
                'avatar' : data,
            }
        },
        getUserLocalData: function(){
            var str_UserLocalData = localStorage.getItem('userLocalData');
            
            console.log(str_UserLocalData);

            var userLocalData = JSON.parse(str_UserLocalData);
            
            this.userLocalData = userLocalData;

            return userLocalData;
            // axios.get("../../resources/localData.json")
            // .then(response => {
            //     const d = response.data;
            //     console.log(d);
            //     this.userLocalData = d;

            // })
            // .catch(error => {
            //     console.error('读取Json文件失败',error);
            // })
        },
        putUserLocalData: function(userAvatar){
            var userLocalData = {
                'avatar' :  userAvatar,
            }

            var str_userLocalData = JSON.stringify(userLocalData);
            console.log(str_userLocalData);

            localStorage.setItem('userLocalData', str_userLocalData);
        },
        goBack: function(){
            history.go(-1);
        },
        async getUserMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            const request = await this.getService({id: urlParams.get('id') || ''});
            console.log(request.data.data);
            this.userMsg = request.data.data;
            
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/PrivatePage',
                params: pageData
            })
        },
    },
    mounted: function() {
        // this.getUserLocalData();
        // console.log(1);
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