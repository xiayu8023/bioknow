export default {
  methods: {
    fakeInit (pulldown) {
      this.init().then(page => {
        this.pages = page.pages
        this.realInit(pulldown, page.records)
      })
    },
    realInit (pulldown, dbData) {
      if (pulldown) {
        wx.stopPullDownRefresh()
        this.pageData = dbData
      } else {
        dbData.forEach(d => {
          this.pageData.push(d)
        })
      }
    },
    resetInit (pulldown) {
      this.pageData = []
      this.pagination.current = 1
      this.fakeInit(pulldown)
    },
    reachBottom () {
      if (this.pagination.current < this.pages) {
        this.pagination.current++
        this.fakeInit(false)
      }
    }
  },
  data () {
    return {
      pagination: {
        current: 1,
        size: 10
      },
      pageData: [],
      pages: 1,
      urlParams: null
    }
  },
  onLoad (e) {
    if (e) {
      this.urlParams = e
    }
  },
  onShow () {
    this.resetInit(false)
  },
  onPullDownRefresh () {
    this.resetInit(true)
  },
  onReachBottom () {
    this.reachBottom()
  }
}
