<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center;">您附近的充电站</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <station-card class="stationCard" v-for="stationMsg in stationMsgs" :msg="stationMsg" :user-msg="userMsg"></station-card>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import stationCard from '@/components/stationCard.vue';
import request from '@/utils/require.ts';
</script>

<script>

export default {
    name: "ChargingPage",
    components: {
        stationCard,
    },
    data() {
        return {
            userMsg: {
                userLat: 30.5817,
                userLng: 103.98748,
            },
            stationMsgs: [
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "成都信息工程大学（航空港）南门充电站",
            //     regionName: "成都信息工程大学（航空港）",
            //     parkFee: 1.2,
            //     stationLat: 30.5837,
            //     stationLng: 103.98848,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            // {
            //     stationName: "天府广场西北充电站",
            //     regionName: "天府广场",
            //     parkFee: 1.4,
            //     stationLat: 30.657453,
            //     stationLng: 104.065751,
            //     serviceTel: "18x-xxxx-xxxx",
            //     fastSum: 10,
            //     fastFree: 5,
            // },
            
        ],
        }
    },
    methods: {
        // //GET 获取充电站信息
        // async getStationMsgs()  {
        //     const request = await this.getService({pageNum:1,pageSize:10,stationType:1});
        //     console.log(request.data.data.records);
        //     this.stationMsgs = request.data.data.records;
        // },
        // getService:function(pageData) {
        //     return request({
        //         url: '/tabs/ChargingPage',
        //         params: pageData
        //     })
        // },

        
        // getLongitudeLatitude() {
        //     //如果该对象存在，那么地理位置服务可用。
        //     if ('geolocation' in navigator) {
        //         console.log(1);
        //         /* 地理位置服务可用 */
        //         var options = {
        //         enableHighAccuracy: true, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
        //         timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
        //         maximumAge: 0 //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
        //         }
        //         function success(position) {
        //         //position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
        //         //position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
        //         var lat = position.coords.latitude //当前位置的纬度
        //         var lng = position.coords.longitude //当前位置精度
        //         // console.log(position.corrds);
        //         }
        //         function error(err) {
        //         var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
        //         console.log(errorType[err.code - 1])
        //         }
        //         console.log(2);
        //         navigator.geolocation.getCurrentPosition(success, error, options);
        //     } else {
        //         /* 地理位置服务不可用 */
        //         console.log('无法获取您的位置，请检查定位是否开启或刷新重试')
        //     }
        // }

        //GET 获取充电站信息
        async getStationMsgs()  {
            const request = await this.getService({maxDistance: 1000, longitude: 103.98748, latitude:30.5817, isNormal:true, isPublic:true, maxKW:1000, isHS: false});
            console.log(request.data);
            // this.stationMsgs = request.data.data.records;
        },
        getService:function(pageData) {
            return request({
                url: '/stations/near',
                params: pageData
            })
        }
    },
    mounted: function() {
        this.getStationMsgs();
        // this.getLongitudeLatitude();
    }
}
</script>

<style>
.stationCard{
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>