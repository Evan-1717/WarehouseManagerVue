<template>
    <div style="height:100%">
        <div style="margin-bottom: 5px;">
            <el-form ref="form1" :model="form" label-width="75px">
                <el-col :span="4">
                    <el-form-item label="起止日期" prop="creater">
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

                <el-col :span="3">
                    <el-form-item v-show="user.roleId!=2" label="角色" prop="role">
                        <el-select v-model="form1.role" multiple clearable collapse-tags placeholder="请选择" style="width: 170px;" @keyup.enter.native="loadPost">
                            <el-option
                                    v-for="item in roles" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item v-show="user.roleId!=2" label="位置" prop="location">
                        <el-select v-model="form1.location" collapse-tags placeholder="请选择" style="width: 170px;" @keyup.enter.native="loadPost" clearable>
                            <el-option
                                    v-for="item in locations" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item v-show="user.roleId!=2" label="内容" prop="content">
                        <el-select v-model="form1.content" collapse-tags placeholder="请选择" style="width: 170px;" @keyup.enter.native="loadPost" clearable >
                            <el-option
                                    v-for="item in contents" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="入职时间" prop="creater" v-show="user.roleId!=2" >
                        <el-date-picker type="date" placeholder="起始时间" v-model="form1.hiredate1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                        <el-date-picker type="date" placeholder="结束时间" v-model="form1.hiredate2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form>


            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="aiAnalyze('first')" v-show="user.roleId!=2">AI分析</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="exportExcel" v-show="user.roleId!=2">导出</el-button>
        </div>
        <el-table :data="tableData" :summary-method="getSummaries"  show-summary
                  :header-cell-style="cell_style" border style="overflow: auto; " max-height="calc(100% - 200px)">
            <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
            <el-table-column prop="date" label="日期" width="100" fixed="left"></el-table-column>
            <el-table-column prop="creater" label="记录人" width="80" fixed="left"></el-table-column>
            <el-table-column prop="role" label="角色" width="50" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="location" label="位置" width="100" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="content" label="内容" width="100" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="hiredate" label="入职时间" width="100" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="fanqiedouxiaoexpend" label="番茄抖小消耗" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiedouxiaorecharge" label="番茄抖小充值" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiedouxiaoroi" label="番茄抖小ROI" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiedouxiaomargin" label="番茄抖小盈亏" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiedouxiaoprofit" label="番茄抖小毛利" width="120" :sortable="true" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="fanqieweixiaoexpend" label="番茄微小消耗" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqieweixiaorecharge" label="番茄微小充值" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqieweixiaoroi" label="番茄微小ROI" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqieweixiaomargin" label="番茄微小盈亏" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqieweixiaoprofit" label="番茄微小毛利" width="120" :sortable="true" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="fanqiemianfeiexpend" label="番茄免费消耗" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeirecharge" label="番茄免费充值" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeiroi" label="番茄免费ROI" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeimargin" label="番茄免费盈亏" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeiprofit" label="番茄免费毛利" width="120" :sortable="true" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="dianzhongexpend" label="点众消耗" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="dianzhongrecharge" label="点众充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="dianzhongroi" label="点众ROI" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="dianzhongmargin" label="点众盈亏" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="dianzhongprofit" label="点众毛利" width="100" :sortable="true" v-if="user.roleId!=2"></el-table-column>

            <el-table-column prop="meiguangexpend" label="美光消耗" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="meiguangrecharge" label="美光充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="meiguangroi" label="美光ROI" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="meiguangmargin" label="美光盈亏" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="meiguangprofit" label="美光毛利" width="100" :sortable="true" v-if="user.roleId!=2"></el-table-column>

            <el-table-column prop="chumoexpend" label="触摸消耗" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="chumorecharge" label="触摸充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="chumoroi" label="触摸ROI" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="chumomargin" label="触摸盈亏" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="chumoprofit" label="触摸毛利" width="100" :sortable="true" v-if="user.roleId!=2"></el-table-column>

            <el-table-column prop="zongexpend" label="总消耗" width="90" :sortable="true" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="zongroi" label="总ROI" width="90" :sortable="true"></el-table-column>
            <el-table-column prop="zongmargin" label="总盈亏" width="90" :sortable="true"></el-table-column>
            <el-table-column prop="zongprofit" label="总毛利" width="90" :sortable="true" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="time" label="记录时间" width="150"></el-table-column>
            <el-table-column prop="operate" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)" style="margin-left: 5px;">
                        <el-button slot="reference" size="small" type="danger" >删除</el-button>
                    </el-popconfirm>
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
                title="提示"
                :visible.sync="centerDialogVisible"
                width="31%"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="140px">
                <el-col :span="24">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker type="date" v-model="form.date"  value-format="yyyy-MM-dd" style="width: 180px;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄抖小消耗" prop="fanqiedouxiaoexpend">
                        <el-input-number v-model="form.fanqiedouxiaoexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                        <el-button size="small" type="primary" style="margin-left: 2px;" @click="calculateExpend('抖音')" >计算</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄抖小充值" prop="fanqiedouxiaorecharge">
                        <el-input-number v-model="form.fanqiedouxiaorecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                        <el-button size="small" type="primary" style="margin-left: 2px;" @click="calculate('抖音')" >计算</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄微小消耗" prop="fanqieweixiaoexpend">
                        <el-input-number v-model="form.fanqieweixiaoexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                        <el-button size="small" type="primary" style="margin-left: 2px;" @click="calculateExpend('微信')" >计算</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄微小充值" prop="fanqieweixiaorecharge">
                        <el-input-number v-model="form.fanqieweixiaorecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                        <el-button size="small" type="primary" style="margin-left: 2px;" @click="calculate('微信')" >计算</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄免费消耗" prop="fanqiemianfeiexpend">
                        <el-input-number v-model="form.fanqiemianfeiexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                        <el-button size="small" type="primary" style="margin-left: 2px;" @click="calculateExpend('免费')" >计算</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄免费充值" prop="fanqiemianfeirecharge">
                        <el-input-number v-model="form.fanqiemianfeirecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="点众消耗" prop="dianzhongexpend">
                        <el-input-number v-model="form.dianzhongexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="点众充值" prop="dianzhongrecharge">
                        <el-input-number v-model="form.dianzhongrecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="美光消耗" prop="meiguangexpend">
                        <el-input-number v-model="form.meiguangexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="美光充值" prop="meiguangrecharge">
                        <el-input-number v-model="form.meiguangrecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="触摸消耗" prop="chumoexpend">
                        <el-input-number v-model="form.chumoexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="触摸充值" prop="chumorecharge">
                        <el-input-number v-model="form.chumorecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提问"
                :visible.sync="aiAskDialogVisible"
                width="40%"
                center :close-on-click-modal="false">

            <el-form ref="formAiAskRef" :rules="rules" :model="formAiAsk" label-width="140px">
                <el-col :span="12">
                    <el-form-item label="请输入问题:" prop="ask">
                        <el-input v-model="formAiAsk.ask" :precision="2" style="width: 700px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="aiAskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ask">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                :title="question"
                :visible.sync="aiAnswerDialogVisible"
                width = "40%"
                style=" max-height: 100%;"
                center :close-on-click-modal="false"
                @close="aiAnswerClose()">
            <div style="white-space: pre-wrap;">{{aiAnswer}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="aiAnswerDialogVisible = false">退出提问</el-button>
                <el-button type="primary" @click="aiAnalyze('other')">继续提问</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ShouzhiManage",
        data() {
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                question:'问题',
                formAiAsk:{ask:''},
                aiAskDialogVisible:false,
                aiAnswerDialogVisible:false,
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
                    fanqiedouxiaoexpend:0,
                    dianzhongexpend:0,
                    fanqieweixiaoexpend:0,
                    fanqiedouxiaorecharge:0,
                    fanqiemianfeiexpend:0,
                    dianzhongrecharge:0,
                    fanqieweixiaorecharge:0,
                    fanqiemianfeirecharge:0,
                    fanqiedouxiaoroi:0,
                    dianzhongroi:0,
                    fanqieweixiaoroi:0,
                    fanqiemianfeiroi:0,
                    fanqiedouxiaoprofit:0,
                    dianzhongprofit:0,
                    fanqieweixiaoprofit:0,
                    fanqiemianfeiprofit:0,
                    zongexpend:0,
                    zongroi:0,
                    zongprofit:0,
                    fanqiedouxiaomargin:0,
                    dianzhongmargin:0,
                    fanqieweixiaomargin:0,
                    fanqiemianfeimargin:0,
                    meiguangexpend:0,
                    meiguangrecharge:0,
                    meiguangroi:0,
                    meiguangmargin:0,
                    meiguangprofit:0,
                    chumoexpend:0,
                    chumorecharge:0,
                    chumoroi:0,
                    chumomargin:0,
                    chumoprofit:0,
                    zongmargin:0,
                    time : '',
                    creater : ''
                },
                form1:{
                    date1:'',
                    date2:'',
                    hiredate1:'',
                    hiredate2:'',
                    location:'',
                    content:'',
                    creater:[JSON.parse(sessionStorage.getItem('CurUser')).name],
                    role:[]
                },
                rules: {
                    date: [
                        {required: true, trigger: 'blur'},
                    ]
                },
                locations:[
                    {
                        value: '1903',
                        label: '1903'
                    },
                    {
                        value: '907',
                        label: '907'
                    }
                ],
                contents:[
                    {
                        value: '番茄',
                        label: '番茄'
                    }, {
                        value: '点众',
                        label: '点众'
                    }, {
                        value: '小说',
                        label: '小说'
                    }, {
                        value: '腾讯',
                        label: '腾讯'
                    }, {
                        value: 'iaa',
                        label: 'iaa'
                    }
                ],
                users:[],
                roles:[],
                modRow: {}
            }
        },
        methods:{
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
            aiAnswerClose() {

            },
            ask() {
                this.question = '问题: ' + this.formAiAsk.ask;
                const data = {
                    date1: this.form1.date1,
                    date2:this.form1.date2,
                    location:this.form1.location,
                    content:this.form1.content,
                    hiredate1:this.form1.hiredate1,
                    hiredate2:this.form1.hiredate2,
                    creater:this.form1.creater,
                    asker: this.user.name,
                    type: "first",
                    ask: this.formAiAsk.ask,
                    tableName: 'shouzhi',
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
                        tableName: 'shouzhi'
                    })
                }
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                var fanqiedouxiaoexpendSum = 0;
                var fanqiedouxiaorechargeSum = 0;
                var fanqiedouxiaomarginSum = 0;
                var fanqiedouxiaoprofitSum = 0;
                var fanqieweixiaoexpendSum = 0;
                var fanqieweixiaorechargeSum = 0;
                var fanqieweixiaomarginSum = 0;
                var fanqieweixiaoprofitSum = 0;
                var fanqiemianfeiexpendSum = 0;
                var fanqiemianfeirechargeSum = 0;
                var fanqiemianfeimarginSum = 0;
                var fanqiemianfeiprofitSum = 0;
                var dianzhongexpendSum = 0;
                var dianzhongrechargeSum = 0;
                var dianzhongmarginSum = 0;
                var dianzhongprofitSum = 0;
                var meiguangexpendSum = 0;
                var meiguangrechargeSum = 0;
                var meiguangmarginSum = 0;
                var meiguangprofitSum = 0;
                var chumoexpendSum = 0;
                var chumorechargeSum = 0;
                var chumomarginSum = 0;
                var chumoprofitSum = 0;
                var zongmarginSum = 0;
                var zongprofitSum = 0;
                for (var val of data) {
                    fanqiedouxiaoexpendSum = fanqiedouxiaoexpendSum + val.fanqiedouxiaoexpend;
                    fanqiedouxiaorechargeSum += val.fanqiedouxiaorecharge;
                    fanqiedouxiaomarginSum += val.fanqiedouxiaomargin;
                    fanqiedouxiaoprofitSum += val.fanqiedouxiaoprofit;
                    fanqieweixiaoexpendSum += val.fanqieweixiaoexpend;
                    fanqieweixiaorechargeSum += val.fanqieweixiaorecharge;
                    fanqieweixiaomarginSum += val.fanqieweixiaomargin;
                    fanqieweixiaoprofitSum += val.fanqieweixiaoprofit;
                    fanqiemianfeiexpendSum += val.fanqiemianfeiexpend;
                    fanqiemianfeirechargeSum += val.fanqiemianfeirecharge;
                    fanqiemianfeimarginSum += val.fanqiemianfeimargin;
                    fanqiemianfeiprofitSum += val.fanqiemianfeiprofit;
                    dianzhongexpendSum += val.dianzhongexpend;
                    dianzhongrechargeSum += val.dianzhongrecharge;
                    dianzhongmarginSum += val.dianzhongmargin;
                    dianzhongprofitSum += val.dianzhongprofit;
                    meiguangexpendSum += val.meiguangexpend;
                    meiguangrechargeSum += val.meiguangrecharge;
                    meiguangmarginSum += val.meiguangmargin;
                    meiguangprofitSum += val.meiguangprofit;
                    chumoexpendSum += val.chumoexpend;
                    chumorechargeSum += val.chumorecharge;
                    chumomarginSum += val.chumomargin;
                    chumoprofitSum += val.chumoprofit;
                    zongmarginSum += val.zongmargin;
                    zongprofitSum += val.zongprofit;
                }
                columns.forEach((column, index) => {
                    if (this.user.roleId==2) {
                        if (index === 0) {
                            sums[index] = '合计';
                        } else if (index === 3) {
                            sums[index] = this.fixed2(fanqiedouxiaoexpendSum);
                        } else if (index === 4) {
                            sums[index] = this.fixed2(fanqiedouxiaorechargeSum);
                        } else if (index === 5) {
                            sums[index] = this.fixed(fanqiedouxiaorechargeSum / fanqiedouxiaoexpendSum * 1.045);
                        } else if (index === 6) {
                            sums[index] = this.fixed2(fanqiedouxiaomarginSum);
                        } else if (index === 7) {
                            sums[index] = this.fixed2(fanqieweixiaoexpendSum);
                        } else if (index === 8) {
                            sums[index] = this.fixed2(fanqieweixiaorechargeSum);
                        }else if (index === 9) {
                            sums[index] = this.fixed(fanqieweixiaorechargeSum / fanqieweixiaoexpendSum * 1.045);
                        } else if (index === 10) {
                            sums[index] = this.fixed2(fanqieweixiaomarginSum);
                        } else if (index === 11) {
                            sums[index] = this.fixed2(fanqiemianfeiexpendSum);
                        } else if (index === 12) {
                            sums[index] = this.fixed2(fanqiemianfeirechargeSum);
                        }else if (index === 13) {
                            sums[index] = this.fixed(fanqiemianfeirechargeSum / fanqiemianfeiexpendSum * 1.045);
                        } else if (index === 14) {
                            sums[index] = this.fixed2(fanqiemianfeimarginSum);
                        } else if (index === 15) {
                            sums[index] = this.fixed2(dianzhongexpendSum);
                        } else if (index === 16) {
                            sums[index] = this.fixed2(dianzhongrechargeSum);
                        }else if (index === 17) {
                            sums[index] = this.fixed(dianzhongrechargeSum / dianzhongexpendSum * 1.045);
                        } else if (index === 18) {
                            sums[index] = this.fixed2(dianzhongmarginSum);
                        } else if (index === 19) {
                            sums[index] = this.fixed2(meiguangexpendSum);
                        } else if (index === 20) {
                            sums[index] = this.fixed2(meiguangrechargeSum);
                        }else if (index === 21) {
                            sums[index] = this.fixed(meiguangrechargeSum / meiguangexpendSum * 1.045);
                        } else if (index === 22) {
                            sums[index] = this.fixed2(meiguangmarginSum);
                        } else if (index === 23) {
                            sums[index] = this.fixed2(chumoexpendSum);
                        } else if (index === 24) {
                            sums[index] = this.fixed2(chumorechargeSum);
                        }else if (index === 25) {
                            sums[index] = this.fixed(chumorechargeSum / chumoexpendSum * 1.045);
                        } else if (index === 26) {
                            sums[index] = this.fixed2(chumomarginSum);
                        } else if (index === 27) {
                            sums[index] = this.fixed((fanqiedouxiaorechargeSum + fanqieweixiaorechargeSum + dianzhongrechargeSum + fanqiemianfeirechargeSum + meiguangrechargeSum + chumorechargeSum)
                                / (fanqiedouxiaoexpendSum + fanqieweixiaoexpendSum + dianzhongexpendSum + fanqiemianfeiexpendSum + meiguangexpendSum + chumoexpendSum) * 1.045);
                        } else if (index === 28) {
                            sums[index] = this.fixed2(zongmarginSum);
                        }
                    } else {
                        if (index === 0) {
                            sums[index] = '合计';
                        } else if (index === 7) {
                            sums[index] = this.fixed2(fanqiedouxiaoexpendSum);
                        } else if (index === 8) {
                            sums[index] = this.fixed2(fanqiedouxiaorechargeSum);
                        } else if (index === 9) {
                            sums[index] = this.fixed(fanqiedouxiaorechargeSum / fanqiedouxiaoexpendSum * 1.045);
                        } else if (index === 10) {
                            sums[index] = this.fixed2(fanqiedouxiaomarginSum);
                        }else if (index === 11) {
                            sums[index] = this.fixed2(fanqiedouxiaoprofitSum);
                        }  else if (index === 12) {
                            sums[index] = this.fixed2(fanqieweixiaoexpendSum);
                        } else if (index === 13) {
                            sums[index] = this.fixed2(fanqieweixiaorechargeSum);
                        }else if (index === 14) {
                            sums[index] = this.fixed(fanqieweixiaorechargeSum / fanqieweixiaoexpendSum * 1.045);
                        } else if (index === 15) {
                            sums[index] = this.fixed2(fanqieweixiaomarginSum);
                        }  else if (index === 16) {
                            sums[index] = this.fixed2(fanqieweixiaoprofitSum);
                        }  else if (index === 17) {
                            sums[index] = this.fixed2(fanqiemianfeiexpendSum);
                        } else if (index === 18) {
                            sums[index] = this.fixed2(fanqiemianfeirechargeSum);
                        }else if (index === 19) {
                            sums[index] = this.fixed(fanqiemianfeirechargeSum / fanqiemianfeiexpendSum * 1.045);
                        } else if (index === 20) {
                            sums[index] = this.fixed2(fanqiemianfeimarginSum);
                        }  else if (index === 21) {
                            sums[index] = this.fixed2(fanqiemianfeiprofitSum);
                        } else if (index === 22) {
                            sums[index] = this.fixed2(dianzhongexpendSum);
                        } else if (index === 23) {
                            sums[index] = this.fixed2(dianzhongrechargeSum);
                        }else if (index === 24) {
                            sums[index] = this.fixed(dianzhongrechargeSum / dianzhongexpendSum * 1.045);
                        } else if (index === 25) {
                            sums[index] = this.fixed2(dianzhongmarginSum);
                        } else if (index === 26) {
                            sums[index] = this.fixed2(dianzhongprofitSum);
                        } else if (index === 27) {
                            sums[index] = this.fixed2(meiguangexpendSum);
                        } else if (index === 28) {
                            sums[index] = this.fixed2(meiguangrechargeSum);
                        }else if (index === 29) {
                            sums[index] = this.fixed(meiguangrechargeSum / meiguangexpendSum * 1.045);
                        } else if (index === 30) {
                            sums[index] = this.fixed2(meiguangmarginSum);
                        } else if (index === 31) {
                            sums[index] = this.fixed2(meiguangprofitSum);
                        } else if (index === 32) {
                            sums[index] = this.fixed2(chumoexpendSum);
                        } else if (index === 33) {
                            sums[index] = this.fixed2(chumorechargeSum);
                        }else if (index === 34) {
                            sums[index] = this.fixed(chumorechargeSum / chumoexpendSum * 1.045);
                        } else if (index === 35) {
                            sums[index] = this.fixed2(chumomarginSum);
                        } else if (index === 36) {
                            sums[index] = this.fixed2(chumoprofitSum);
                        } else if (index === 37) {
                            sums[index] = this.fixed2(fanqiedouxiaoexpendSum + fanqieweixiaoexpendSum + dianzhongexpendSum + fanqiemianfeiexpendSum + meiguangrechargeSum + chumorechargeSum);
                        } else if (index === 38) {
                            sums[index] = this.fixed((fanqiedouxiaorechargeSum + fanqieweixiaorechargeSum + dianzhongrechargeSum + fanqiemianfeirechargeSum + meiguangrechargeSum + chumorechargeSum)
                                / (fanqiedouxiaoexpendSum + fanqieweixiaoexpendSum + dianzhongexpendSum + fanqiemianfeiexpendSum + meiguangexpendSum + chumoexpendSum) * 1.045);
                        } else if (index === 39) {
                            sums[index] = this.fixed2(zongmarginSum);
                        }else if (index === 40) {
                            sums[index] = this.fixed2(zongprofitSum);
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
            cell_style({columnIndex}){
                if (this.user.roleId==2) {
                    if (columnIndex == 3 ||columnIndex == 4 || columnIndex == 5 || columnIndex == 6) {
                        return 'background:rgb(253,217,176);'
                    } else if (columnIndex == 7 ||columnIndex == 8 || columnIndex == 9 || columnIndex == 10) {
                        return 'background:rgb(207,200,221);'
                    }else if (columnIndex == 11 ||columnIndex == 12 || columnIndex == 13 || columnIndex == 14) {
                        return 'background:rgb(239,247,184);'
                    }else if (columnIndex == 15 ||columnIndex == 16 || columnIndex == 17 || columnIndex == 18) {
                        return 'background:rgb(239,147,18);'
                    }else if (columnIndex == 19 ||columnIndex == 20 || columnIndex == 21 || columnIndex == 22) {
                        return 'background:rgb(253,217,176);'
                    }else if (columnIndex == 23 ||columnIndex == 24 || columnIndex == 25 || columnIndex == 26) {
                        return 'background:rgb(239,147,18);'
                    } else if (columnIndex == 27 || columnIndex == 28) {
                        return 'background:rgb(207,200,221);'
                    } else{
                        return 'background:#f2f5fc;'
                    }
                } else {
                    if (columnIndex == 7 ||columnIndex == 8 || columnIndex == 9 || columnIndex == 10 || columnIndex == 11) {
                        return 'background:rgb(253,217,176);'
                    } else if (columnIndex == 12 ||columnIndex == 13 || columnIndex == 14 || columnIndex == 15 || columnIndex == 16) {
                        return 'background:rgb(207,200,221);'
                    }else if (columnIndex == 17 ||columnIndex == 18 || columnIndex == 19 || columnIndex == 20 || columnIndex == 21) {
                        return 'background:rgb(239,247,184);'
                    }else if (columnIndex == 22 ||columnIndex == 23 || columnIndex == 24 || columnIndex == 25 || columnIndex == 26) {
                        return 'background:rgb(239,147,18);'
                    }else if (columnIndex == 27 ||columnIndex == 28 || columnIndex == 29 || columnIndex == 30 || columnIndex == 31) {
                        return 'background:rgb(253,217,176);'
                    }else if (columnIndex == 32 ||columnIndex == 33 || columnIndex == 34 || columnIndex == 35 || columnIndex == 36) {
                        return 'background:rgb(207,200,221);'
                    } else if (columnIndex == 37 ||columnIndex == 38 ||columnIndex == 39 || columnIndex == 40) {
                        return 'background:rgb(219,187,164);'
                    } else{
                        return 'background:#f2f5fc;'
                    }
                }
            },
            resetForm() {
                this.$refs.form.resetFields();
                this.form.id = '';
            },
            del(id){
                this.$axios.get(this.$httpUrl+'/shouzhi/del?id='+id).then(res=>res.data).then(res=>{
                    if(res.code==200){

                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.loadPost()
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }

                })
            },
            mod(row){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    //赋值到表单
                    this.form.id = row.id;
                    this.form.date = row.date;
                    this.form.fanqiedouxiaoexpend = row.fanqiedouxiaoexpend;
                    this.form.fanqieweixiaoexpend = row.fanqieweixiaoexpend;
                    this.form.fanqiemianfeiexpend = row.fanqiemianfeiexpend;
                    this.form.fanqiedouxiaorecharge = row.fanqiedouxiaorecharge;
                    this.form.dianzhongexpend = row.dianzhongexpend;
                    this.form.dianzhongrecharge = row.dianzhongrecharge;
                    this.form.meiguangexpend = row.meiguangexpend;
                    this.form.meiguangrecharge = row.meiguangrecharge;
                    this.form.chumoexpend = row.chumoexpend;
                    this.form.chumorecharge = row.chumorecharge;
                    this.form.fanqieweixiaorecharge = row.fanqieweixiaorecharge;
                    this.form.fanqiemianfeirecharge = row.fanqiemianfeirecharge;
                    this.form.creater = row.creater;
                })
                this.modRow = row;
            },
            add(){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    this.resetForm();
                })

            },
            dealRoi(date){
                let fanqiedouxiaomarginRat = 0;
                let fanqiedouxiaoprofitRat = 0;
                if (new Date(date).getTime() > new Date("2024-07-01").getTime()) {
                    fanqiedouxiaomarginRat = 0.83;
                    fanqiedouxiaoprofitRat = 0.89;
                } else {
                    fanqiedouxiaomarginRat = 0.89;
                    fanqiedouxiaoprofitRat = 0.94;
                }

                let fanqiemianfeimarginRat = 0;
                let fanqiemianfeiprofitRat = 0;
                if (new Date(date).getTime() > new Date("2024-10-01").getTime()) {
                    fanqiemianfeimarginRat = 0.85;
                    fanqiemianfeiprofitRat = 0.89;
                } else {
                    fanqiemianfeimarginRat = 0.89;
                    fanqiemianfeiprofitRat = 0.94;
                }

                if (this.form.fanqiedouxiaoexpend) {
                    this.form.fanqiedouxiaoroi = this.fixed(this.form.fanqiedouxiaorecharge/this.form.fanqiedouxiaoexpend * 1.045);
                    this.form.fanqiedouxiaomargin = this.fixed2(this.form.fanqiedouxiaorecharge * fanqiedouxiaomarginRat - this.form.fanqiedouxiaoexpend / 1.045);
                    this.form.fanqiedouxiaoprofit = this.fixed2(this.form.fanqiedouxiaorecharge * fanqiedouxiaoprofitRat - this.form.fanqiedouxiaoexpend / 1.025);
                } else {
                    this.form.fanqiedouxiaoroi =0;
                    this.form.fanqiedouxiaomargin =0;
                    this.form.fanqiedouxiaoprofit =0;
                }
                if (this.form.dianzhongexpend) {
                    this.form.dianzhongroi = this.fixed(this.form.dianzhongrecharge/this.form.dianzhongexpend * 1.045);
                    this.form.dianzhongmargin = this.fixed2(this.form.dianzhongrecharge * 0.8 - this.form.dianzhongexpend / 1.045);
                    this.form.dianzhongprofit = this.fixed2(this.form.dianzhongrecharge * 0.85 - this.form.dianzhongexpend / 1.025);
                } else {
                    this.form.dianzhongroi = 0;
                    this.form.dianzhongmargin = 0;
                    this.form.dianzhongprofit = 0;
                }
                if (this.form.fanqieweixiaoexpend) {
                    this.form.fanqieweixiaoroi = this.fixed(this.form.fanqieweixiaorecharge/this.form.fanqieweixiaoexpend * 1.045);
                    this.form.fanqieweixiaomargin = this.fixed2(this.form.fanqieweixiaorecharge * 0.8 - this.form.fanqieweixiaoexpend / 1.045);
                    this.form.fanqieweixiaoprofit = this.fixed2(this.form.fanqieweixiaorecharge * 0.85 - this.form.fanqieweixiaoexpend / 1.025);
                } else {
                    this.form.fanqieweixiaoroi = 0;
                    this.form.fanqieweixiaomargin = 0;
                    this.form.fanqieweixiaoprofit = 0;
                }
                if (this.form.fanqiemianfeiexpend) {
                    this.form.fanqiemianfeiroi = this.fixed(this.form.fanqiemianfeirecharge/this.form.fanqiemianfeiexpend * 1.025);
                    this.form.fanqiemianfeimargin = this.fixed2(this.form.fanqiemianfeirecharge / 0.7 * fanqiemianfeimarginRat - this.form.fanqiemianfeiexpend / 1.025);
                    this.form.fanqiemianfeiprofit = this.fixed2(this.form.fanqiemianfeirecharge / 0.7 * fanqiemianfeiprofitRat - this.form.fanqiemianfeiexpend / 1.025);
                } else {
                    this.form.fanqiemianfeiroi = 0;
                    this.form.fanqiemianfeimargin = 0;
                    this.form.fanqiemianfeiprofit = 0;
                }
                if (this.form.meiguangexpend) {
                    this.form.meiguangroi = this.fixed(this.form.meiguangrecharge/this.form.meiguangexpend * 1.045);
                    this.form.meiguangmargin = this.fixed2(this.form.meiguangrecharge * 0.8 - this.form.meiguangexpend / 1.045);
                    this.form.meiguangprofit = this.fixed2(this.form.meiguangrecharge * 0.85 - this.form.meiguangexpend / 1.025);
                } else {
                    this.form.meiguangroi = 0;
                    this.form.meiguangmargin = 0;
                    this.form.meiguangprofit = 0;
                }
                if (this.form.chumoexpend) {
                    this.form.chumoroi = this.fixed(this.form.chumorecharge/this.form.chumoexpend * 1.045);
                    this.form.chumomargin = this.fixed2(this.form.chumorecharge * 0.8 - this.form.chumoexpend / 1.045);
                    this.form.chumoprofit = this.fixed2(this.form.chumorecharge * 0.85 - this.form.chumoexpend / 1.025);
                } else {
                    this.form.chumoroi = 0;
                    this.form.chumomargin = 0;
                    this.form.chumoprofit = 0;
                }
                if ((this.form.fanqiedouxiaoexpend + this.form.fanqieweixiaoexpend + this.form.dianzhongexpend + this.form.fanqiemianfeiexpend + this.form.meiguangexpend + this.form.chumoexpend) != 0) {
                    this.form.zongroi = this.fixed((this.form.fanqiedouxiaorecharge + this.form.fanqieweixiaorecharge + this.form.dianzhongrecharge + + this.form.fanqiemianfeirecharge + this.form.meiguangrecharge + this.form.chumorecharge)
                        /(this.form.fanqiedouxiaoexpend + this.form.fanqieweixiaoexpend + this.form.dianzhongexpend + this.form.fanqiemianfeiexpend + this.form.meiguangexpend + this.form.chumoexpend) * 1.045)
                    this.form.zongmargin = this.fixed2((this.form.fanqiedouxiaorecharge * fanqiedouxiaomarginRat + this.form.fanqieweixiaorecharge * 0.8 + this.form.dianzhongrecharge * 0.8 + this.form.fanqiemianfeirecharge / 0.7 * fanqiemianfeimarginRat + this.form.meiguangrecharge * 0.8 + this.form.chumorecharge * 0.8)
                        - (this.form.fanqiedouxiaoexpend + this.form.fanqieweixiaoexpend + this.form.dianzhongexpend + this.form.fanqiemianfeiexpend + this.form.meiguangexpend + this.form.chumoexpend) / 1.045)
                    this.form.zongprofit = this.fixed2((this.form.fanqiedouxiaorecharge * fanqiedouxiaoprofitRat + this.form.fanqieweixiaorecharge * 0.85 + this.form.dianzhongrecharge * 0.85 + this.form.fanqiemianfeirecharge / 0.7 * fanqiemianfeiprofitRat + this.form.meiguangrecharge * 0.85 + this.form.chumorecharge * 0.85)
                        - (this.form.fanqiedouxiaoexpend + this.form.fanqieweixiaoexpend + this.form.dianzhongexpend + this.form.fanqiemianfeiexpend + this.form.meiguangexpend + this.form.chumoexpend) / 1.025)
                } else {
                    this.form.zongroi = 0;
                    this.form.zongmargin = 0;
                    this.form.zongprofit = 0;
                }
                this.form.zongexpend = this.form.fanqiedouxiaoexpend + this.form.fanqieweixiaoexpend + this.form.dianzhongexpend + this.form.fanqiemianfeiexpend + this.form.meiguangexpend + this.form.chumoexpend;
            },
            doSave(){
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.$axios.post(this.$httpUrl+'/shouzhi/checkrecord',this.form).then(res=>res.data).then(res=>{
                    if(res.data.length==0){
                        this.dealRoi(this.form.date);
                        this.$axios.post(this.$httpUrl+'/shouzhi/save',this.form).then(res=>res.data).then(res=>{
                            if(res.code==200){
                                this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                                });
                                this.centerDialogVisible = false
                                this.loadPost()
                                this. resetForm()
                            }else{
                                this.$message({
                                    message: '操作失败！',
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        this.$message({
                            message: this.form.date + '已录入数据！',
                            type: 'error'
                        });
                    }

                })
            },
            exportExcel(){
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.$confirm('确定导出？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$axios.request({
                        url:this.$httpUrl+'/shouzhi/export',
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
                second = second > 9 ? second : "0" + second.toString();
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            },
            doMod(){
                this.form.time = this.currentDate();
                this.dealRoi(this.modRow.date);
                this.form.creater = this.modRow.creater;
                this.$axios.post(this.$httpUrl+'/shouzhi/update',this.form).then(res=>res.data).then(res=>{
                    if(res.code==200){

                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.centerDialogVisible = false
                        this.loadPost()
                        this. resetForm()
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }
                })
            },
            save(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if(this.form.id){
                            this.doMod();
                        }else{
                            this.doSave();
                        }
                    } else {
                        return false;
                    }
                });

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
                this.$axios.post(this.$httpUrl+'/shouzhi/listPage',{
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
                        this.tableData=res.data;
                        this.total=res.total;
                    }else{
                        alert('获取数据失败')
                    }
                })
            },
            calculate(miniProgramName) {
                if (!this.form.date) {
                    this.$message({
                        message: '先选择日期！',
                        type: 'info'
                    });
                    return;
                }
                let userName = this.form.creater ? this.form.creater : this.user.name;
                this.$axios.post(this.$httpUrl+'/shouzhi/calculateRecharge',{mini_program_name:miniProgramName, date:this.form.date, user_name: userName})
                    .then(res=>{

                    if(res.status==200){
                        this.$confirm('计算结果为' + res.data + '，是否使用该值？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (miniProgramName === "微信") {
                                this.form.fanqieweixiaorecharge = res.data;
                            } else if(miniProgramName === "抖音") {
                                this.form.fanqiedouxiaorecharge = res.data;
                            } else if(miniProgramName === "免费") {
                                this.form.fanqiemianfeirecharge = res.data;
                            }
                        }).catch(() => {

                        })
                    }
                })
            },
            calculateExpend(miniProgramName) {
                if (!this.form.date) {
                    this.$message({
                        message: '先选择日期！',
                        type: 'info'
                    });
                    return;
                }
                let userName = this.form.creater ? this.form.creater : this.user.name;
                this.$axios.post(this.$httpUrl+'/advertiser/calculateExpend',{mini_program_name:miniProgramName, date:this.form.date, user_name: userName})
                    .then(res=>{
                        if(res.status==200){
                            this.$confirm('计算结果为' + res.data + '，是否使用该值？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                if (miniProgramName === "微信") {
                                    this.form.fanqieweixiaoexpend = res.data;
                                } else if(miniProgramName === "抖音") {
                                    this.form.fanqiedouxiaoexpend = res.data;
                                } else if(miniProgramName === "免费") {
                                    this.form.fanqiemianfeiexpend = res.data;
                                }
                            }).catch(() => {

                            })
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
            this.loadPost();
            this.getInputInfo();
        }
    }
</script>

<style scoped>

</style>
