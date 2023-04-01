const Mock = require('mockjs')
let data = Mock.mock({
  "data|34": [ // 生成一个数组
    {
      "id|+1": 1,
      "currentConfirm": "@integer(0,10000)",
      "countConfirm": "@integer(100,199999)",
      "midAreas": "@integer(0,50)",
      "highAreas": "@integer(0,30)",
    }
  ],
  "regionalRisk|34": [{
    "areaId|+1": 1,
    "area": "@province()",
    "localAdd": "@integer(0,100)",
    "localSilent": "@integer(0,200)",
    "currentConfirm": "@integer(0,1000)",
    "riskarea": "@integer(0,50)",
    "children": [{
      "ch_areaId|+1": 101,
      "ch_area": "@city()",
      "ch_localAdd": "@integer(0,100)",
      "ch_localSilent": "@integer(0,100)",
      "ch_currentConfirm": "@integer(0,1000)",
      "ch_riskarea": "@integer(0,50)"
    }]
  }],
  "covCaseInfo|34": [{
    "caseId|+1": 1,
    "area": "@province()",
    "currentConfirm": "@integer(0,10000)",
    "countConfirm": "@integer(100,199999)",
    "countDead": "@integer(100,1100)",
    "countCure": "@integer(100,1100)",
    "children": [{
      "ch_caseId|+1": 101,
      "ch_city": "@city()",
      "ch_currentConfirm": "@integer(0,1000)",
      "ch_countConfirm": "@integer(0,10000)",
      "ch_countDead": "@integer(0,5000)",
      "ch_countCure": "@integer(0,9000)"
    }]
  }],
  // "foreignCov|10": [{
  //   "countryId|+1": 1,
  //   "confirmSortId+1": 1,
  //   "countDeadSortId+1": 1,
  //   "deadSortId+1": 1,
  //   "countConfirm": "@integer(10000000,98888888)",
  //   "countDead": "@integer(10000,1888888)",
  //   "deadRate": "@float(0,2,1,2)%",
  // }],
  "stateArr|7": [{
    "currentConfirm": "@integer(0,10000)",
    "countConfirm": "@integer(100,199999)",
    "dead": "@integer(100,1100)",
    "cure": "@integer(100,1100)",
    "children|10": [{
      "ch_currentConfirm": "@integer(0,10000)",
      "ch_countConfirm": "@integer(100,199999)",
      "ch_dead": "@integer(100,1100)",
      "ch_cure": "@integer(100,1100)",
    }],
  }]
})
// 输出结果
Mock.mock(/citys/, 'get', () => {
  return data
})