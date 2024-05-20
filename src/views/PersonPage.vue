<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center;">我的</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content color="light">

            <ion-card v-if="isLongin" href='/tabs/PrivatePage'>
                <ion-card-content>
                    <div id="userBox">
                        <span id="avatarImg">
                            <img v-if="avatar == 4" alt="girl2" src="../../resources/girl2.png" />
                            <img v-else-if="avatar == 3" alt="girl1" src="../../resources/girl1.png" />
                            <img v-else-if="avatar == 2" alt="boy2" src="../../resources/boy2.png" />
                            <img v-else="avatar == 1" alt="boy1" src="../../resources/boy1.png" />
                        </span>
                        <ion-icon id="userMsgBtn" :icon="chevronForward" slot="end"></ion-icon>
                        <span id="userMsgOnline">
                            <div id="userName">
                                {{ userMsg.username }}
                                <ion-icon id="pencil" :icon="pencil" slot="end"></ion-icon>
                            </div>
                            <div id="userRole">
                                <div v-if="userMsg.role=='user'">普通用户</div>
                                <div v-if="userMsg.role=='admin'">系统管理员</div> 
                            </div>
                            <div id="userId">ID:{{ userMsg.id }}</div>
                        </span>
                    </div>
                </ion-card-content>
            </ion-card>
            <ion-card v-if="!isLongin" href='/tabs/LoginPage'>
                <ion-card-content>
                    <div id="userBox">
                        <span id="avatarImg">
                            <img v-if="avatar == 4" alt="girl2" src="../../resources/girl2.png" />
                            <img v-else-if="avatar == 3" alt="girl1" src="../../resources/girl1.png" />
                            <img v-else-if="avatar == 2" alt="boy2" src="../../resources/boy2.png" />
                            <img v-else="avatar == 1" alt="boy1" src="../../resources/boy1.png" />
                        </span>
                        <ion-icon id="userMsgBtn" :icon="chevronForward" slot="end"></ion-icon>
                        <span id="userMsgOutline">
                            <div id="noName">登录</div>
                        </span>
                    </div>
                </ion-card-content>
            </ion-card>
            
            <ion-card v-if="isLongin">
                <ion-list inset="true">
                    <ion-item button="true" href='/tabs/PrivatePage'>
                        <!-- color: danger红, tertiary蓝, success绿, warning黄 -->
                        <ion-icon :icon="personCircleOutline" color="tertiary" slot="start" size="large"></ion-icon>
                        <ion-label>个人信息</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true" href='/tabs/OrderPage'>
                        <ion-icon :icon="documentTextOutline" color="warning" slot="start" size="large"></ion-icon>
                        <ion-label>订单记录</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true" :href='`/tabs/VehiclePage?id=${userMsg.id}`'>
                        <ion-icon :icon="carSportOutline" color="success" slot="start" size="large"></ion-icon>
                        <ion-label>车辆登记</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true" href="/tabs/SettingPage">
                        <ion-icon :icon="listCircleOutline" color="danger" slot="start" size="large"></ion-icon>
                        <ion-label>其他设置</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                </ion-list>
            </ion-card>

            
        </ion-content>

    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon, IonLabel} from '@ionic/vue';
import {
    listCircleOutline,
    personCircleOutline,
    chevronForward,
    documentTextOutline,
    carSportOutline,
    pencil,
} from 'ionicons/icons';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "PersonPage",
    components: {

    },
    data() {
        return {
            isLongin: false,
            avatar: Number,
            userMsg: {}
        }
    },
    methods: {
        //获取用户头像
        getUserAvatar(){
            return localStorage.getItem('avatar');
        },

        //判断是否登录了
        getLocalIsLogin(){
            if(localStorage.getItem('isLogin')==1){
                this.isLongin = true;
                this.getUserMsg();
            }else{
                this.isLongin = false;
            }
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
                methods: 'GET',
            })
        }
    },
    mounted: function() {
        this.avatar = this.getUserAvatar();
        this.getLocalIsLogin();
    }
}
</script>

<style>
.unread-indicator {
    background: var(--ion-color-primary);

    width: 10px;
    height: 10px;

    border-radius: 100%;

    position: absolute;

    inset-inline-start: 12px;
    top: 12px;
}

.metadata-end-wrapper {
    position: absolute;

    top: 10px;
    inset-inline-end: 10px;

    font-size: 0.8rem;

    display: flex;
    align-items: center;
}

ion-label strong {
    display: block;

    max-width: calc(100% - 60px);

    overflow: hidden;

    text-overflow: ellipsis;
}

ion-label ion-note {
    font-size: 0.9rem;
}

#userBox{
    width: 100%;
    height: 115px;
    float: left;
}

#avatarImg{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #2f2f2f;
    margin-left: 2%;
    float: left;
}

#userMsgOnline{
    width: 100%;
    height: 100px;
    position: relative;
    left: 5px;
}

#userName{
    font-size: 20px;
    color: #2f2f2f;
    position: relative;
    top: 10px;
    left: 20px;
}

#userRole{
    font-size: 16px;
    color: #2f2f2f;
    position: relative;
    top: 15px;
    left: 20px;
}

#userId{
    font-size: 16px;
    color: #5f5f5f;
    position: relative;
    top: 17px;
    left: 20px;
}

#noName{
    font-size: 20px;
    color: #2f2f2f;
    position: relative;
    top: 35px;
    left: 70px;
}

#userMsgBtn{
    float: right;
    font-size: 35px;
    position: relative;
    top: 30px;
}

#pencil{
    font-size: 16px;
}
</style>