<template>
    <div style="height:100%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="账户" name="automation_promotion">
                <div style="margin-bottom: 5px;">
                    <el-form ref="form1" :model="form1" label-width="75px">
                        <el-col :span="4">
                            <el-form-item label="起止日期" prop="creater">
                                <el-date-picker type="date" placeholder="起始时间" v-model="form1.date1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                                <el-date-picker type="date" placeholder="结束时间" v-model="form1.date2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="3">
                            <el-form-item v-show="user.roleId!=2" label="记录人" prop="creater">
                                <el-input v-model="form1.creater" clearable placeholder="请输入账户名或ID" style="width: 170px;" @keyup.enter.native="loadPost1">
                                </el-input>
                            </el-form-item>
                        </el-col>

                    </el-form>


                    <el-button type="primary" style="margin-left: 5px;" @click="loadPost1">查询</el-button>

                    <el-button type="primary" style="float: right" @click="add" >创建广告</el-button>
                </div>
                <el-table :data="autoPromotionTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="promotion_id" label="账户ID" width="150" fixed="left"></el-table-column>
                    <el-table-column prop="promotion_name" label="账户名称" width="400" fixed="left"></el-table-column>
                    <el-table-column prop="media_source" label="小程序" width="100" fixed="left"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="200" :sortable="true"></el-table-column>
                    <el-table-column prop="creater" label="创建人" width="150" :sortable="true"></el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="pageNum1"
                        :page-sizes="[10, 20, 50, 1000]"
                        :page-size="pageSize1"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total1">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="项目" name="jlproject">
                <div style="margin-bottom: 5px;">
                    <el-form ref="form1" :model="form1" label-width="75px">
                        <el-col :span="4">
                            <el-form-item label="起止日期" prop="creater">
                                <el-date-picker type="date" placeholder="起始时间" v-model="form1.date1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                                <el-date-picker type="date" placeholder="结束时间" v-model="form1.date2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item v-show="user.roleId!=2" label="记录人" prop="creater">
                                <el-input v-model="form1.creater"  clearable placeholder="请输入项目名或ID" style="width: 170px;" @keyup.enter.native="loadPost2">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>

                    <el-button type="primary" style="margin-left: 5px;" @click="loadPost2">查询</el-button>
                    <el-button type="primary" style="float: right" @click="add" >创建广告</el-button>
                </div>
                <el-table :data="jlprojectTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="project_id" label="项目ID" width="200" fixed="left"></el-table-column>
                    <el-table-column prop="name" label="项目名称" width="300" fixed="left"></el-table-column>
                    <el-table-column prop="advertiser_id" label="账户ID" width="150" fixed="left"></el-table-column>
                    <el-table-column prop="bid_strategy" label="出价策略" width="200" fixed="left"></el-table-column>
                    <el-table-column prop="time" label="创建时间" width="200" :sortable="true"></el-table-column>
                    <el-table-column prop="creater" label="创建人" width="150" :sortable="true"></el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="pageNum2"
                        :page-sizes="[10, 20, 50, 1000]"
                        :page-size="pageSize2"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total2">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="广告" name="jlpromotion">
                <div style="margin-bottom: 5px;">

                    <el-form ref="form1" :model="form1" label-width="75px">
                        <el-col :span="4">
                            <el-form-item label="起止日期" prop="creater">
                                <el-date-picker type="date" placeholder="起始时间" v-model="form1.date1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                                <el-date-picker type="date" placeholder="结束时间" v-model="form1.date2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="3">
                            <el-form-item v-show="user.roleId!=2" label="记录人" prop="creater">
                                <el-input v-model="form1.creater"  clearable placeholder="请输入广告名或ID" style="width: 170px;" @keyup.enter.native="loadPost3">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>

                    <el-button type="primary" style="margin-left: 5px;" @click="loadPost3">查询</el-button>

                    <el-button type="primary" style="float: right" @click="add" >创建广告</el-button>
                </div>
                <el-table :data="jlpromotionTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="promotion_id" label="广告ID" width="200"></el-table-column>
                    <el-table-column prop="name" label="广告名" width="300" fixed="left"></el-table-column>
                    <el-table-column prop="advertiser_id" label="账户ID" width="150" fixed="left"></el-table-column>
                    <el-table-column prop="project_id" label="项目ID" width="200" fixed="left"></el-table-column>
                    <el-table-column prop="external_url_material_list" label="落地页链接素材" width="300" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="time" label="创建时间" width="200" :sortable="true"></el-table-column>
                    <el-table-column prop="creater" label="创建人" width="150" :sortable="true" ></el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :current-page="pageNum3"
                        :page-sizes="[10, 20, 50, 1000]"
                        :page-size="pageSize3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total3">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="650px"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="140px">
                <el-col :span="24">
                    <el-form-item label="投放载体" prop="radio">
                        <el-radio v-model="form.radio" label="1" border size="mini">抖音小程序</el-radio>
                        <el-radio v-model="form.radio" label="4" border size="mini">微信小程序</el-radio>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="出价策略" prop="bid_strategy">
                        <el-select style="width: 400px;"
                                   v-model="form.bid_strategy"  multiple>
                            <el-option
                                    v-for="item in bid_strategys"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="账户ID" prop="advertiser_ids">
                        <el-select style="width: 400px;" @change="advertiserIdChange"
                                   v-model="form.advertiser_ids" filterable allow-create multiple
                                   default-first-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="番茄短剧ID" prop="video_id">
                        <el-input v-model="form.video_id" style="width: 400px;" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="创建项目个数" prop="project_number">
                        <el-input-number v-model="form.project_number" :step="1" :min="0" style="width: 400px;"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="创建广告个数" prop="jlpromotion_number">
                        <el-input-number v-model="form.jlpromotion_number" :step="1" :min="0" style="width: 400px;"
                                         @change="jlpromotionNumberChange"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="24" v-show="form.jlpromotion_number != 0">
                    <el-form-item label="选择视频:" prop="jlpromotion">
                    </el-form-item>
                </el-col>

                <el-col :span="24" v-for="(index) in form.jlpromotion_number" :key="index" style="margin-left:50px ">
                    <el-form-item :label="`广告${index}`" :prop="'promotion' + index"
                                  :rules="{required: true, trigger: 'change'}">
                        <el-select style="width: 350px;" v-model="form['promotion' + index]"
                                   multiple filterable>
                            <el-option
                                    v-for="item in videoList"
                                    :key="item.id"
                                    :label="item.filename"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="微信落地页链接" v-if="form.radio=='4'" prop="external_url_material_list">
                        <el-select style="width: 400px;"
                                v-model="form.external_url_material_list" multiple filterable allow-create
                                default-first-option>
                            <el-option
                                    v-for="item in external_url_material_list"
                                    :key="item.url"
                                    :label="item.lable"
                                    :value="item.url">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="抖音小程序资产id" v-if="form.radio=='1'" prop="byte_micro_app_instance_id">
                        <el-input v-model="form.byte_micro_app_instance_id" style="width: 400px;" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="微信小程序资产id" v-if="form.radio=='4'" prop="wechat_micro_app_instance_id">
                        <el-input v-model="form.wechat_micro_app_instance_id" style="width: 400px;" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { Loading } from 'element-ui';

    export default {
        name: "JlPromotionManage",
        data() {
            let checkAdvertiserId = (rule, value, callback) => {
                if (value.length > 10) {
                    return callback(new Error('账户ID信息个数不能超过10个！'));
                }
                for (const va of value) {
                    if (va.length!=16) {
                        return callback(new Error('账户ID错误！'));
                    }
                }
                if (this.form.bid_strategy.length != this.form.advertiser_ids.length) {
                    return callback(new Error('账户ID个数与出价策略个数必须一致！'));
                }
                callback();
            };
            let numberCheck  = (rule, value, callback) => {
                    if (value <= 0) {
                        return callback(new Error('个数必须大于1！'));
                    }
                callback();
            };
            // let bidCheck  = (rule, value, callback) => {
            //     if (this.form.bid_strategy.length != this.form.advertiser_ids.length) {
            //         return callback(new Error('账户ID个数与出价策略个数必须一致！'));
            //     }
            //     callback();
            // };
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                question:'问题',
                formAiAsk:{ask:''},
                aiAskDialogVisible:false,
                aiAnswerDialogVisible:false,
                aiAnswer:'',


                activeName: 'automation_promotion',
                creater:{creater: JSON.parse(sessionStorage.getItem('CurUser')).name},
                uploadDialogVisible:false,
                fileList: {},
                uploadUrl : this.$httpUrl+'/jlaccount/upload',
                videoList: [],
                titleOptions:['titletitletitle','title1title1title1'],
                call_to_action_buttons: [],
                external_url_material_list: [],
                product_info_selling_points: [],
                autoPromotionTableData: [],
                jlprojectTableData: [],
                jlpromotionTableData: [],
                pageSize1:10,
                pageNum1:1,
                total1:0,
                pageSize2:10,
                pageNum2:1,
                total2:0,
                pageSize3:10,
                pageNum3:1,
                total3:0,
                name:'',
                centerDialogVisible:false,
                formVideo:{

                },

                form:{
                    radio:'1',
                    id:'',
                    advertiser_ids:[],
                    bid_strategy:[],
                    video_id:'',
                    jlpromotion_number:0,
                    project_number:0,
                    external_url_material_list:[],
                    wechat_micro_app_instance_id:'',
                    byte_micro_app_instance_id:'',
                    time : '',
                    creater : '',
                    jlaccount : '',
                    distributorId_w: '',
                    distributorId_b: '',
                    promotion1:[],
                    promotion2:[],
                    promotion3:[],
                    promotion4:[],
                    promotion5:[],
                    promotion6:[],
                    promotion7:[],
                    promotion8:[],
                    promotion9:[],
                    promotion10:[]
                },
                bid_strategys:[
                    '3块9解锁',
                    '5块9解锁',
                    '9块9解锁',
                    '39块解锁',
                    '188块解锁'
                ],
                formVideoValue: [],
                tomatoForm: {

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
                    advertiser_ids: [
                        {required: true, trigger: 'blur'},
                        {validator: checkAdvertiserId,trigger: 'change'},
                    ],
                    bid_strategy: [
                        {required: true, trigger: 'blur'},
                        // {validator: bidCheck,trigger: 'change'},
                    ],
                    video_id: [
                        {required: true, trigger: 'blur'},
                    ],
                    project_number: [
                        {required: true, trigger: 'blur'},
                        {validator: numberCheck,trigger: 'change'},
                    ],
                    jlpromotion_number: [
                        {required: true, trigger: 'blur'},
                        {validator: numberCheck,trigger: 'change'},
                    ],
                    external_url_material_list: [
                        {required: true, trigger: 'blur'},
                    ],
                    byte_micro_app_instance_id: [
                        {required: true, trigger: 'blur'},
                    ],
                    wechat_micro_app_instance_id: [
                        {required: true, trigger: 'blur'},
                    ]
                },

                users:[],
                roles:[],
                modRow: {}
            }
        },
        methods:{
            showUpload() {
                this.uploadDialogVisible = true;
                this.fileList = [];
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            jlpromotionNumberChange(row){
                let newVal = {ids:[], ind:row}
                this.formVideoValue.push(newVal);
                this.formVideoValue = this.formVideoValue.slice(0, row);
            },
            advertiserIdChange(row){
                if (row && row[0] && row[0].length==16) {
                    this.$axios.post(this.$httpUrl+'/jlaccount/getVideoList',{advertiser_id: row[0], jlaccount : this.user.jlaccount}).then(res=>res.data).then(res=>{
                        if(res.code==200){
                            this.videoList = res.data;
                        }else{
                            this.$message({
                                message: '操作失败！',
                                type: 'error'
                            });
                        }
                    })
                    this.$axios.post(this.$httpUrl+'/jlaccount/getAdvertiserInfo',{advertiser_id: row[row.length-1], jlaccount : this.user.jlaccount}).then(res=>res.data).then(res=>{
                        if(res.code==200){
                            this.$message({
                                message: '账户' + row[row.length-1]+ "的名字为：" + res.data.name + "，请检查账户与出价策略是否匹配。",
                                type: 'info'
                            });
                        }else{
                            this.$message({
                                message: '操作失败！',
                                type: 'error'
                            });
                        }
                    })
                }
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
            aiAnswerClose() {

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
            mod(row){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    //赋值到表单
                    this.form.id = row.id;
                    this.form.date = row.date;
                    this.form.dianzhongexpend = row.dianzhongexpend;
                    this.form.dianzhongrecharge = row.dianzhongrecharge;
                    this.form.heiyanexpend = row.heiyanexpend;
                    this.form.heiyanrecharge = row.heiyanrecharge;
                    this.form.fanqieexpend = row.fanqieexpend;
                    this.form.fanqierecharge = row.fanqierecharge;
                    this.form.qimaoexpend = row.qimaoexpend;
                    this.form.qimaorecharge = row.qimaorecharge;
                })
                this.modRow = row;
            },
            add(){
                this.centerDialogVisible = true
            },
            doSave(){
                let loadingInstance = Loading.service({ fullscreen: true, text: '创建广告中，请稍等！',  });
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.form.distributorId_w = this.user.distributor_w;
                this.form.distributorId_b = this.user.distributor_b;
                this.form.jlaccount = this.user.jlaccount;
                // this.$axios.post(this.$httpUrl+'/jlaccount/checkrecord',this.form).then(res=>res.data).then(res=>{
                //     if(res.data.length==0){
                        this.$axios.post(this.$httpUrl+'/jlaccount/autoCreatePromotion',this.form).then(res=>res.data).then(res=>{
                            if(res.data.message=='OK'){
                                this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                                });
                                this.centerDialogVisible = false
                                this.loadPost1()
                                this.activeName= 'automation_promotion',
                                this. resetForm();
                            }else{
                                this.$message({
                                    message: '创建失败！',
                                    type: 'error'
                                });
                            }
                            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                loadingInstance.close();
                            });
                        })
                //     }else{
                //         this.$message({
                //             message: this.form.date + '已录入数据！',
                //             type: 'error'
                //         });
                //     }
                // })
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
                        url:this.$httpUrl+'/novel/export',
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
                    tableName: 'novel',
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
                        tableName: 'novel'
                    })
                }
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

            save(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.doSave();
                    } else {
                        return false;
                    }
                });

            },
            handleSizeChange1(val) {
                this.pageNum1=1
                this.pageSize1=val
                this.loadPost1()
            },
            handleCurrentChange1(val) {
                this.pageNum1=val;
                this.loadPost1();
            },
            handleSizeChange2(val) {
                this.pageNum2=1
                this.pageSize2=val
                this.loadPost2()
            },
            handleCurrentChange2(val) {
                this.pageNum2=val;
                this.loadPost2();
            },
            handleSizeChange3(val) {
                this.pageNum3=1
                this.pageSize3=val
                this.loadPost3()
            },
            handleCurrentChange3(val) {
                this.pageNum3=val;
                this.loadPost3();
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
            loadPost1(){
                this.$axios.post(this.$httpUrl+'/jlaccount/listPageAutoPromotion',{
                    pageSize:this.pageSize1,
                    pageNum:this.pageNum1,
                    param:{
                        date1:this.form1.date1,
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        console.log(res.total)
                        this.autoPromotionTableData=res.data
                        this.total1=res.total
                    }else{
                        alert('获取数据失败')
                    }
                })
            },
            loadPost2(){
                this.$axios.post(this.$httpUrl+'/jlaccount/listPageProject',{
                    pageSize:this.pageSize2,
                    pageNum:this.pageNum2,
                    param:{
                        date1:this.form1.date1,
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.jlprojectTableData=res.data
                        this.total2=res.total
                    }else{
                        alert('获取数据失败')
                    }

                })
            },
            loadPost3(){
                this.$axios.post(this.$httpUrl+'/jlaccount/listPagePromotion',{
                    pageSize:this.pageSize3,
                    pageNum:this.pageNum3,
                    param:{
                        date1:this.form1.date1,
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.jlpromotionTableData=res.data
                        this.total3=res.total
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
            this.loadPost1()
            this.loadPost2()
            this.loadPost3()
            this.getInputInfo();
        }
    }
</script>

<style scoped>

</style>
