<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/ChargingPage">
          <ion-icon aria-hidden="true" :icon="batteryChargingOutline" />
          <ion-label>充电</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/ScanPage">
        <!-- <ion-tab-button tab="tab2" href=""> -->
          <ion-icon aria-hidden="true" :icon="scanOutline" />
          <ion-label>扫描</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/PersonPage">
          <ion-icon aria-hidden="true" :icon="accessibilityOutline" />
          <ion-label>我的</ion-label>
        </ion-tab-button>
<!-- 
        <ion-tab-button tab="tab4" href="/tabs/DrawGunPage">
          <ion-icon aria-hidden="true" :icon="accessibilityOutline" />
          <ion-label>测试</ion-label>
        </ion-tab-button>
         -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {
  batteryChargingOutline,
  accessibilityOutline,
  scanOutline,
} from 'ionicons/icons';
</script>
