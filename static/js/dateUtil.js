(function(window){
    var dateUtil = function(time,callback){
        this.exchange(time,callback);
    };
    dateUtil.prototype = {
        exchange:function(time,callback){
            var exobj = this.getObjdate();
            if(time){
                try{
                    var timed = new Date(time);
                    var time_al = parseInt(timed.getHours());
                    var time_ml = parseInt(timed.getMinutes());
                    var time_h = time_al>=10?time_al:'0'+time_al;
                    var time_m = time_ml>=10?time_ml:'0'+time_ml;
                    var obj = {
                        y:timed.getFullYear(),
                        m:timed.getMonth(),
                        d:timed.getDate(),
                        exd:timed.getDay(),
                        t:time_h+':'+time_m
                    };
                    var val = obj.y+'-'+obj.m+'-'+obj.d;
                    var datex = exobj.d - obj.d;
                    var monthx = exobj.m - obj.m;

                    if(exobj.y == obj.y){
                        if(datex){
                           if(datex == 1)
                            val = '昨天 '+obj.t;
                        else{
                            if(exobj.exd >1 && obj.exd < exobj.exd && monthx < 7){
                                val = this.getWeek(obj.exd);
                            }
                        }
                    }else{
                        val = "今天 "+obj.t;
                    }

                }else{

                }
            }catch(err){
                console.error(err);
            }
            return val;
        }
        if(callback)
            callback();

    },
    getObjdate:function(){
        var initime = new Date();
        var obj = {
            y:initime.getFullYear(),
            m:initime.getMonth(),
            d:initime.getDate(),
            exd:initime.getDay()
        };
        return obj;
    },
    getWeek:function(week){
        switch(parseInt(week)) {
            case 0: return '周一';break;
            case 1: return '周二';break;
            case 2: return '周三';break;
            case 3: return '周四';break;
            case 4: return '周五';break;
            case 5: return '周六';break;
            case 6: return '周日';break;
            default: return '';break;
        }
    }
}

window.dateUtil = dateUtil;

})(window);