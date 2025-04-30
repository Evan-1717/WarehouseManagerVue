<template>
    <div style="height:100%">
        <div style="margin-bottom: 5px;">
            <el-form ref="form1" :model="form" label-width="75px">
                <el-col :span="4">
                    <el-form-item label="创建起止日期" prop="creater">
                        <el-date-picker type="date" placeholder="起始时间" v-model="form1.date1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                        <el-date-picker type="date" placeholder="结束时间" v-model="form1.date2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item v-show="user.roleId!=2" label="记录人" prop="creater">
                        <el-select v-model="form1.creater" filterable clearable multiple collapse-tags placeholder="请选择" style="width: 170px;" @keyup.enter.native="loadPost">
                            <el-option
                                    v-for="item in users" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>

            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="aiAnalyze('first')" v-show="user.roleId!=2">AI分析</el-button>
        </div>
        <el-table :data="tableData" :summary-method="getSummaries"  show-summary border style="overflow: auto; " max-height="calc(100% - 200px)">
            <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
            <el-table-column prop="date" label="创建日期" width="100" fixed="left"></el-table-column>
            <el-table-column prop="update_date" label="更新日期" width="100" fixed="left"></el-table-column>
            <el-table-column prop="advertiser_id" label="创量账户ID" width="150" fixed="left"></el-table-column>
            <el-table-column prop="media_account_name" label="推广链名称" width="500" fixed="left"></el-table-column>
            <el-table-column prop="fund_cost" label="今日消耗" width="100" fixed="left"></el-table-column>
            <el-table-column prop="fund_recharge" label="今日充值" width="100" fixed="left"></el-table-column>
            <el-table-column prop="stat_cost" label="总消耗" width="100" fixed="left"></el-table-column>
            <el-table-column prop="stat_pay_amount" label="总充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="pay_amount_roi" label="ROI" width="100" fixed="left"></el-table-column>
            <el-table-column prop="media_source" label="小程序" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="creater" label="创建人" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="operate" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="history(scope.row)">历史</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 50, 1000]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <el-dialog
                title="提问"
                :visible.sync="aiAskDialogVisible"
                width="31%"
                center :close-on-click-modal="false">

            <el-form ref="formAiAskRef" :rules="rules" :model="formAiAsk" label-width="140px">
                <el-col :span="12">
                    <el-form-item label="请输入问题:" prop="ask">
                        <el-input v-model="formAiAsk.ask" :precision="2" style="width: 400px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="aiAskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ask">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="历史信息"
                :visible.sync="aiAnswerDialogVisible"
                width = "40%"
                style=" max-height: 100%;"
                center :close-on-click-modal="false" >
            <div style="white-space: pre-wrap;">{{aiAnswer}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="aiAnswerDialogVisible = false">退出提问</el-button>
                <el-button type="primary" @click="aiAnalyze('other')">继续提问</el-button>
            </span>
        </el-dialog>
        <el-dialog
                :title="question"
                :visible.sync="historyDialogVisible"
                width = "30%"
                style=" max-height: 100%;"
                center :close-on-click-modal="false" >
            <div>
                <div style="white-space: pre-wrap;"> <span> 充值：</span>
                    <div  v-for="item in daily_recharge" :key="item">
                        {{item}}
                    </div>

                </div>
                <div style="white-space: pre-wrap;"><span> 消耗：</span>
                    <div  v-for="item in daily_cost" :key="item">
                        {{item}}
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdvertiserManage",
        data() {
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                question:'问题',
                formAiAsk:{ask:''},
                aiAskDialogVisible:false,
                aiAnswerDialogVisible:false,
                historyDialogVisible:false,
                daily_cost:'',
                daily_recharge:'',
                aiAnswer:'',
                tableData: [],
                pageSize:10,
                pageNum:1,
                total:0,
                name:'',
                centerDialogVisible:false,
                form:{
                    id:'',
                    date:'',
                    update_date:'',
                    advertiser_id: 0,
                    media_advertiser_nick: 0,
                    media_account_id: 0,
                    fund_cost: 0,
                    fund_recharge: 0,
                    stat_cost: 0,
                    pay_amount_roi: 0,
                    stat_pay_amount: 0,
                    fanqiefufeiroi: 0,
                    media_account_name: 0,
                    media_source: 0,
                    creater: 0
                },
                form1:{
                    date1:'',
                    date2:'',
                    creater:[JSON.parse(sessionStorage.getItem('CurUser')).name]
                },
                rules: {
                    date: [
                        {required: true, trigger: 'blur'},
                    ]
                },
                users:[],
                roles:[],
                modRow: {}
            }
        },
        methods:{
            history(row) {
                this.historyDialogVisible = true;
                this.daily_recharge = row.daily_recharge
                this.daily_cost = row.daily_cost
                console.log(row.daily_recharge)
                console.log(row.daily_cost)
            },
            getInputInfo() {
                this.$axios.get(this.$httpUrl+'/user/inputInfo').then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.users = res.data.user;
                        this.roles = res.data.role;
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }

                })
            },
            ask() {
                this.question = '问题: ' + this.formAiAsk.ask;
                const data = {
                    date1: this.form1.date1,
                    date2:this.form1.date2,
                    creater:this.form1.creater,
                    asker: this.user.name,
                    ask: this.formAiAsk.ask,
                    tableName: 'advertiser',
                    role:this.form1.role
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'AI正在思考，清稍等！',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post(this.$httpUrl+'/deepseek/ask', data).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.aiAskDialogVisible = false;
                        this.aiAnswerDialogVisible = true;
                        this.aiAnswer = res.data;
                        loading.close();
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }
                })
            },
            aiAnalyze(time) {
                this.formAiAsk.ask= '';
                this.aiAnswerDialogVisible = false
                this.aiAnswer = '';
                this.aiAskDialogVisible = true;

                if (time == 'first') {
                    this.$axios.post(this.$httpUrl+'/deepseek/clearAsk', {
                        asker: this.user.name,
                        tableName: 'advertiser'
                    })
                }
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                var fund_costSum = 0;
                var stat_costSum = 0;
                for (var val of data) {
                    fund_costSum += val.fund_cost;
                    stat_costSum += val.stat_cos;
                }
                columns.forEach((column, index) => {
                    if (this.user.roleId==2) {
                        if (index === 0) {
                            sums[index] = '合计';
                        } else if (index === 4) {
                            sums[index] = this.fixed2(fund_costSum);
                        } else if (index === 6) {
                            sums[index] = this.fixed2(stat_costSum);
                        }
                    }
                });
                return sums;
            },
            fixed (val) {
                return Number(val).toFixed(4);
            },
            fixed2 (val) {
                return Number(val).toFixed(2);
            },
            resetForm() {
                this.$refs.form.resetFields();
                this.form.id = '';
            },
            // del(id){
            //     this.$axios.get(this.$httpUrl+'/advertiser/del?id='+id).then(res=>res.data).then(res=>{
            //         if(res.code==200){
            //
            //             this.$message({
            //                 message: '操作成功！',
            //                 type: 'success'
            //             });
            //             this.loadPost()
            //         }else{
            //             this.$message({
            //                 message: '操作失败！',
            //                 type: 'error'
            //             });
            //         }
            //     })
            // },

            exportExcel(){
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.$confirm('确定导出？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$axios.request({
                        url:this.$httpUrl+'/advertiser/export',
                        method:'post',
                        data: {
                            date1:this.form1.date1,
                            date2:this.form1.date2,
                            location:this.form1.location,
                            content:this.form1.content,
                            hiredate1:this.form1.hiredate1,
                            hiredate2:this.form1.hiredate2,
                            creater:this.form1.creater,
                            role: this.form1.role
                        },
                        responseType:'blob'
                    }).then(res=>{
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download','投放记录' + new Date().getTime() + '.xlsx');
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(URL);
                    }).catch(() => {
                        this.$message({
                            message: '下载失败！',
                            type: 'error'
                        });
                    })
                })
            },
            currentDate(){
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth();
                month = month + 1 > 12 ? 1 : month + 1;
                month =  month > 9 ? month : "0" +month.toString();
                var day = d.getDate();
                var hour = d.getHours();
                hour = hour > 9 ? hour : "0" + hour.toString();
                var minute = d.getMinutes();
                minute = minute > 9 ? minute : "0" + minute.toString();
                var second = d.getSeconds();
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            },

            handleSizeChange(val) {
                this.pageNum=1
                this.pageSize=val
                this.loadPost()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.loadPost();
            },
            resetParam(){
                this.form1.date1='';
                this.form1.date2='';
                this.form1.location='';
                this.form1.content='';
                this.form1.hiredate1='';
                this.form1.hiredate2='';
                if (this.user.roleId!=2){
                    this.form1.creater=[];
                } else {
                    this.form1.creater=[this.user.name];
                }
            },
            loadPost(){
                this.$axios.post(this.$httpUrl+'/advertiser/listPage',{
                    pageSize:this.pageSize,
                    pageNum:this.pageNum,
                    param:{
                        date1:this.form1.date1,
                        date2:this.form1.date2,
                        location:this.form1.location,
                        content:this.form1.content,
                        hiredate1:this.form1.hiredate1,
                        hiredate2:this.form1.hiredate2,
                        creater:this.form1.creater,
                        role: this.form1.role
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.tableData=res.data
                        this.total=res.total
                    }else{
                        alert('获取数据失败')
                    }

                })
            }
        },
        beforeMount() {
            if (this.user.roleId!=2){
                this.form1.creater=[];
            } else {
                this.form1.creater=[JSON.parse(sessionStorage.getItem('CurUser')).name];
            }
            this.loadPost()
            this.getInputInfo();
        }
    }
</script>

<style scoped>

</style>
