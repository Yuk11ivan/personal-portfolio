// index.js
Page({
  data: {
    gpa: 0,
    rank: 0,
    isLoaded: false
  },

  onLoad() {
    // 页面加载完成后执行
    this.setData({
      isLoaded: true
    });
    this.animateNumbers();
  },

  onShow() {
    // 页面显示时执行
    this.handleScrollAnimation();
  },

  // 数字动画效果
  animateNumbers() {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const gpa = 3.91 * progress;
      const rank = 2 * progress;

      this.setData({
        gpa: gpa.toFixed(2),
        rank: Math.round(rank)
      });

      if (progress < 1) {
        setTimeout(animate, 16);
      } else {
        this.setData({
          gpa: 3.91,
          rank: 2
        });
      }
    };

    animate();
  },

  // 平滑滚动
  scrollToSection(e) {
    const sectionId = e.currentTarget.dataset.section;
    wx.pageScrollTo({
      selector: `#${sectionId}`,
      duration: 600
    });
  },

  // 滚动动画处理
  handleScrollAnimation() {
    // 监听滚动事件
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 100
    }).observe('.info-card, .skill-category, .interest-item, .timeline-item', (res) => {
      if (res.intersectionRatio > 0) {
        // 元素进入视口，添加动画效果
        res.target.style.opacity = '1';
        res.target.style.transform = 'translateY(0)';
      }
    });
  },

  // 图片加载处理
  onImageLoad(e) {
    const image = e.currentTarget;
    // 图片加载成功后的处理
  },

  onImageError(e) {
    // 图片加载失败后的处理
    console.log('图片加载失败', e);
  },

  // 技能项点击事件
  onSkillTap(e) {
    const skillName = e.currentTarget.dataset.skill;
    console.log('点击了技能:', skillName);
  },

  // 兴趣项点击事件
  onInterestTap(e) {
    const interestName = e.currentTarget.dataset.interest;
    console.log('点击了兴趣:', interestName);
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '15805890722',
      success: () => {
        console.log('拨打电话成功');
      },
      fail: (err) => {
        console.log('拨打电话失败', err);
      }
    });
  },

  // 发送邮件
  sendEmail() {
    wx.setClipboardData({
      data: '320673961@qq.com',
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },

  // 访问抖音
  openDouyin() {
    wx.navigateToMiniProgram({
      appId: '', // 抖音小程序的AppID
      path: '',
      success: () => {
        console.log('打开抖音成功');
      },
      fail: (err) => {
        console.log('打开抖音失败', err);
      }
    });
  }
});