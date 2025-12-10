import { i18n } from '@/locale';

/**
 * 检查小程序版本是否需要更新
 */
export function AppVersionNotification() {
  // 判断应用的 getUpdateManager 是否在当前版本可用
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate);
      if (res.hasUpdate) {
        // 小程序有新版本，静默下载新版本，新版本下载完成
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: i18n.global.t('settings.updateTitle'),
            content: i18n.global.t('settings.newVersionReady'),
            showCancel: false,
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            },
          });
        });
        // 当新版本下载失败
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          uni.showModal({
            title: i18n.global.t('settings.updateTitle'),
            content: i18n.global.t('settings.newVersionDownloadFailed'),
            showCancel: false,
          });
        });
      }
    });
  } else {
    // 提示用户在最新版本的客户端上体验
    uni.showModal({
      title: i18n.global.t('settings.tips'),
      content: i18n.global.t('settings.lowVersionWarning'),
    });
  }
}
