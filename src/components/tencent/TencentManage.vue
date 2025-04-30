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
                    <el-form-item label="入职时间" prop="creater" v-show="user.roleId!=2">
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

            <el-table-column prop="fanqiemianfeiexpend" label="番茄免费消耗" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeirecharge" label="番茄免费充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeiroi" label="番茄免费ROI" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeimargin" label="番茄免费盈亏" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiemianfeiprofit" label="番茄免费毛利" width="100" :sortable="true" v-if="user.roleId!=2"></el-table-column>

            <el-table-column prop="fanqiefufeiexpend" label="番茄付费消耗" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiefufeirecharge" label="番茄付费充值" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiefufeiroi" label="番茄付费ROI" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiefufeimargin" label="番茄付费盈亏" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="fanqiefufeiprofit" label="番茄付费毛利" width="100" :sortable="true" v-if="user.roleId!=2"></el-table-column>

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
                    <el-form-item label="番茄免费消耗" prop="fanqiemianfeiexpend">
                            <el-input-number v-model="form.fanqiemianfeiexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄免费充值" prop="fanqiemianfeirecharge">
                        <el-input-number v-model="form.fanqiemianfeirecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄付费消耗" prop="fanqiefufeiexpend">
                        <el-input-number v-model="form.fanqiefufeiexpend" :precision="2" :step="0.01" :min="0.00"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="番茄付费充值" prop="fanqiefufeirecharge">
                        <el-input-number v-model="form.fanqiefufeirecharge" :precision="2" :step="0.01" :min="0.00"></el-input-number>
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
        name: "TencentManage",
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
                    fanqiemianfeiexpend: 0,
                    fanqiemianfeirecharge: 0,
                    fanqiemianfeiroi: 0,
                    fanqiemianfeiprofit: 0,
                    fanqiemianfeimargin: 0,
                    fanqiefufeiexpend: 0,
                    fanqiefufeirecharge: 0,
                    fanqiefufeiroi: 0,
                    fanqiefufeiprofit: 0,
                    fanqiefufeimargin: 0,
                    zongmargin: 0,
                    zongexpend: 0,
                    zongroi: 0,
                    zongprofit: 0,
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
                    ask: this.formAiAsk.ask,
                    tableName: 'tencent',
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
                        tableName: 'tencent'
                    })
                }
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                var fanqiemianfeiexpendSum = 0;
                var fanqiemianfeirechargeSum = 0;
                var fanqiemianfeimarginSum = 0;
                var fanqiemianfeiprofitSum = 0;

                var fanqiefufeiexpendSum = 0;
                var fanqiefufeirechargeSum = 0;
                var fanqiefufeimarginSum = 0;
                var fanqiefufeiprofitSum = 0;

                var zongmarginSum = 0;
                var zongprofitSum = 0;
                for (var val of data) {
                    fanqiemianfeiexpendSum += val.fanqiemianfeiexpend;
                    fanqiemianfeirechargeSum += val.fanqiemianfeirecharge;
                    fanqiemianfeimarginSum += val.fanqiemianfeimargin;
                    fanqiemianfeiprofitSum += val.fanqiemianfeiprofit;

                    fanqiefufeiexpendSum += val.fanqiefufeiexpend;
                    fanqiefufeirechargeSum += val.fanqiefufeirecharge;
                    fanqiefufeimarginSum += val.fanqiefufeimargin;
                    fanqiefufeiprofitSum += val.fanqiefufeiprofit;

                    zongmarginSum += val.zongmargin;
                    zongprofitSum += val.zongprofit;
                }
                columns.forEach((column, index) => {
                    if (this.user.roleId==2) {
                        if (index === 0) {
                            sums[index] = '合计';
                        } else if (index === 3) {
                            sums[index] = this.fixed2(fanqiemianfeiexpendSum);
                        } else if (index === 4) {
                            sums[index] = this.fixed2(fanqiemianfeirechargeSum);
                        } else if (index === 5) {
                            sums[index] = this.fixed(fanqiemianfeirechargeSum / fanqiemianfeiexpendSum * (0.92*0.7 +0.2)/(0.7+0.035));
                        } else if (index === 6) {
                            sums[index] = this.fixed2(fanqiemianfeimarginSum);
                        } else if (index === 7) {
                            sums[index] = this.fixed2(fanqiefufeiexpendSum);
                        } else if (index === 8) {
                            sums[index] = this.fixed2(fanqiefufeirechargeSum);
                        }else if (index === 9) {
                            sums[index] = this.fixed(fanqiefufeirechargeSum / fanqiefufeiexpendSum);
                        } else if (index === 10) {
                            sums[index] = this.fixed2(fanqiefufeimarginSum);
                        } else if (index === 11) {
                            sums[index] = this.fixed((fanqiemianfeirechargeSum + fanqiefufeirechargeSum)
                                / (fanqiemianfeiexpendSum + fanqiefufeiexpendSum));
                        } else if (index === 12) {
                            sums[index] = this.fixed2(zongmarginSum);
                        }
                    } else {
                        if (index === 0) {
                            sums[index] = '合计';
                        } else if (index === 7) {
                            sums[index] = this.fixed2(fanqiemianfeiexpendSum);
                        } else if (index === 8) {
                            sums[index] = this.fixed2(fanqiemianfeirechargeSum);
                        } else if (index === 9) {
                            sums[index] = this.fixed(fanqiemianfeirechargeSum / fanqiemianfeiexpendSum);
                        } else if (index === 10) {
                            sums[index] = this.fixed2(fanqiemianfeimarginSum);
                        }else if (index === 11) {
                            sums[index] = this.fixed2(fanqiemianfeiprofitSum);
                        }  else if (index === 12) {
                            sums[index] = this.fixed2(fanqiefufeiexpendSum);
                        } else if (index === 13) {
                            sums[index] = this.fixed2(fanqiefufeirechargeSum);
                        }else if (index === 14) {
                            sums[index] = this.fixed(fanqiefufeirechargeSum * 0.85 / fanqiefufeiexpendSum / 1.035);
                        } else if (index === 15) {
                            sums[index] = this.fixed2(fanqiefufeimarginSum);
                        }  else if (index === 16) {
                            sums[index] = this.fixed2(fanqiefufeiprofitSum);
                        } else if (index === 17) {
                            sums[index] = this.fixed2(fanqiemianfeiexpendSum + fanqiefufeiexpendSum);
                        } else if (index === 18) {
                            sums[index] = this.fixed((fanqiemianfeirechargeSum + fanqiefufeirechargeSum)
                                / (fanqiemianfeiexpendSum + fanqiefufeiexpendSum));
                        } else if (index === 19) {
                            sums[index] = this.fixed2(zongmarginSum);
                        }else if (index === 20) {
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
                        return 'background:rgb(239,147,18);'
                    } else if (columnIndex == 11 || columnIndex == 12) {
                        return 'background:rgb(207,200,221);'
                    } else{
                        return 'background:#f2f5fc;'
                    }
                } else {
                    if (columnIndex == 7 ||columnIndex == 8 || columnIndex == 9 || columnIndex == 10 || columnIndex == 11) {
                        return 'background:rgb(253,217,176);'
                    } else if (columnIndex == 12 ||columnIndex == 13 || columnIndex == 14 || columnIndex == 15 || columnIndex == 16) {
                        return 'background:rgb(239,147,18);'
                    } else if (columnIndex == 17 ||columnIndex == 18 ||columnIndex == 19 || columnIndex == 20) {
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
                this.$axios.get(this.$httpUrl+'/tencent/del?id='+id).then(res=>res.data).then(res=>{
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
                    this.form.fanqiemianfeiexpend = row.fanqiemianfeiexpend;
                    this.form.fanqiemianfeirecharge = row.fanqiemianfeirecharge;
                    this.form.fanqiefufeiexpend = row.fanqiefufeiexpend;
                    this.form.fanqiefufeirecharge = row.fanqiefufeirecharge;
                })
                this.modRow = row;
            },
            add(){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    this.resetForm();
                })

            },
            dealRoi(){
                if (this.form.fanqiemianfeiexpend) {
                    this.form.fanqiemianfeiroi = this.fixed(this.form.fanqiemianfeirecharge/this.form.fanqiemianfeiexpend);
                    this.form.fanqiemianfeimargin = this.fixed2((this.form.fanqiemianfeirecharge * (this.form.fanqiemianfeirecharge / this.form.fanqiemianfeiexpend) *(0.92*0.7 +0.2)/(0.7+0.035)) - this.form.fanqiemianfeirecharge);
                    this.form.fanqiemianfeiprofit = this.fixed2((this.form.fanqiemianfeirecharge * (this.form.fanqiemianfeirecharge / this.form.fanqiemianfeiexpend) *(0.92*0.7 +0.2)/(0.7+0.035)) - this.form.fanqiemianfeirecharge);
                } else {
                    this.form.fanqiemianfeiroi = 0;
                    this.form.fanqiemianfeimargin = 0;
                    this.form.fanqiemianfeiprofit = 0;
                }
                if (this.form.fanqiefufeiexpend) {
                    this.form.fanqiefufeiroi = this.fixed(this.form.fanqiefufeirecharge/this.form.fanqiefufeiexpend);
                    this.form.fanqiefufeimargin = this.fixed2(this.form.fanqiefufeirecharge * 0.85 - this.form.fanqiefufeiexpend / 1.035);
                    this.form.fanqiefufeiprofit = this.fixed2(this.form.fanqiefufeirecharge * 0.85 - this.form.fanqiefufeiexpend / 1.035);
                } else {
                    this.form.fanqiefufeiroi = 0;
                    this.form.fanqiefufeimargin = 0;
                    this.form.fanqiefufeiprofit = 0;
                }

                if ((this.form.fanqiemianfeiexpend + this.form.fanqiefufeiexpend) != 0) {
                    this.form.zongroi = this.fixed((this.form.fanqiemianfeirecharge + this.form.fanqiefufeirecharge)
                        /(this.form.fanqiemianfeiexpend + this.form.fanqiefufeiexpend))
                    this.form.zongmargin = Number(this.form.fanqiemianfeimargin) + Number(this.form.fanqiefufeimargin);
                    this.form.zongprofit = Number(this.form.fanqiemianfeiprofit) + Number(this.form.fanqiefufeiprofit);
                } else {
                    this.form.zongroi = 0;
                    this.form.zongmargin = 0;
                    this.form.zongprofit = 0;
                }
                this.form.zongexpend = this.form.fanqiemianfeiexpend + this.form.fanqiefufeiexpend;
            },
            doSave(){
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.$axios.post(this.$httpUrl+'/tencent/checkrecord',this.form).then(res=>res.data).then(res=>{
                    if(res.data.length==0){
                        this.dealRoi();
                        console.log(this.form)
                        this.$axios.post(this.$httpUrl+'/tencent/save',this.form).then(res=>res.data).then(res=>{
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
                        url:this.$httpUrl+'/tencent/export',
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
            doMod(){
                this.form.time = this.currentDate();
                this.dealRoi();
                this.form.creater = this.modRow.creater;
                this.$axios.post(this.$httpUrl+'/tencent/update',this.form).then(res=>res.data).then(res=>{
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
                this.$axios.post(this.$httpUrl+'/tencent/listPage',{
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
