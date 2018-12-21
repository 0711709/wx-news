//index.js
//获取应用实例
const app = getApp();

const type = {
  "国内": "gn",
  "国际": "gj",
  "财经": "cj",
  "娱乐": "yl",
  "军事": "js",
  "体育": "ty",
  "其他": "other",
}

Page({
  data: {
    nav: [{ type: "国内", desc: "gn" },
    { type: "国际", desc: "gj" },
    { type: "财经", desc: "cj" },
    { type: "娱乐", desc: "yl" },
    { type: "军事", desc: "js" },
    { type: "体育", desc: "ty" },
    { type: "其他", desc: "other" }],
    onTap: "gn",
    list: [],
    headImage: "",
    headTitle: "",
    headDate: "",
    headSource: "",
    headId:""
  },
  onLoad: function () {
    this.getNew();
  },
  //获取数据成功后停止刷新
  onPullDownRefresh() {
    this.getNew(() => {
      wx.stopPullDownRefresh()
    })
  },
  //获取新闻列表
  getNew(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.onTap
      },
      success: res => {
        let result = res.data.result;
        let head = result.shift();
        result.forEach(it => {
          it.source = it.source ? it.source : "未知来源",
            it.date = it.date.slice(-13, -8)
        });
        console.log(result);
        this.setData({
          headTitle: head.title,
          headDate: head.date.slice(-13, -8),
          headSource: head.source ? head.source : "未知来源",
          headImage: head.firstImage,
          headId: head.id,
          list: result,
        });
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  //点击切换新闻类别
  onTapType(e) {
    let onTapType = e._relatedInfo.anchorTargetText;
    this.setData({ onTap: type[onTapType]})
    console.log(this.data.onTap);
    this.getNew();
  },
  //点击阅读新闻内容
  onTapList(e) {
    console.log(e);
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  }
})
