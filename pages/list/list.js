// pages/list/list.js
Page({

  data: {
    id: "",
    title: "",
    source: "",
    date: "",
    readCount: "",
    content: []
  },
  onLoad(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: "#ffffff",
    })
    this.setData({ id: e.id });
    this.getDetail();
  },
  //获取新闻内容
  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id,
      },
      success: res => {
        let data = res.data.result;
        this.setData({
          title: data.title,
          source: data.source ? data.source : "未知来源",
          date: data.date.slice(-13, -8),
          readCount: data.readCount,
          content: data.content
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})