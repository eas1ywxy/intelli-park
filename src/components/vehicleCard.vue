<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                <span id="vehicleBrand" class="fontFamliy">品牌：{{ msg.vehicleBrand }}</span>
                <div id="vehicleModel" class="fontFamliy">
                    <span v-if="msg.vehicleModel==1">直流快充</span>
                    <span v-if="msg.vehicleModel==2">交流漫充</span>
                    <span v-if="msg.vehicleModel==3">交直流混合充电</span>
                </div>
            </ion-card-title>
        </ion-card-header>

        <ion-card-content class="fontFamliy">
            <div id="licencePlatesBox" v-for="lp in msg.licencePlate">
                <span class="licencePlates">{{ lp }}</span>
            </div>
            <br>
            <span id="electricity">{{ msg.electricity }}W</span>
            <br>
            <ion-button class="fontFamliy" @click="deleteVehicleMsg">删除</ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, alertController} from '@ionic/vue';
import request from '@/utils/require.ts';

export default {
    name: "vehicleCard",
    props: {
        msg: Array,
    },
    data() {
        return{
            msg: this.msg,
        }
    },
    methods: {
        //DELETE 登记用户车辆
        async deleteVehicleMsg(){
            const request = await this.postVehicleInformation([this.msg.vehicleId]);
            console.log(request.data);
            if(request.data.code==200){
                this.changeSuccess();
            }else{
                this.changeFailure(request.data.message);
            }
        },
        postVehicleInformation: function(info) {
            return request({
                url: '/vehicle',
                method: 'DELETE',
                data: info,
            })
        },

         //删除失败
         changeFailure :async(message) => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '删除失败',
                message: message,
                buttons: ['确定'],
            });
            await alert.present();
        },
        //删除成功
        changeSuccess :async() => {
            const alert = await alertController.create({
                cssClass: 'fontFamliy alertOneButton',
                header: '删除成功',
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

#vehicleModel{
    float: right;
    font-size: 16px;
}

#vehicleBrand{
    font-size: 16px;
    position: relative;
    left: 10px;
}

#licencePlatesBox{
    margin-left: 20px;
}

.licencePlates{
    float: left;
    font-size: 20px;
    width: 24px;
    height: 24px;
    text-align: center;
    margin-left: 10px;
    background-color: #d8dade;
    border-radius: 3px;
    color: #2f2f2f;
    line-height: 24px;
}

#electricity{
    font-size: 16px;
    float: right;
    margin-top: 10px;
    position: relative;
    right: 15px;
    top: 20px;
}
</style>