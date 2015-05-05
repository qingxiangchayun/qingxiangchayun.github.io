title: 找出字符串中出现次数最多的字符
date: 2014-11-16 16:09:09
tags: js
---

### 找出字符串中出现次数最多的字符
```javascript
function findMaxNumChart(str){
    'use strit';

    var maxNumChart = null,
        totalCount = 0,
        matchChartLen = 0;

    for(var i=0,len=str.length; i<len; i++){

        if(str[i] == maxNumChart){
            continue;
        }

        matchChartLen = str.match( new RegExp(str[i], 'g') ).length;

        if(totalCount < matchChartLen){
            totalCount = matchChartLen;
            maxNumChart = str[i];
        }
    }

    return {
        maxNumChart : maxNumChart,
        totalCount : totalCount
    }
}
```

使用：
```javascript
var str = 'abbbccccdddeeeffffaaaaa';
findMaxNumChart(str) --> Object { maxNumChart="a", totalCount=6}
```

很简单的代码，为什么关键时候写不出来呢，是不是想太复杂了啊！！！
看来还得多学习，多提高啊！！！

