window.onload = function () {
    new Vue({
        el: '#my',//element
        data: { //数据
            name: 'sonia',
            num: 0,//轮播标记
            flag:0,//做题标记
            progress:"",//进度条宽度,
            styleFlag:960519152,//选中的标记 
            answerMap:new Map(),
            imges: [
                    // 'img/banner1.jpg',
                    // 'img/banner2.jpg',
                    'img/banner3.jpg',
                    'img/banner4.jpg',
                    // 'img/banner5.jpg',
                    // 'img/logo.gif',
                ],
            imgess: [
                'img/logo.gif',
            ],    
            questionsArry: ["精力充沛吗吗？精力力吗？精力力充沛吗沛吗精力充沛吗精力充沛吗", "容易疲乏吗？", "说话声音体弱无力吗？", "感到闷闷不乐，情绪低沉吗？",
                             "比一般人耐受不了寒冷吗？", "能适应外界自然和社会环境的变化？", "容易失眠吗？", "容易忘事（健忘）吗？"],
            chooseArry: [["第一题没有（根本不）不）1", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第二题没有（根本不）2", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第三题没有（根本不）3", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第四题没有（根本不）4", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第五题没有（根本不）5", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第六题没有（根本不）6", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第七题没有（根本不）7", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第八题没有（根本不）8", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"]]

        },
        methods: {   //方法
            numChange() {
                if (this.num == this.imges.length-1) {
                    this.num = 0;
                }else{
                    this.num++;
                }  
            },
            timeChange() {
                setInterval(this.numChange, 3000);
            },
            //上一题
            backQuestion(index){  
                if(this.flag==0){//当下标为0时，停止--
                    this.flag=0;
                }else{
                    this.flag--;
                }
                //修改进度条进度
                this.progress=Math.round((this.flag*100/(this.questionsArry.length-1)));
                //还原
                //this.styleFlag=960519152;
                this.styleFlag=this.answerMap.get(index-1);
            },
            //下一题
            nextQuestion(index){
                //console.log("这是下标为"+index+"的题");              
                if(this.answerMap.get(index)>=0){
                    if(this.flag==this.questionsArry.length-1){ //当下标和题目数组长度-1相等时，重置此标记为数组长度，防止数组超出范围
                        this.flag=this.questionsArry.length-1; //小标要比长度少一位，所以把长度-1 把值给下标
                    }else{
                        this.flag++;             
                    }
                    //修改进度条进度
                    this.progress=Math.round(((this.flag)*100/(this.questionsArry.length-1)));
                    //如果是最后一条则进行弹出框提示已经完成 
                    if(index==this.questionsArry.length-1){
                        this.$message({
                            message: '提交成功！',
                            type: 'success',
                            center: true
                          });
                          console.log(this.answerMap);
                          let answerInfo="";
                          for(let[key,val] of this.answerMap){
                                console.log(key+"******"+val);
                                //answerInfo+="下标为"+key+"的题目,选项下标为"+val+"***********";
                                answerInfo+="第"+(key+1)+"题:"+(val+1)+"；";
                          }
                          alert(answerInfo)
                          console.log(answerInfo);
                    }else{
                        //如果不是最后一条值则把下一题的下标给他
                        this.styleFlag=this.answerMap.get(index+1);
                    }
                }else{  //如果此题没有进行选择，那么就不能继续进行（flag也不能在进行累加）
                    this.$message({
                        message: '当前题目未选择！',
                        type: 'warning'
                      });
                    return false;
                }          
            },
            //选择
            getChoose(index,indexs){
                console.log("这是下标为"+index+"的题,选择的是下标为"+indexs+"项答案");
                //将已选中的下标传过来，并把值赋予给我们声明的标记，让表达式成立，因为下标是唯一的，就保证了样式的唯一性
                this.styleFlag=indexs;
                //this.nextQuestion();
                //var info=document.getElementById("list-group-item-id").getElementsByTagName("li");  
                //将题号和选项放入map对象
                this.answerMap.set(index,indexs);
            },
            //提交
            submit(){
                //判断最后一题是否做了
                this.nextQuestion(this.questionsArry.length-1);  
            }
        },
        mounted: function () {//生命周期函数 每次进入就会调用
            this.timeChange();
        }
    })
}