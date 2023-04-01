# 1. 头部

> 这里使用要使用css背景图的方式，因为上面要放字
>
> - **点击切换背景图为英文版就是点击切换时添加一个`active`类**
>
> - 给这个类添加样式覆盖原始的`background`
>
>     background:url('../assets/images/EnglishBgc.png') no-repeat;
>
>     padding-top:30.7%;
>
>     background-position: top;
>
>     background-size: cover;
>
> - 其他地方就是使用`v-if`

# 2. 疫情热点部分

> 标题部分没什么好说的，直接css硬刚

### 2.1 疫情最新消息列表

> - 这里的列表使用ul > li > a 
> - 然后使a标签下面三个元素弹性布局
> - 弹性布局中需要左边两个在一起，右边一个靠右的话就使它`margin-left:auto` 这样就会将左边空白的地方全占满

**注意：这里使用`async  await`据获接口数时是一个`{__Ob__}` 对象，表示已经被vue托管，所以普通方法操作不了它，需要做进一步处理**

有两种方法：

- 使用JSON深拷贝
  - **JSON.parse(JSON.stringify(res))**  将数据深拷贝
- 使用`Promise的.then.catch` 方法

​	# 不过这里我发现使用`.then.catch`方法后面还是要用`JSON.parse(JSON.stringify(res))`，所以直接使用`JSON.parse(JSON.stringify(res))`

```js
// 使用Promise的方法
    // getCovNewsData(){
    //   getFun('/ncov/index', {
    //     params: { key: '6967c8d881f3281f8659cf1dc22c984f' }
    //   }).then(res =>{
    //     this.covList = res.newslist[0]
    //     // console.log(this.covList)
    //   }).catch(err => err)
    // }
```

> 拿到数据后将新闻列表数据和较昨日比较的数据分别存放到`data`中

#### 2.1.1 处理点击某条新闻跳转到详情

> 当点击某条新闻时，将`id` 传进去，然后遍历新闻列表数据，使用`find` 方法匹配和该`id`相同的那个对象，并把该对象下面的`sourceURL`的值保存起来
>
> 将该`Url`绑定给`a`标签就可以了

```js
<!-- 疫情热点新闻列表区域 -->
    <ul class="covHotList">
      <li v-for="item in covList.news" :key="item.id" @click="newsDetail(item.id)">
        <a :href="detailUrl">
          <span>最新</span>
          <p>{{item.title}}</p>
          <i class="fa fa-angle-right"></i>
        </a>
      </li>
    </ul>


// 点击新闻跳转到详细信息
    newsDetail(id) {
      // 使用find方法找到包含 “return item.id === id”这个条件的对象
      let result = this.covList.news.find((item) => {
        // 拿到这个对象并返回出去
        return item.id === id
      })
      // result.sourceUrl就是当前id === id 的那个对象下的sourceUrl属性
      this.detailUrl = result.sourceUrl
    }
```

### 2.2 较昨日比较的病例

> 这里用`v-for`的话因为返回数据的格式原因，暂时不知道要怎么去渲染每个li都是不同的内容，所以索性做成6个li

- 需要注意的是当比昨日新增和比昨日减少时要改变`+ -`符号
- 我使用的是用三元表达式判断这个值是否大于等于0

### 2.3 时间的处理

> 使用`dayjs`将返回的时间戳转换为正常的格式
>
> 将转换完的时间放到`vuex`上供别的组件使用

**存**

```js
this.$store.commit('getDeadlineTime',{
        deadline:this.deadline,
        highAreaNum:this.lastData.highDangerCount,
        midAreaNum:this.lastData.midDangerCount
      })
```

**处理**

```js
getDeadlineTime(state,...val){
			// state.deadline = val
			val.forEach(item=>{
				state.deadline = item.deadline
				state.highAreaNum = item.highAreaNum
				state.midAreaNum = item.midAreaNum
			})
		}
```

**用**

```js
<span>{{deadline}}</span>

import { mapState } from 'vuex'

computed: {
    ...mapState(['deadline', 'highAreaNum', 'midAreaNum']),
  },
```

# 3. 地区风险、国内数据、全球数据、新冠疫苗部分

### 3.1 地区风险

#### 3.1.1 高低风险卡片的数据

> 放到vuex中

#### 3.1.2 导航栏

> 用`element-ui` 修改下样式

#### 3.1.3 地区风险的表格

> 表格如果不显示降低element-ui的版本到2.4.11

```js
// 表格滚动条变细
  // ----------修改elementui表格的默认样式-----------
  .el-table__body-wrapper {
    &::-webkit-scrollbar {
      // 整个滚动条
      width: 0; // 纵向滚动条的宽度
      background: rgba(213, 215, 220, 0.3);
      border: none;
    }

    &::-webkit-scrollbar-track {
      // 滚动条轨道
      border: none;
    }
  }

  // --------------------隐藏table gutter列和内容区右侧的空白 start
  .el-table th.gutter {
    display: none;
    width: 0
  }

  .el-table colgroup col[name='gutter'] {
    display: none;
    width: 0;
  }

  /deep/.el-table__body {
    width: 100% !important;

  }

  // --------------------隐藏table gutter列和内容区右侧的空白 end
```

### 优化：

> 修改table中的expand扩展列为可以单击当前行的就展开。不用去点那个箭头

- 给`el-table`加上`@cell-click`事件
- 该方法有两个及以上的参数，其中有`row、column`代表的就是当前行当前列

- 调用自带的方法`toggleRowExpansion()`
- 并且要给`el-table`加上ref，以便获取到该元素
- 这里需要注意因为操作列是不能有这个功能的，否则点击修改删除按钮也会打开扩展表格
- 所以需要加上一个判断

```js
handleRow(row,column){
    if(column.label !== "操作"){
        this.$refs.xxx.toggleRowExpansion(row)
    }
}
```

#### 3.1.4 国内疫情地图

**轮播图效果**

> **轮播图导航按钮**

- 给一个`isActive`（默认为false） 和一个 标识变量 `flag`（默认为0） , 给isActive加一些特殊样式
- 当点击`li`时，用三元表达式判断当前的`index`和`flag`是否相等，如果相等给当前`li`添加`isActive`类名
- 搞个函数将`index`传进来，然后将`flag = index`

> **轮播图样式**

- 一个盒子包着一个`ul>li`
- 给这个盒子加宽高，然后设置为相对`relative`定位，超出隐藏
- `ul`中弹性布局，设置为绝对`absolute`定位，`left，top`初始值为0
- 给`ul`添加过渡动画 `transition: all .3s ease-in-out`
- 给地图的`div`设置宽高

```css
// 轮播地图
  .scroll-box {
    width: 414px;
    height: 300px;
    position: relative;
    overflow: hidden;
    margin: auto;

    .sw {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      // 过渡动画
      transition: all .3s ease-in-out;

      li {
        div {
          width: 413px;
          height: 300px;
          background-color: #f7f7f7;
        }
      }
    }

  }
```



> **导航按钮和轮播图联系起来**

- 在给处理导航动态添加类名的函数中获取`ul`和地图的`div`元素
- 获取`div`的宽度`offsetWidth`
- 定义一个标识变量`index = 0`
- 然后将传进来的`i`赋值给标识变量`index`
- 然后改变`ul`的`left`———> mapBox.style.left = `${-index * mapWidth}px`
- '因为往左移是要负数，所以给index加上负号'

```js
// 轮播图按钮
    handleNav(i) {
      this.flag = i
      const mapBox = document.querySelector('.sw');
      const mapEle = document.querySelector('#map1');
      const mapWidth = mapEle.offsetWidth
      let index = 0
      index = i
      mapBox.style.left = `${-index * mapWidth}px`
    },
```

**echart生成中国地图**

- 引入echarts
- 创建一个匿名函数，使用Object对象方法，ES5提供的defineProperties

```js
const instance = function (Vue) {
  // Object对象方法，ES5提供的defineProperties
  // Vue.prototype：挂载到vue实例身上，就可以使用this了
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          chinaMap(id) {
            let dom = document.getElementById(id);
            const myChart1 = echarts.init(dom);
            const map1Option = {   
              // 提示信息：鼠标划过或者点击时有提示信息
              toolTip:{
                trigger:"item",
              },
              // 配置信息
              series:[{
                name:"确诊人数",  
                type:"map",   // 图标类型
                map:"china",   // 是什么地图
                roam:false,   // 是否允许缩放和拖拽
                zoom: 1.2,    // 地图的缩放比例：标准比例是1.2
                label:{      // 配置字体
                  // 必须要的字段
                  normal:{
                    show:true,    // 地图上文字显示
                    textStyle:{
                      fontSize:8   
                    }
                  }
                },
                // 配置地图样式
                itemStyle:{
                  normal:{
                    areaColor:'rgba(0,255,236,0)', // 地区颜色
                    borderColor:'rgba(0,0,0,0.2)',  // 边框的颜色
                  },
                  // 突出重点的配置
                  emphasis:{
                    areaColor:'rgba(255,180,0,0.8)',
                    shadowOffsetX:0,
                    shadowOffsetY:0,
                    shadowBlur:20,   // 模糊程度
                    borderWidth:0,   
                    shadowColor:'rgba(0,0,0,0.5)'
                  },
                  data:[
                    {name:"内蒙古",value:10,itemStyle:{normal:{areaColor:"#f00"}}}
                  ]
                },
              }]
            }
            myChart1.setOption(map1Option)
          }
        }
      }
    }
  })
}
export default instance
```

- 直接在要使用地图的组件中使用方法

```js
 mounted() {
    this.$charts.chinaMap("map1")
  },
```

## #优化：使用mock生成随机数据、处理数据



## #优化：标题

> 将部分样式、格式一样的标题抽出来做一个组件，在组件里面使用具名插槽
>
> 不同内容的标题就用插槽填充

```js
<div class="internal_tit">
        <span class="colorBlock"></span>
		<slot name="tit"></slot>
</div>

__________________________________________________
.internal_tit {
  display: flex;
  align-items: center;
  height: 35px;
  font-size: 18px;
  font-weight: bold;
  margin-top:10px;
  padding:0 20px;
      .colorBlock {
        width: 4px;
        height: 16px;
        background-color: #4169e2;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
}
```



## #优化：轮播图表的导航按钮

> 将样式、格式一样的按钮抽出来做一个组件，在组件里面使用具名插槽
>
> 使用时就只需要插入不同的内容就可以了，不用重复写样式
>
> 按钮的多与少就用data中的数据来循环

**子组件：Title.vue**

```js
<div>
    
<nav class="control">
      <ul>
        <slot name="navBtn">填点什么吧...</slot>
      </ul>
    </nav>
</div>

*******************************************
.control {
    padding: 12px 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 6px;
        font-size: 14px;
        padding: 6px 10px;
        background-color: #f7f7f7;
        cursor: pointer;
      }

      .isActive {
        background-color: #f1f5ff;
        color: #4169e2;
      }
    }
  }
```

**父组件：xxxx.vue ( 使用插槽 )**

- 引入子组件
- 注册组件
- 使用到页面中

```js
<NavBtn>
    <template slot="navBtn">
        <li v-for="(item, index) in arr" :key="item.id" @click="handleNav(index)"
        :class="{ isActive: flag === index }">
            {{ item.tit }}</li>
	</template>
</NavBtn>
*******************************************
// 可加类名，有自己的样式
 <li class="intNav" v-for="(item, index) in navBtnArr" :key="item.id" @click="handleCharts(index)"
            :class="{ isActive: flag === index }">{{ item.tit }}</li>
```

**也可以不加 <template></template>   这里加了相当于套了一层div **

## #优化：echars图表抽公共样式

> 将图表的获取dom和渲染图表的公共部分抽离出来

```js
publicFun(container , options){
    let dom = document.getElementById(container);
    const myChart = echarts.init(dom);
    myChart.setOption(options)
},
this.publicFun(id,map_Option)
// 这里的id还是画图函数的形参，第二个参数则是图标的配置对象
```

### 3.2 国内数据

##### 3.2.1 难点1：

轮播图和导航按钮是分开的，导航按钮的高亮是由下标加上类名配合去实现的，所以要同步的话就得修改flag的值

> - 直接修改flag的值
>
>   - 如果传进来的`next`，则`flag++`。如果是`prev`，则`flag--`
>
>   - prev:
>
>     - 因为初始值为第一个，所以要先判断边缘值，当`flag < 1` 时，也就是正在第一张图片时再往左边点击时要将其修改为数组最后一个
>
>     - ```js
>       if (this.flag < 1) {
>           this.flag = this.trendArr.length
>       }
>       ```
>
>     - `this.flag--`
>
>     - 将flag的值赋给index，由index来做运算，拼接最后的值给ul的left属性
>
>     - ```js
>       this.flag--
>       index = this.flag
>       mapBox.style.left = `${-index * mapWidth}px`
>       ```
>
>   - next:
>
>     - `this.flag++`
>
>     - 判断边缘值，到数组最后一个时强制调回第一个
>
>     - 将flag的值赋给index，由index来做运算，拼接最后的值给ul的left属性
>
>     - ```js
>       if (str == 'next') {
>           this.flag++
>           if (this.flag == this.trendArr.length) {
>               this.flag = 0
>           }
>           index = this.flag
>           mapBox.style.left = `${-index * mapWidth}px`
>       }
>       ```

​    **// falg负责控制导航按钮的高亮与否**

​    **// index 负责控制ul的left的偏移**

代码：

```js
 // 点击左右按钮的处理函数
handleCharts(i) {
    this.flag = i
    const mapBox = document.querySelector(`.${this.ulClass}`);
    const mapEle = document.querySelector('#g1');
    const mapWidth = mapEle.offsetWidth + 20
    let index = 0
    index = i
    mapBox.style.left = `${-index * mapWidth}px`
},
    // 点击左右按钮的处理函数

    moveCharts(str) {
        const mapBox = document.querySelector(`.${this.ulClass}`);
        const mapEle = document.querySelector('#g1');
        const mapWidth = mapEle.offsetWidth + 20
        let index = 0
        if (str == 'prev') {
            if (this.flag < 1) {
                this.flag = this.trendArr.length
            }
            this.flag--
            index = this.flag
            mapBox.style.left = `${-index * mapWidth}px`
        }
        if (str == 'next') {
            this.flag++
            if (this.flag == this.trendArr.length) {
                this.flag = 0
            }
            index = this.flag
            mapBox.style.left = `${-index * mapWidth}px`
        }
    }
```

##### 3.2.2 难点2：

封装轮播图的组件

> - 思路一：将公共的部分抽离出来，需要变动的部分使用具名插槽动态插入
>   - 好像是因为使用的都是同一个类名同一个全局变量，会有变量污染------例如第一个轮播图动起来，第二个跟着动。
>
> - 思路二：使用mixin方法
>   - 同样是没有作用域，操作的都是同一个类名，会有污染

###### 以上两种都以失败告终

##### 3.2.3 解决思路：在思路一的基础上做修改

> - 写一次轮播图，所有变动的数据由父组件通过props传进去
>   - 首先要把导航按钮的数据传进去
>   - 传图片的id名数据
>   - 传ul的类名

![image-20221114234741769](E:\Study\FrontEnd\vue_project\疫情数据可视化\笔记\projectNote.assets\image-20221114234741769.png)

1. **处理不同类名互不干扰**

> 就是拿到传过来的类名数据，绑定到class上
>
> js获取元素时要使用拼接的方式获取 ``.${this.ulClass}`\` 

2. **处理导航按钮互不干扰**

> 原理同上
>
> 在点击事件里处理边缘值时应该写当前数组长度
>
> 到达最后一个item时
>
> ```js
> if (this.flag == this.btnArr.length) {
>     this.flag = 0
> }
> ```

3. **处理有各自的div长度**

> 根据传过来的id名循环出来有多少个div

##### 3.2.4 修改echart图例的宽度和紧凑度

> 可以使用`itemWidth`

```js
legend: {
    data: ['美国', '意大利', '法国', '德国', '巴西', '英国', '俄罗斯', '西班牙'],
    left: 'center',
    top: '18%',
    itemWidth: 17,
    itemGap: 0,
}
```




### 3.3 新冠疫苗

> 该板块由两部分组成，因为第一个el-card和下面的el-card有点不同，所以第一个card单独写，其他的用v-for循环

**引入本地图片出现Failed to load resource**

> 应该是动态添加src时被当做静态资源处理了，没有进行编译

**解决方法：放到public或者使用require函数**

```js
<div class="server-content">
    <router-link to="javascript:;" v-for="i in 8" :key="i" class="server-item" >
        <img :src="require(`../assets/index/${i}.png`)" alt="">
    </router-link>
</div>
-------------------------------
newsData: [
        {
          tit: '所有人都能接种吗？',
          imgSrc: require('../../assets/images/cov1.jpg'),
          desc: '接种新冠病毒疫苗的效果如何？保护期有多久？可以和其他疫苗一起接种吗？',
          detailSrc: ''
        },
 ]
```

