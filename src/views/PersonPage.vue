<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center;">我的</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content color="light">

            <ion-card :href='`/tabs/PrivatePage?id=${userMsg.id}`'>
                <ion-card-content>
                    <div id="userBox">
                        <span id="avatarImg">
                            <img v-if="userLocalData.avatar == 4" alt="girl2" src="../../resources/girl2.png" />
                            <img v-else-if="userLocalData.avatar == 3" alt="girl1" src="../../resources/girl1.png" />
                            <img v-else-if="userLocalData.avatar == 2" alt="boy2" src="../../resources/boy2.png" />
                            <img v-else="userLocalData.avatar == 1" alt="boy1" src="../../resources/boy1.png" />
                        </span>
                        <ion-icon id="userMsgBtn" :icon="chevronForward" slot="end"></ion-icon>
                        <span v-if="userMsg.username!=null" id="userMsgOnline">
                            <div id="userName">
                                {{ userMsg.username }}
                                <ion-icon id="pencil" :icon="pencil" slot="end"></ion-icon>
                            </div>
                            <div id="userRole">
                                <div v-if="userMsg.role=='user'">普通用户</div>
                                <div v-if="userMsg.role=='admin'">系统管理员</div> 
                            </div>
                            <div id="userId">{{ userMsg.id }}</div>
                        </span>
                        <span v-else="userMsg.name==null" id="userMsgOutline">
                            <div id="noName">请登录</div>
                        </span>
                    </div>
                </ion-card-content>
            </ion-card>
            
            <ion-card>
                <ion-list inset="true">
                    <ion-item button="true" :href='`/tabs/PrivatePage?id=${userMsg.id}`'>
                        <!-- color: danger红, tertiary蓝, success绿, warning黄 -->
                        <ion-icon :icon="personCircleOutline" color="tertiary" slot="start" size="large"></ion-icon>
                        <ion-label>个人信息</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true" :href='`/tabs/OrderPage?id=${userMsg.id}`'>
                        <ion-icon :icon="documentTextOutline" color="warning" slot="start" size="large"></ion-icon>
                        <ion-label>订单记录</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true" href='/tabs/VehiclePage'>
                        <ion-icon :icon="carSportOutline" color="success" slot="start" size="large"></ion-icon>
                        <ion-label>车辆登记</ion-label>
                        <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                    </ion-item>
                    <ion-item button="true">
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
            userLocalData: {
                avatar: 1,
            },
            userMsg: {
                // role: "user",
                // id: "006909112525",
                // username: "18108070530",
                username: String,
            }
        }
    },
    methods: {
        getUserLocalData: function(){
            var str_UserLocalData = localStorage.getItem('userLocalData');

            console.log(str_UserLocalData);

            if (str_UserLocalData == null){
                this.userLocalData = {
                    'avatar' : 1,
                }
            }

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
        async getUserMsgs()  {
            const request = await this.getService({id:1});
            console.log(request.data.data);
            this.userMsg = request.data.data;
        },
        getService:function(pageData) {
            return request({
                url: '/tabs/PersonPage',
                params: pageData
            })
        }
    },
    mounted: function() {
        // this.getUserLocalData();
        // console.log(1);
        this.getUserMsgs();
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
    left: 10px;
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
    top: 30px;
    left: 20px;
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