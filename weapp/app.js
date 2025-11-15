// app.js
App({
  onLaunch() {
    // 应用启动时执行
    console.log('应用启动');
    
    // 检查更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本下载失败，请稍后重试',
            showCancel: false
          });
        });
      }
    });
  },
  
  onShow() {
    // 应用前台显示时执行
    console.log('应用前台显示');
  },
  
  onHide() {
    // 应用后台隐藏时执行
    console.log('应用后台隐藏');
  },
  
  // 全局数据
  globalData: {
    userInfo: null,
    version: '1.0.0'
  }
});