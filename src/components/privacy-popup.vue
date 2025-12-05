<template>
  <wd-popup
    v-model="showPrivacy" :close-on-click-modal="false" custom-class="
      box-border w-75 overflow-hidden
    " custom-style="border-radius:32rpx;padding:32rpx;"
  >
    <view
      class="
        text-center text-lg font-bold text-black
        dark:text-white
      "
    >
      {{ title }}
    </view>
    <view class="my-4 w-full text-sm text-text">
      {{ preDesc }}<text class="text-primary" @click.stop="handleOpenPrivacyContract">
        {{ privacyContractNameCustom || privacyContractName }}
      </text>{{ subDesc }}
    </view>
    <view class="flex justify-between">
      <wd-button button-id="disagree-btn" type="info" @click="handleRefuse">
        {{ disagreeBtnText }}
      </wd-button>
      <wd-button button-id="agree-btn" type="primary" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgree">
        {{ agreeBtnText }}
      </wd-button>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

interface Props {
  /**
   * 弹窗位置
   * @default 'center'
   */
  position?: 'center' | 'bottom';
  /**
   * 是否需要用户同意隐私授权
   * @default true
   */
  onNeed?: boolean;
  /**
   * 是否隐藏TabBar
   * @default false
   */
  hideTabBar?: boolean;
  /**
   * 标题
   * @default '用户隐私保护提示'
   */
  title?: string;
  /**
   * 前描述
   * @default '使用前请仔细阅读'
   */
  preDesc?: string;
  /**
   * 后描述
   * @default '当您点击同意后，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用该服务。'
   */
  subDesc?: string;
  /**
   * 隐私协议名称
   * @default ''
   */
  privacyContractNameCustom?: string;
  /**
   * 同意按钮文本
   * @default '同意'
   */
  agreeBtnText?: string;
  /**
   * 拒绝按钮文本
   * @default '拒绝'
   */
  disagreeBtnText?: string;
  /**
   * 提示文本
   * @default '拒绝将无法使用该功能'
   */
  tips?: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  onNeed: true,
  hideTabBar: false,
  title: '用户隐私保护提示',
  preDesc: '使用前请仔细阅读',
  subDesc: '当您点击同意后,即表示您已理解并同意该条款内容,该条款将对您产生法律约束力。如您拒绝,将无法使用该服务。',
  privacyContractNameCustom: '',
  agreeBtnText: '同意',
  disagreeBtnText: '拒绝',
  tips: '拒绝将无法使用该功能',
});

const emit = defineEmits<{
  agree: [];
  disagree: [];
  needAuthorization: [value: boolean];
}>();

const showPrivacy = ref(false);
const privacyContractName = ref('');
const resolvePrivacyAuthorization = ref(new Set()); // onNeedPrivacyAuthorization的resolve

/**
 * 打开隐私弹窗
 * @param text 小程序协议名称
 */
function open(text: string) {
  if (props.hideTabBar) {
    uni.hideTabBar();
  }
  privacyContractName.value = text;
  showPrivacy.value = true;
}

/**
 * 关闭隐私弹窗
 */
function close() {
  showPrivacy.value = false;
  resolvePrivacyAuthorization.value.clear();
  if (props.hideTabBar) {
    uni.showTabBar();
  }
}

/**
 * 用户同意隐私授权
 */
function handleAgree() {
  // 需要用户同意隐私授权时
  if (props.onNeed) {
    resolvePrivacyAuthorization.value.forEach((resolve: any) => {
      resolve({
        event: 'agree',
        buttonId: 'agree-btn',
      });
    });
  }
  close();
  emit('agree');
}

/**
 * 用户拒绝隐私授权
 */
function handleRefuse() {
  if (props.onNeed) {
    resolvePrivacyAuthorization.value.forEach((resolve: any) => {
      resolve({
        event: 'disagree',
      });
    });
  }
  close();
  emit('disagree');
}

/**
 * 查看隐私协议内容
 */
function handleOpenPrivacyContract() {
  uni.openPrivacyContract({
    success: () => {
      // console.log("openPrivacyContract success");
    },
    fail: () => {
      // console.error("openPrivacyContract fail");
    },
  });
}

/**
 * 进入应用时获取隐私是否需要弹出隐私协议
 */
function checkPrivacySetting() {
  uni.getPrivacySetting({
    success: (res) => {
      // 如果是needAuthorization为false,无需弹出隐私协议
      if (res.needAuthorization) {
        emit('needAuthorization', false);
        return;
      }

      emit('needAuthorization', true);

      if (props.onNeed) {
        uni.onNeedPrivacyAuthorization((resolve) => {
          open(res.privacyContractName);
          resolvePrivacyAuthorization.value.add(resolve);
        });
      } else {
        open(res.privacyContractName);
      }
    },
  });
}

// 暴露方法给父组件
defineExpose({
  open,
  close,
});

onBeforeMount(() => {
  checkPrivacySetting();
});
</script>
