import echarts from 'echarts';


const instance = function (Vue) {
  // Object对象方法，ES5提供的defineProperties
  // Vue.prototype：挂载到vue实例身上，就可以使用this了
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          publicFun(container, options) {
            let dom = document.getElementById(container);
            const myChart = echarts.init(dom);
            myChart.setOption(options)
          },
          linePublic(container, tit, Xdata, legendData, seriesData) {
            let dom = document.getElementById(container);
            const myChart = echarts.init(dom);
            const options = {
              title: {
                text: tit,
                x: '2%',
                y: '8%',
                textStyle: {
                  fontSize: 14
                }
              },
              xAxis: {
                type: 'category',
                data: Xdata,
                axisLabel: {
                  textStyle: {
                    fontSize: 10
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  textStyle: {
                    fontSize: 12
                  },
                }
              },
              legend: {
                data: legendData,
                left: '50%',
                top: '16%',
                itemWidth: 20,
              },
              grid: {
                left: '20%',
                top: '30%',
                bottom: '15%',
              },
              series: seriesData
            }
            myChart.setOption(options)
          },
          chinaMap(id, data) {
            const handleData = JSON.parse(JSON.stringify(data))
            const map_Option = {
              // 提示信息：鼠标划过或者点击时有提示信息
              tooltip: {
                trigger: "item", // 点击时提示
                // 自定义提示框和内容
                formatter(handleData) {
                  return "<div><p>省份：" + handleData.name + "</p><p>现存确诊：" + handleData.value + "</p></div>"
                }
              },
              // 设置映射颜色
              visualMap: [{
                orient: "horizontal", // 分段方向：vertical垂直,horizontal水平 
                type: 'piecewise', // 分段
                itemWidth: 12,
                textGap: 0, // 图例间距
                itemGap: 5,
                // itemWidth: 20, //图例宽度
                // itemHeight: 15, //图例高度
                bottom:10, // 图例距离底部
                pieces: [ // 分段的颜色和区间
                  {
                    gte: 0,
                    lte: 0,
                    label: "0",
                    color: '#fff'
                  },
                  {
                    gte: 1,
                    lte: 9,
                    label: "1-9",
                    color: '#faebd2'
                  },
                  {
                    gte: 10,
                    lte: 99,
                    label: "10-99",
                    color: '#e9a188'
                  },
                  {
                    gte: 100,
                    lte: 499,
                    label: "100-499",
                    color: '#d56355'
                  },
                  {
                    gte: 500,
                    lte: 999,
                    label: "500-999",
                    color: '#bb3937'
                  },
                  {
                    gte: 1000,
                    lte: 10000,
                    label: "1000-10000",
                    color: '#772526'
                  },
                  {
                    gt: 10000,
                    label: ">100000",
                    color: '#480f10'
                  },
                ],

              }],
              // 配置信息
              series: [{
                name: "省",
                type: "map", // 图标类型
                map: "china", // 是什么地图
                roam: false, // 是否允许缩放和拖拽
                zoom: 1, // 地图的缩放比例：标准比例是1.2
                label: { // 配置字体
                  // 必须要的字段
                  normal: {
                    show: true, // 地图上文字显示
                    textStyle: {
                      fontSize: 8
                    }
                  }
                },
                // 配置地图样式
                itemStyle: {
                  normal: {
                    areaColor: 'rgba(0,255,236,0)', // 地区颜色
                    borderColor: 'rgba(0,0,0,0.2)', // 边框的颜色
                  },
                  // 突出重点的配置
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 模糊程度
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                  },
                },
                data: handleData
              }]

            }
            this.publicFun(id, map_Option)
          },

          // xx(method){
          // 调用 method
          // }
          riskAreasMap(id, data) {
            // const handleData = JSON.parse(JSON.stringify(data))
            const handleData = JSON.parse(JSON.stringify(data))
            const map2_Option = {
              // 提示信息：鼠标划过或者点击时有提示信息
              tooltip: {
                trigger: "item", // 点击时提示
                // 自定义提示框和内容
                formatter(handleData) {
                  return "<div><p>省份：" + handleData.name + "</p><p>高风险地区：" + handleData.value + "</p><p>中风险地区：" + handleData.value2 + "</p></div>"
                }
              },
              // 设置映射颜色
              visualMap: [{
                orient: "horizontal", // 分段方向：vertical垂直,horizontal水平 
                type: 'piecewise', // 分段
                bottom: 10, // 图例距离底部
                left: 50,
                textGap: 0, // 图例间距
                pieces: [ // 分段的颜色和区间
                  {
                    gte: 0,
                    lte: 0,
                    label: "0",
                    color: '#fff'
                  },
                  {
                    gte: 1,
                    lte: 9,
                    label: "中风险地区数1-9",
                    color: '#f69d83'
                  },
                  {
                    gte: 10,
                    label: "中风险地区数≥10",
                    color: '#e55a4e'
                  },

                ],
              }],
              series: [{
                name: '',
                type: "map", // 图标类型
                map: "china", // 是什么地图
                roam: false, // 是否允许缩放和拖拽
                zoom: 1, // 地图的缩放比例：标准比例是1.2
                label: { // 配置字体
                  // 必须要的字段
                  normal: {
                    show: true, // 地图上文字显示
                    textStyle: {
                      fontSize: 8
                    }
                  }
                },
                // 配置地图样式
                itemStyle: {
                  normal: {
                    areaColor: 'rgba(0,255,236,0)', // 地区颜色
                    borderColor: 'rgba(0,0,0,0.2)', // 边框的颜色
                  },
                  // 突出重点的配置
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 模糊程度
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                  },
                },
                data: handleData,
              }]
            }
            this.publicFun(id, map2_Option)
          },
          countConfirmMap(id, data) {
            // const handleData = JSON.parse(JSON.stringify(data))
            const handleData = JSON.parse(JSON.stringify(data))

            const map3_Option = {
              // 提示信息：鼠标划过或者点击时有提示信息
              tooltip: {
                trigger: "item", // 点击时提示
                // 自定义提示框和内容
                formatter(handleData) {
                  return "<div><p>省份：" + handleData.name + "</p><p>累计确诊：" + handleData.value + "</p></div>"
                }
              },
              // 设置映射颜色
              visualMap: [{
                orient: "horizontal", // 分段方向：vertical垂直,horizontal水平 
                type: 'piecewise', // 分段
                itemWidth: 15,
                textGap: 0, // 图例间距
                itemGap:2,
                // itemWidth: 20, //图例宽度
                // itemHeight: 15, //图例高度
                bottom:10, // 图例距离底部
                pieces: [ // 分段的颜色和区间
                  {
                    gte: 0,
                    lte: 0,
                    label: "0",
                    color: '#fff'
                  },
                  {
                    gte: 1,
                    lte: 9,
                    label: "1-9",
                    color: '#faebd2'
                  },
                  {
                    gte: 10,
                    lte: 99,
                    label: "10-99",
                    color: '#e9a188'
                  },
                  {
                    gte: 100,
                    lte: 499,
                    label: "100-499",
                    color: '#d56355'
                  },
                  {
                    gte: 500,
                    lte: 999,
                    label: "500-999",
                    color: '#bb3937'
                  },
                  {
                    gte: 1000,
                    lte: 10000,
                    label: "1000-10000",
                    color: '#772526'
                  },
                  {
                    gt: 10000,
                    label: ">100000",
                    color: '#480f10'
                  },
                ],

              }],
              series: [{
                name: '省',
                type: "map", // 图标类型
                map: "china", // 是什么地图
                roam: false, // 是否允许缩放和拖拽
                zoom: 1, // 地图的缩放比例：标准比例是1.2
                label: { // 配置字体
                  // 必须要的字段
                  normal: {
                    show: true, // 地图上文字显示
                    textStyle: {
                      fontSize: 8
                    }
                  }
                },
                // 配置地图样式
                itemStyle: {
                  normal: {
                    areaColor: 'rgba(0,255,236,0)', // 地区颜色
                    borderColor: 'rgba(0,0,0,0.2)', // 边框的颜色
                  },
                  // 突出重点的配置
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 模糊程度
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                  },
                },
                data: handleData,
              }]
            }
            this.publicFun(id, map3_Option)
          },

          // ---------------------------------------------------------------------
          // ---------------------------------------------------------------------

          // 国内数据的折线图
          newConfirm(id) {
            this.linePublic(id,
              '全国新增确诊',
              ['10-16', '10-19', '10-22', '10-25', '10-28'],
              ['新增确诊'],
              [{
                name: '新增确诊',
                data: [25455, 42321, 23345, 35455, 46321],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 境外输入的折线图
          importedCase(id) {
            this.linePublic(id,
              '全国新增境外输入',
              ['10-16', '10-19', '10-22', '10-25', '10-28'],
              ['新增境外输入'],
              [{
                name: '新增境外输入',
                data: [60, 40, 65, 51, 70],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 累计境外输入的折线图
          countImportedCase(id) {
            this.linePublic(id,
              '全国累计境外输入',
              ['10-08', '10-13', '10-18', '10-23', '10-28'],

              ['累计境外输入'],
              [{
                name: '累计境外输入',
                data: [2490, 2500, 2501, 2499, 2550],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 现存确诊的折线图
          currentConfirm(id) {
            this.linePublic(id,
              '全国现存确诊',
              ['01-09', '09-27', '06-09', '02-17', '10-28'],

              ['现存确诊'],
              [{
                name: '现存确诊',
                data: [10, 0, 0, 2100000, 8000000],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 全国累计确诊的折线图
          countConfirm(id) {
            this.linePublic(id,
              '全国累计确诊',
              ['01-09', '09-27', '06-09', '02-17', '10-28'],

              ['累计确诊'],
              [{
                name: '累计确诊',
                data: [1000, 1000, 1000, 2100000, 8500000],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 全国累计治愈的折线图
          countCure(id) {
            this.linePublic(id,
              '全国累计治愈',
              ['01-09', '09-27', '06-09', '02-17', '10-28'],

              ['累计治愈'],
              [{
                name: '累计治愈',
                data: [99890, 99990, 150050, 300010, 380010],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 全国累计死亡的折线图
          countDead(id) {
            this.linePublic(id,
              '全国累计死亡',
              ['01-09', '09-27', '06-09', '02-17', '10-28'],
              ['累计死亡'],
              [{
                name: '累计死亡',
                data: [5000, 4990, 5000, 5100, 28000],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },

          // ---------------------------------------------------------------------
          // ---------------------------------------------------------------------

          // 全球疫情新增确诊趋势图
          globalNewCov(id) {
            this.linePublic(id,
              '全球疫情新增确诊趋势图',
              ['01-09', '09-27', '06-09', '02-17', '10-28'],
              ['中国', '其他国家'],
              [{
                  name: '中国',
                  data: [115000, 143499, 165500, 2235100, 1428000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '其他国家',
                  data: [3481500, 4534099, 1655500, 2234100, 14538000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 全球疫情累计确诊趋势图
          globalCountConfirm(id) {
            this.linePublic(id,
              '全球疫情累计确诊趋势图',
              ['01-19', '10-01', '06-17', '03-01', '11-11'],
              ['中国', '其他国家'],
              [{
                  name: '中国',
                  data: [11500, 14349, 16500, 22310, 14000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '其他国家',
                  data: [3481000, 4240099, 4605550, 5204000, 7450800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 全球疫情累计死亡趋势图
          globalCountDead(id) {
            this.linePublic(id,
              '全球疫情累计死亡趋势图',
              ['01-19', '10-01', '06-17', '03-01', '11-11'],
              ['中国', '其他国家'],
              [{
                  name: '中国',
                  data: [11500, 14349, 16500, 22310, 14000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '其他国家',
                  data: [1048100, 10424099, 20465550, 40523400, 70745800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },

          // ---------------------------------------------------------------------
          // ---------------------------------------------------------------------

          // 重点国家新增确诊趋势图
          importNewCov(id) {
            let dom = document.getElementById(id);
            const myChart = echarts.init(dom);
            const options = {
              title: {
                text: '重点国家新增确诊趋势图',
                x: '2%',
                y: '8%',
                textStyle: {
                  fontSize: 14
                }
              },
              xAxis: {
                type: 'category',
                data: ['10-15', '10-22', '10-29', '11-05', '11-12'],
                axisLabel: {
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  textStyle: {
                    fontSize: 12
                  },
                }
              },
              legend: {
                data: ['美国', '意大利', '法国', '德国', '巴西', '英国', '俄罗斯', '西班牙'],
                left: 'center',
                top: '18%',
                itemWidth: 17,
                itemGap: 0,
                textStyle: {
                  fontSize: 9
                },

              },
              grid: {
                left: '20%',
                top: '35%',
                bottom: '15%',
              },
              series: [{
                  name: '美国',
                  data: [11500, 14349, 16500, 22310, 14000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '意大利',
                  data: [10400, 42499, 20550, 43400, 70800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '法国',
                  data: [11500, 14349, 16500, 22310, 14000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '德国',
                  data: [1040, 4099, 65550, 4340, 5800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '巴西',
                  data: [1150, 14349, 16500, 2210, 140000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '英国',
                  data: [108100, 10209, 20460, 15230, 14500],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '俄罗斯',
                  data: [1100, 149, 100, 2230, 1400],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
                {
                  name: '西班牙',
                  data: [8100, 899, 550, 400, 75800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            }
            myChart.setOption(options)

          },
          // 美国疫情新增确诊趋势图
          meiCovChart(id) {
            this.linePublic(id,
              '美国疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [{
                name: '新增确诊',
                data: [11500, 14349, 16500, 22310, 14000],
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                  textStyle: {
                    fontSize: 1
                  }
                }
              }, ]
            )
          },
          // 意大利疫情新增确诊趋势图
          yiCovChart(id) {
            this.linePublic(id,
              '意大利疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [10400, 42499, 20550, 43400, 70800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 法国疫情新增确诊趋势图
          faCovChart(id) {
            this.linePublic(id,
              '法国疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [11500, 14349, 16500, 22310, 14000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 德国疫情新增确诊趋势图
          deCovChart(id) {
            this.linePublic(id,
              '德国疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [1040, 4099, 65550, 4340, 5800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 巴西疫情新增确诊趋势图
          baCovChart(id) {
            this.linePublic(id,
              '巴西疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [1150, 14349, 16500, 2210, 140000],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 英国疫情新增确诊趋势图
          yingCovChart(id) {
            this.linePublic(id,
              '英国疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [108100, 10209, 20460, 15230, 14500],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 俄罗斯疫情新增确诊趋势图
          eCovChart(id) {
            this.linePublic(id,
              '俄罗斯疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [1100, 149, 100, 2230, 1400],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
          // 西班牙疫情新增确诊趋势图
          xiCovChart(id) {
            this.linePublic(id,
              '西班牙疫情新增确诊趋势图',
              ['10-15', '10-22', '10-29', '11-05', '11-12'],
              ['新增确诊'],
              [
                {
                  name: '新增确诊',
                  data: [8100, 899, 550, 400, 75800],
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  label: {
                    textStyle: {
                      fontSize: 1
                    }
                  }
                },
              ]
            )
          },
        }
      }
    },
  })
}

export default instance