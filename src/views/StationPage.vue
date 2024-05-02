<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; margin-right: 12px;">
                    <span style="float: left;" @click="goBack()">
                        <ion-icon id="backBtn":icon="chevronBackOutline" slot="end"></ion-icon>
                    </span>
                    <span>详情信息</span>
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
                        <span id="stationName">{{ msg.stationName.length>15 ? msg.stationName.slice(0,15)+"..." : msg.stationName }}</span>
                    </ion-card-title>
                    <ion-card-subtitle>
                        <span id="stationType">
                            <!-- 站点类型：1:公共； 50;个人； 100:公交（专用）; 101:环卫（专用） 102:物流（专用）; 103:出租车（专用）; 255:其他 -->
                            <span v-if="msg.stationType==1">公共充电站</span>
                            <span v-else-if="msg.stationType==50">个人充电站</span>
                            <span v-else-if="msg.stationType==100">公交充电站</span>
                            <span v-else-if="msg.stationType==101">环卫充电站</span>
                            <span v-else-if="msg.stationType==102">物流充电站</span>
                            <span v-else-if="msg.stationType==103">出租车充电站</span>
                            <span v-else="msg.stationType==255">其他</span>
                        </span>
                        <span id="stationStatus">
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
                    <span class="stationMsg">{{ msg.stationAddress.length>15 ? msg.stationAddress.slice(0,15)+"..." : msg.stationAddress }}</span>
                    <div id="distance">
                        <ion-icon aria-hidden="true" :icon="navigate" style="color: #fff;"/>
                        <span>{{ (getDistance(msg.stationLat, msg.stationLng, userMsg.userLat, userMsg.userLng)/1000).toFixed(2) }} km</span>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="feeTitle">费用细明</span>
                        <span id="workingTime">营业时间：{{ msg.businessHours }}</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <span id="nowParkFee">{{ msg.parkFee.toFixed(4) }}</span>
                    <span id="pastParkFee">
                        <span id="pastParkFeeNum">{{ (1.5).toFixed(4) }}</span>元/度
                    </span>
                    <hr class="line">
                    <div>
                        <span id="feeForPark">停车收费</span>
                        <span id="freePark">2小时免费</span>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <span id="basicInformation">基本信息</span>
                    </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <span id="regionName">
                        <span>所属园区:</span>
                        <span id="region">{{ msg.regionName }}</span>
                    </span>
                    <br>
                    <span id="serviceTel">
                        <span>服务电话:</span>
                        <span id="tel">{{ msg.serviceTel }}</span>
                    </span>

                    <hr class="line">

                    <div id="DetailFoldBtn" @click="changingDetailsFold()">
                        <ion-icon class="moreMsgIcon" :icon="caretDownOutline" v-if="detailsFold"></ion-icon>
                        <ion-icon class="moreMsgIcon" :icon="caretForwardOutline" v-else="detailsFold"></ion-icon>
                        <span id="DetailFoldBtnMsg">更多详情信息</span>
                    </div>
                    <div v-if="detailsFold">
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
            
            <equipment-card v-for="equipmentMsg in equipmentMsgs" :msg="equipmentMsg"></equipment-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon} from '@ionic/vue';
import {
    chevronBackOutline,
    caretForwardOutline,
    caretDownOutline,
    navigate,
    checkmarkCircle,
    closeCircle,
} from 'ionicons/icons';
import equipmentCard from '@/components/equipmentCard.vue';
</script>

<script>
export default {
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
                stationName: "成都信息工程大学（航空港）南门充电站",
                regionName: "成都信息工程大学（航空港）",
                stationStatus: 50,
                parkFee: 1.2350,
                businessHours: "5:00~23:00",
                stationAddress: "双流区学府路一段24号成都信息工程大学航空港校区",
                serviceTel: "18x-xxxx-xxxx",
                countryCode: "CD45476457",
                areaCode: "SL03424563",
                stationType: 1,
                stationConstruction: 3,

                stationLat: 30.5837,
                stationLng: 103.98848,
                
            },
            equipmentMsgs: [
                {
                    equipmentName: "公牛智慧充电桩",
                    manufacturerName: "公牛",
                    equipmentModel: "A074",
                    equipmentType: 1,
                    power: 380,
                    connects: [
                        {
                            connectorName: "1号接口",
                            connectorType: "直流接口枪头",
                            power: 300,
                            matchCars: 1,
                            state: 1,
                            lockStatus: 10,
                        },
                        {
                            connectorName: "2号接口",
                            connectorType: "交流接口插头",
                            power: 80,
                            matchCars: 2,
                            state: 2,
                            lockStatus: 0,
                        }
                    ]
                },
                {
                    equipmentName: "星星充电充电桩",
                    manufacturerName: "星星",
                    equipmentModel: "C038",
                    equipmentType: 2,
                    power: 380,
                    connects: [
                        {
                            connectorName: "1号接口",
                            connectorType: "直流接口枪头",
                            power: 300,
                            matchCars: "家用轿车",
                            state: 1,
                            lockStatus: 10,
                        },
                        {
                            connectorName: "2号接口",
                            connectorType: "交流接口插头",
                            power: 80,
                            matchCars: "小型客车",
                            state: 2,
                            lockStatus: 0,
                        }
                    ]
                },
                {
                    equipmentName: "公牛智慧充电桩",
                    manufacturerName: "公牛",
                    equipmentModel: "A074",
                    equipmentType: 1,
                    power: 380,
                    connects: [
                        {
                            connectorName: "1号接口",
                            connectorType: "直流接口枪头",
                            power: 300,
                            matchCars: 1,
                            state: 1,
                            lockStatus: 10,
                        },
                        {
                            connectorName: "2号接口",
                            connectorType: "交流接口插头",
                            power: 80,
                            matchCars: 2,
                            state: 2,
                            lockStatus: 0,
                        }
                    ]
                },
                {
                    equipmentName: "星星充电充电桩",
                    manufacturerName: "星星",
                    equipmentModel: "C038",
                    equipmentType: 2,
                    power: 380,
                    connects: [
                        {
                            connectorName: "1号接口",
                            connectorType: "直流接口枪头",
                            power: 300,
                            matchCars: "家用轿车",
                            state: 1,
                            lockStatus: 10,
                        },
                        {
                            connectorName: "2号接口",
                            connectorType: "交流接口插头",
                            power: 80,
                            matchCars: "小型客车",
                            state: 2,
                            lockStatus: 0,
                        }
                    ]
                },
            ]
        }
    },
    methods: {
        changingDetailsFold() {
            this.detailsFold = !this.detailsFold;
        },
        //通过经纬度求两地间的距离
        getDistance(lat1, lng1, lat2, lng2) {
            lat1 = lat1 || 0;
            lng1 = lng1 || 0;
            lat2 = lat2 || 0;
            lng2 = lng2 || 0;

            var rad1 = lat1 * Math.PI / 180.0;
            var rad2 = lat2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
            var r = 6378137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

            return Math.ceil(distance);
        },
        goBack: function(){
            history.go(-1);
        }
    }
}
</script>

<style>
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