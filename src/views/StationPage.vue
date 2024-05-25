<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="arrowBackOutline" slot="end"></ion-icon>
                    </span>
                    <span class="fontFamliy">详情信息</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <div id="chargingcar">
                <img src="../../resources/chargingcar.jpg" alt="汽车">
            </div>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="stationName" class="fontFamliy">{{ msg.stationName.length>15 ? msg.stationName.slice(0,15)+"..." : msg.stationName }}</span>
                    </ion-card-title>
                    <ion-card-subtitle>
                        <span id="stationType" class="fontFamliy">
                            <!-- 站点类型：1:公共； 50;个人； 100:公交（专用）; 101:环卫（专用） 102:物流（专用）; 103:出租车（专用）; 255:其他 -->
                            <span v-if="msg.stationType==1">公共充电站</span>
                            <span v-else-if="msg.stationType==50">个人充电站</span>
                            <span v-else-if="msg.stationType==100">公交充电站</span>
                            <span v-else-if="msg.stationType==101">环卫充电站</span>
                            <span v-else-if="msg.stationType==102">物流充电站</span>
                            <span v-else-if="msg.stationType==103">出租车充电站</span>
                            <span v-else="msg.stationType==255">其他</span>
                        </span>
                        <span id="stationStatus" class="fontFamliy">
                            <!-- 0:未知； 1:建设中； 5:关闭下线； 6:维护中； 50:正常使用 -->
                            <span v-if="msg.stationStatus==50">
                                <ion-icon aria-hidden="true" :icon="checkmarkCircle"/>
                                <span class="stationStatusMsg">正常</span>
                            </span>
                            <span v-else="msg.stationStatus!=50">
                                <ion-icon aria-hidden="true" :icon="closeCircle"/>
                                <span class="stationStatusMsg">维护</span>
                            </span>
                        </span>
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <!-- msg.stationAddress.length>15 ? msg.stationAddress.slice(0,15)+"..." : msg.stationAddress -->
                    <span class="stationMsg fontFamliy">{{ msg.stationAddress }}</span>
                    <div id="distance">
                        <ion-icon aria-hidden="true" :icon="navigate" style="color: #fff;"/>
                        <span>{{ msg.distance }} m</span>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <div class="fontFamliy">
                            <span id="feeTitle">费用细明</span>
                            <span id="workingTime">营业时间：{{ msg.businessHours }}</span>
                        </div>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <!-- <span id="nowParkFee">{{ msg.parkFee.toFixed(4) }}</span> -->
                    <span id="nowParkFee" class="fontFamliy">{{ msg.parkFee }}</span>
                    <span id="pastParkFee" class="fontFamliy">
                        <!-- <span id="pastParkFeeNum">{{ (1.5).toFixed(4) }}</span> -->
                        元/度
                    </span>
                    <hr class="line">
                    <div class="fontFamliy">
                        <span id="feeForPark">停车收费</span>
                        <span id="freePark">2小时免费</span>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="basicInformation" class="fontFamliy">基本信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <span id="regionName" class="fontFamliy">
                        <span>所属园区:</span>
                        <span id="region">{{ msg.regionName }}</span>
                    </span>
                    <br>
                    <span id="serviceTel" class="fontFamliy">
                        <span>服务电话:</span>
                        <span id="tel">{{ msg.serviceTel }}</span>
                    </span>

                    <hr class="line">

                    <div id="DetailFoldBtn" class="fontFamliy" @click="changingDetailsFold()">
                        <ion-icon class="moreMsgIcon" :icon="caretDownOutline" v-if="detailsFold"></ion-icon>
                        <ion-icon class="moreMsgIcon" :icon="caretForwardOutline" v-else="detailsFold"></ion-icon>
                        <span id="DetailFoldBtnMsg">更多详情信息</span>
                    </div>
                    <div v-if="detailsFold" class="fontFamliy">
                        <span class="stationMsg">国家代码：{{ msg.countryCode }}</span>
                        <br>
                        <span class="stationMsg">省市辖区：{{ msg.areaCode }}</span>
                        <br>
                        <span class="stationMsg">站点类型：
                            <!-- 站点类型：1:公共； 50;个人； 100:公交（专用）; 101:环卫（专用） 102:物流（专用）; 103:出租车（专用）; 255:其他 -->
                            <span v-if="msg.stationType==1">公共</span>
                            <span v-else-if="msg.stationType==50">个人</span>
                            <span v-else-if="msg.stationType==100">公交（专用）</span>
                            <span v-else-if="msg.stationType==101">环卫（专用）</span>
                            <span v-else-if="msg.stationType==102">物流（专用）</span>
                            <span v-else-if="msg.stationType==103">出租车（专用）</span>
                            <span v-else="msg.stationType==255">其他</span>
                        </span>
                        <br>
                        <span class="stationMsg">建设场所： 
                            <!-- 1:居民区； 2:公共机构； 3:企事业单位； 4:写字楼； 5:工业园区； 6:交通枢纽； 7:大型文体设施； 8:城市绿地； 9:大型建筑配建停车场； 10:路边停车位； 11:城际高速服务区； 255:其他 -->
                            <span v-if="msg.stationConstruction==1">居民区</span>
                            <span v-else-if="msg.stationConstruction==2">公共机构</span>
                            <span v-else-if="msg.stationConstruction==3">企事业单位</span>
                            <span v-else-if="msg.stationConstruction==4">写字楼</span>
                            <span v-else-if="msg.stationConstruction==5">工业园区</span>
                            <span v-else-if="msg.stationConstruction==6">交通枢纽</span>
                            <span v-else-if="msg.stationConstruction==7">大型文体设施</span>
                            <span v-else-if="msg.stationConstruction==8">城市绿地</span>
                            <span v-else-if="msg.stationConstruction==9">大型建筑配建停车场</span>
                            <span v-else-if="msg.stationConstruction==10">路边停车位</span>
                            <span v-else-if="msg.stationConstruction==11">城际高速服务区</span>
                            <span v-else="msg.stationConstruction==225">其他</span>
                        </span>
                    </div>

                </ion-card-content>
            </ion-card>

            <hr class="line">
            
            <equipment-card v-for="equipmentMsg in msg.hasEquipments" :msg="equipmentMsg"></equipment-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon} from '@ionic/vue';
import {
    arrowBackOutline,
    caretForwardOutline,
    caretDownOutline,
    navigate,
    checkmarkCircle,
    closeCircle,
} from 'ionicons/icons';
import equipmentCard from '@/components/equipmentCard.vue';
import request from '@/utils/require.ts';
</script>

<script>
export default {
    name: "StationPage",
    components: {
        equipmentCard,
    },
    data() {
        return{
            detailsFold: false,
            userMsg: {
                userLat: 30.5817,
                userLng: 103.98748,
            },
            msg: {
                stationName: String,
                regionName: String,
                stationStatus: Number,
                parkFee: Number,
                businessHours: String,
                stationAddress: String,
                serviceTel: String,
                countryCode: String,
                areaCode: String,
                stationType: Number,
                stationConstruction: Number,
                
                equipmentMsgs:[],
            },
        }
    },
    methods: {
        //打开/关闭更多信息按钮
        changingDetailsFold() {
            this.detailsFold = !this.detailsFold;
        },

        //返回上一页
        goBack: function(){
            history.go(-1);
        },

        //GET 获取充电站信息
        async getMsg() {
            const urlParams = new URLSearchParams(window.location.search);
            let id = urlParams.get('stationId') || '';
            let longitude = urlParams.get('longitude') || '';
            let latitude = urlParams.get('latitude') || '';
            const request = await this.getService(id, {longitude: longitude, latitude: latitude});
            console.log(request.data);
            this.msg = request.data.data;
        },
        getService:function(id, info) {
            return request({
                url: '/stations/detail/' + id,
                method: 'GET',
                params: info,
            })
        },
        
    },
    mounted: function() {
        this.getMsg();
    }
}
</script>

<style>
.fontFamliy{
    font-family: '华文楷体';
    font-weight: 500;
}

#chargingcar{
    position: relative;
    padding: 0.2rem;
    background-size: 40%, contain;
    background-repeat: no-repeat;
    background-position: bottom;
    background-color: #f6f8fc;
}

#chargingcar::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0%;
    width: 100%;
    height: 100%;
    transform: translateY(-50%);
    background: linear-gradient(to bottom right, transparent, #f6f8fc);
}

#stationName{
    font-size: 20px;
}

#stationStatus{
    color: #2dd55b;
    font-size: 14px;
    float: right;
}

.stationStatusMsg{
    position: relative;
    top: -2px;
}

.line{
    height: 1px;
    background-color: #444444;
}

.stationMsg{
    font-size: 14px;
    color: #5f5f5f;
    padding-left: 6px;
}

#distance{
    float: right;
    border: 2px solid #1E90FF;
    border-radius: 10px;
    width: max-content;
    height: 24px;
}

#distance ion-icon{
    font-size: 14px;
    width: 16px;
    height: 16px;
    padding: 2px;
    margin: 0;
    background-color: #1E90FF;
    position: relative;
    border-radius: 3px 0px 0px 3px;
}

#distance span {
    font-size: 14px;
    color: #1E90FF;
    padding: 2px 4px 2px 4px;
    margin: 0;
    position: relative;
    top: -5px;
}

#stationType {
    font-size: 14px;
    color: #1E90FF;
    background-color: #d3ecf0;
    padding: 2px 5px 2px 5px;
    border-radius: 3px;
}

#workingTime{
    font-size: 14px;
    color: #1E90FF;
    background-color: #d3ecf0;
    padding: 2px 5px 2px 5px;
    border-radius: 3px;
    position: relative;
    left: 5px;
}

#nowParkFee {
    font-size: 20px;
    color:#ffc409;
    padding-left: 10px;
}

#pastParkFee {
    font-size: 14px;
    color: #636363;
    padding-left: 5px;
}

#pastParkFeeNum {
    text-decoration: line-through;
}

#feeForPark{
    font-size: 14px;
    color: #fff;
    background-color: #9c9c9c;
    padding: 2px 5px 2px 5px;
    border-radius: 3px;
}

#freePark{
    float: right;
    font-size: 15px;
    color: #454545;
}

#basicInformation{
    font-size: 18px;
    color: #000;
}

#feeTitle{
    font-size: 18px;
    color: #000;
}

#regionName{
    font-size: 16px;
    color: #454545;
}

#serviceTel{
    font-size: 16px;
    color: #000;
}

#DetailFoldBtn{
    font-size: 16px;
    padding-right: 1rem;
}

.moreMsgIcon{
    color: #636363;
    font-size: 18px;
}

#DetailFoldBtnMsg{
    font-size: 16px;
    color: #6f6f6f;
    position: relative;
    top: -2px
}

#region{
    float: right;
}

#tel{
    float: right;
}

#backBtn{
    font-size: 25px;
    position: relative;
    top: 3px;
}
</style>