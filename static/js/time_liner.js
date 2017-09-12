   (function(window){
      var timeLiner = function(params,callback){
        this.extend(this.params,params);
        this._init(callback);
    };
    timeLiner.prototype = {
        params:{
            id:'',
            title:[],
            remark:[],
        disabled:[], //状态失效
        index:0, //默认选中
        time:[],
        style:'col'
    },
    _init:function(callback){
        var self = this;
        var id = self.params.id;
        var index = self.params.index;
        var time = self.params.time;
        var disabled = self.params.disabled;
        var title = self.params.title;
        var remark = self.params.remark;
        var msg = '';
        var code = 1;
        if(!id){
            code = 0;
          msg='timeLiner:id is not defined!';
        }
        try{
        var ul = document.createElement("ul");
        for(var i = 0;i<title.length;i++){
            var li = document.createElement("li");

            for(var j in disabled)
                if(disabled[j] == i){
                    li.classList.remove("active");
                    li.classList.add("disabled");
                }else{
                   if(i == index)
                    li.classList.add("active");
            }

            li.innerHTML='<div class="content">'
            +'<div class="title">'+title[i]+'</div>'
            +'<div class="remark">'+remark[i]+'<div>';
            if(time[i]){
                li.innerHTML+='<div class="time">'+time[i]+'</div>'
            }
            ul.appendChild(li);
        }
        document.getElementById(id).appendChild(ul);
        var el = document.getElementById(id).getElementsByTagName("li");
        if(el){
            for(var i = 0 ;i<el.length;i++){
             el[i].onclick = function(e){
                if(e.target.classList == 'disabled' || e.target.parentNode.parentNode.classList== 'disabled')
                    return ;
                if(e.target.localName == 'li')
                {
                    e.target.parentNode.querySelector(".active").classList.remove("active");
                    e.target.classList.add("active");
                    console.log(e.target.localName);
                }
                else{
                    document.getElementsByClassName('time_liner')[0].querySelector(".active").classList.remove("active");
                    e.target.parentNode.parentNode.classList.add("active");
                }
            }
        }

    }
} catch(err){

}finally{
     if(callback){
        callback({
            code:code,
            msg:msg
        });
    }
}

},
extend:function(a,b){
    for(var key in b){
        if(b.hasOwnProperty(key)){
            a[key] = b[key];
        }
    }
    return a;
}
}
window.timeLiner = timeLiner;
}(window))