<template>
    <div style="height:100%">
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

            <el-button type="primary" style="float: right" @click="add" v-if="user.batch_permission !='' && user.batch_permission !=null">创建广告</el-button>
        </div>
        <el-table :data="autoPromotionTableData" class="table_class" border style="overflow: auto; " max-height="calc(100% - 200px)">
            <el-table-column prop="subject" label="投放载体" width="100" v-if="user.roleId!=2" :sortable="true">
                <template slot-scope="scope">
                    {{ subjectEnumMap[scope.row.subject] || '' }}
                </template>
            </el-table-column>
            <el-table-column prop="subject" label="投放主体" width="200" :sortable="true"></el-table-column>
            <el-table-column prop="book_name" label="短剧名" width="150" ></el-table-column>
            <el-table-column prop="book_id" label="短剧ID" width="180" ></el-table-column>
            <el-table-column prop="promotion_id_info" label="推广链ID" width="170" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.promotion_id_info}}
                </template>
            </el-table-column>
            <el-table-column prop="promotion_name_info" :show-overflow-tooltip="true" label="推广链名称" width="200" :row-style="{height: '100px'}">
                <template slot-scope="scope">
                    {{ scope.row.promotion_name_info}}
                </template>
            </el-table-column>
            <el-table-column prop="advertiser_id_info" label="账户ID" width="170" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    目标个数:{{ scope.row.advertiser_num}} ;成功个数:{{ scope.row.advertiser_id_info.length }}:{{ scope.row.advertiser_id_info}}
                </template>
            </el-table-column>
            <el-table-column prop="project_info" label="项目ID" width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    目标个数:{{ scope.row.project_num}} ;成功个数:{{ scope.row.project_info.length }}:{{ scope.row.project_info}}
                </template>
            </el-table-column>
            <el-table-column prop="advertising_info" label="广告ID" width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    目标个数:{{ scope.row.advertising_num}} ;成功个数:{{ scope.row.advertising_info.length }}:{{ scope.row.advertising_info}}
                </template>
            </el-table-column>
            <el-table-column prop="error_info" label="错误信息" width="300" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.error_info}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="任务状态" width="100" title="完成后，是否成功看创建数量">
                <template slot-scope="scope">
                    {{ statusEnumMap[scope.row.status] || '异常' }}
                </template>
            </el-table-column>
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

        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="650px" :close-on-click-modal="false"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="140px">
                <el-col :span="24">
                    <el-form-item label="投放载体" prop="radio">
                        <el-radio v-model="form.radio" label="1" v-if="user.batch_permission =='d'" border size="mini">抖音小程序</el-radio>
<!--                        <el-radio v-model="form.radio" label="4" border size="mini">微信小程序</el-radio>-->
                        <el-radio v-model="form.radio" label="7" v-if="user.batch_permission =='f'" border size="mini">抖音小程序免费</el-radio>
                    </el-form-item>
                </el-col>

                <el-col :span="24" v-if="user.batch_permission =='d'">
                    <el-form-item label="投放主体" prop="subject">
                        <el-select style="width: 400px;" @change="subjectChange"
                                   v-model="form.subject"  multiple>
                            <el-option
                                    v-for="item in subjects"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24" v-if="user.batch_permission =='f'">
                    <el-form-item label="投放主体" prop="subject">
                        <el-select style="width: 400px;" @change="subjectChange"
                                   v-model="form.subject">
                            <el-option
                                    v-for="item in subjects"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="出价策略" prop="bid_strategy">
                        <el-select style="width: 400px;" @change="strategyChange"
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

                <span v-for="(inde) in form.subject.length" :key="inde">

                    <el-col :span="24" style="margin-left:50px ">
                        <span>{{form.subject[inde-1]}}</span>
                    <el-form-item label="视频账户ID" :prop="'subjectvideo' + inde" :rules="{required: true, trigger: 'change'}">
                        <el-input style="width: 350px;" @change="(value)=>videoAdvertiserIdChanged(value, form.subject[inde-1], inde)"
                                  v-model="form['subjectvideo' + inde]" >
                        </el-input>
                    </el-form-item>
                    </el-col>

                    <el-col :span="24" v-for="(index) in form.bid_strategy.length" :key="index" style="margin-left:50px ">
                        <el-form-item :label="form.bid_strategy[index-1]" :prop="'subject' + inde + 'advertiser_id' +  index"
                                      :rules="{required: true, trigger: 'change'}">
                            <el-input style="width: 350px;" v-model="form['subject' + inde + 'advertiser_id' +  index]"  @change="(value)=>advertiserIdChange(value, form.subject[inde-1], form.bid_strategy[index-1], index, inde)">
                            </el-input>
                        </el-form-item>
                    </el-col>

                </span>


                <el-col :span="24">
                    <el-form-item label="番茄短剧ID" prop="video_id">
                        <el-input v-model="form.video_id" style="width: 400px;" @change="videoChanged"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="创建项目个数" prop="project_number">
                        <el-input-number v-model="form.project_number" step=1 min=1 max=10 style="width: 400px;"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="创建广告个数" prop="jlpromotion_number">
                        <el-input-number v-model="form.jlpromotion_number" step=1 min=1 max=40 style="width: 400px;"
                                         @change="jlpromotionNumberChange"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="24"  >
                    <el-form-item label="选择视频" prop="video_ids" >
                        <el-select style="width: 400px;" v-model="form.video_ids" @focus="videoFocus" :loading = "videoListLoading"
                                   multiple filterable ref="videoSelect">
                            <el-option :label="allValue" :value="allValue" @click.native="selsectAll"></el-option>
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
                    <el-form-item label="使用统一封面" prop="radio">
                        <el-radio v-model="form.cover" label="y" border size="mini">是</el-radio>
                        <el-radio v-model="form.cover" label="n" border size="mini">否</el-radio>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="起始收费剧集" prop="start_chapter">
                        <el-input-number v-model="form.start_chapter" step=1 min=5 max=30 style="width: 400px;"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="落地页链接" prop="external_url_material_list">
                        <el-input style="width: 400px;"
                                v-model="form.external_url_material_list" >
                        </el-input>
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
    // import { Loading } from 'element-ui';

    export default {
        name: "JlPromotionManage",
        data() {
            let numberCheck  = (rule, value, callback) => {
                if (value <= 0) {
                    return callback(new Error('个数必须大于1！'));
                }
                callback();
            };
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                timer:null,
                question:'问题',
                formAiAsk:{ask:''},
                aiAskDialogVisible:false,
                aiAnswerDialogVisible:false,
                aiAnswer:'',
                statusEnumMap: {
                    '1': '等待创建',
                    '2': '创建中',
                    '3': '创建成功',
                    '4': '创建失败'
                },
                subjectEnumMap: {
                    'fqmfduanju06@163.com': '免费',
                    'fqmfduanju05@163.com': '免费',
                    'jtduanju9075@163.com': '抖小',
                    'jtduanju9076@163.com': '抖小',
                    'jtduanju9077@163.com': '抖小',
                },
                creater:{creater: JSON.parse(sessionStorage.getItem('CurUser')).name},
                uploadDialogVisible:false,
                fileList: {},
                videoList: [],
                autoPromotionTableData: [],
                jlprojectTableData: [],
                jlpromotionTableData: [],
                pageSize1:10,
                pageNum1:1,
                total1:0,
                name:'',
                centerDialogVisible:false,
                formVideo:{

                },

                form:{
                    radio:'1',
                    cover:'y',
                    id:'',
                    subject:[],
                    advertiser_id1s:[],
                    advertiser_id2s:[],
                    advertiser_id3s:[],
                    advertiser_id4s:[],
                    bid_strategy:[],
                    video_id:'',
                    book_name:'',
                    video_ids:[],
                    video_list:[],
                    start_chapter:10,
                    jlpromotion_number:1,
                    project_number:1,
                    external_url_material_list:'',
                    wechat_micro_app_instance_id:'',
                    byte_micro_app_instance_id:'',
                    time : '',
                    creater : '',
                    jlaccount : '',
                    distributorId_w: '',
                    distributorId_b: '',
                    distributorId_f: '',
                    advertiser_id1:'',
                    advertiser_id2:'',
                    advertiser_id3:'',
                    advertiser_id4:'',
                    advertiser_id5:'',
                    bid_strategy1:'',
                    bid_strategy2:'',
                    bid_strategy3:'',
                    bid_strategy4:'',
                    bid_strategy5:'',
                    subject1advertiser_id1:'',
                    subject1advertiser_id2:'',
                    subject1advertiser_id3:'',
                    subject1advertiser_id4:'',
                    subject2advertiser_id1:'',
                    subject2advertiser_id2:'',
                    subject2advertiser_id3:'',
                    subject2advertiser_id4:'',
                    subject3advertiser_id1:'',
                    subject3advertiser_id2:'',
                    subject3advertiser_id3:'',
                    subject3advertiser_id4:'',
                    subject4advertiser_id1:'',
                    subject4advertiser_id2:'',
                    subject4advertiser_id3:'',
                    subject4advertiser_id4:'',
                    subjectvideo1:'',
                    subjectvideo2:'',
                    subjectvideo3:'',
                    subjectvideo4:'',
                    error_info:[],
                    project_info:[],
                    advertising_info:[],
                    promotion_id_info:[],
                    promotion_name_info:[],
                    advertiser_id_info:[],
                },
                subjects:JSON.parse(sessionStorage.getItem('CurUser')).jlaccount,
                flag : true,
                videoListLoading: false,
                allValue:'all',
                bid_strategys:[],
                bid_strategys_value:[
                    '抖超小39',
                    '抖超小99',
                    '抖小额',
                    '抖大额'
                ],
                free_bid_strategys_value1:[
                    '新风铭蓝-ROI',
                    '壹号网络-ROI',
                    '厄尔网络-ROI',
                    '天野网络-ROI'
                ],
                free_bid_strategys_value2:[
                    '超小',
                    '低',
                    'ROI'
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
                    ],
                    start_chapter: [
                        {required: true, trigger: 'blur'},
                    ],
                    video_ids: [
                        {required: true, trigger: 'blur'},
                    ],
                    subject: [
                        {required: true, trigger: 'blur'},
                    ]
                },

                users:[],
                roles:[],
                modRow: {}
            }
        },
        methods:{
            videoFocus() {
                for (const index in this.form.subject) {
                    if (this.validateVideoAdvertiser_id((Number(index)+1))) {return}
                    for (const ind in this.form.bid_strategy) {
                        const res = this.validateAdvertiser_id1('subject' + (Number(index)+1) + 'advertiser_id' + (Number(ind)+1), this.form.bid_strategy[ind]);
                        if (res) {return}
                    }
                }
                this.videoAdvertiserIdChange();
            },
            videoChanged() {
                if (!this.form.video_id) {
                    return;
                }
                this.$axios.post(this.$httpUrl + '/tomato/getVideoInfo', this.form).then(res => res.data).then(res => {
                    if (res.data.book_name) {
                        this.form.book_name = res.data.book_name
                        console.log(res.data)
                    } else {
                        this.$message({
                            message: '找不到该剧信息！',
                            type: 'error'
                        });
                    }
                })
            },
            validateVideoAdvertiser_id(index) {
                this.$refs.form.validateField("subjectvideo" + index, (valid) => {
                    if (valid) {
                        this.$refs.videoSelect.blur();
                        this.$message({
                            message: '请先输入视频账户ID！',
                            type: 'info'
                        });
                        this.flag = true;
                    } else {
                        this.flag = false;
                    }
                });
                return this.flag;
            },
            validateAdvertiser_id1(value1, value2) {
                this.$refs.form.validateField(value1, (valid) => {
                    if (valid) {
                        this.$refs.videoSelect.blur();
                        this.$message({
                            message: '请先输入'+value2+'！',
                            type: 'info'
                        });
                        this.flag = true;
                    } else {
                        this.flag = false;
                    }
                });
                return this.flag;
            },
            selsectAll() {
                this.form.video_ids = this.form.video_list.map(item => item.id)
            },
            jlpromotionNumberChange(row){

                let newVal = {ids:[], ind:row}
                this.formVideoValue.push(newVal);
                this.formVideoValue = this.formVideoValue.slice(0, row);
            },
            videoAdvertiserIdChange() {
                this.videoListLoading = true;
                this.dealAdvertiser_ids();
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.form.jlaccount = this.user.jlaccount;
                this.$axios.post(this.$httpUrl + '/jlaccount/bindVideo', this.form).then(res => res.data).then(res => {
                    if (res.code == 200) {
                        this.allValue = 'all    总计' + res.data.videoSizeMax + '，完成' + res.data.videoSizeMin;
                        this.videoList = res.data.data;
                        this.form.video_list = res.data.data;
                        this.videoListLoading = false;

                    } else {
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }
                })

            },
            subjectChange() {
                let subject = [];
                for (const index in this.subjects) {
                    if (this.form.subject.includes(this.subjects[index])) {
                        subject.push(this.subjects[index])
                    }
                }
                this.form.subject = subject;

                if (this.form.radio=='7') {
                    if (this.form.subject == 'fqmfduanju06@163.com') {
                        this.bid_strategys = this.free_bid_strategys_value1
                    } else {
                        this.bid_strategys = this.free_bid_strategys_value2
                    }
                }
                this.videoListClear();
            },
            strategyChange() {
                let bidStrategy = [];
                for (const index in this.bid_strategys) {
                    if (this.form.bid_strategy.includes(this.bid_strategys[index])) {
                        bidStrategy.push(this.bid_strategys[index])
                    }
                }
                this.form.bid_strategy = bidStrategy;
                this.videoListClear();
            },
            videoListClear() {
                this.form.video_ids = [];
                this.subject1advertiser_id1='';
                this.subject1advertiser_id2='';
                this.subject1advertiser_id3='';
                this.subject1advertiser_id4='';
                this.subject2advertiser_id1='';
                this.subject2advertiser_id2='';
                this.subject2advertiser_id3='';
                this.subject2advertiser_id4='';
                this.subject3advertiser_id1='';
                this.subject3advertiser_id2='';
                this.subject3advertiser_id3='';
                this.subject3advertiser_id4='';
                this.subject4advertiser_id1='';
                this.subject4advertiser_id2='';
                this.subject4advertiser_id3='';
                this.subject4advertiser_id4='';
            },
            radioChange(){
                if (this.user.batch_permission =='d') {
                    this.bid_strategys = this.bid_strategys_value
                    this.form.radio='1'
                } else if (this.user.batch_permission =='f') {
                    this.bid_strategys = this.free_bid_strategys_value1
                    this.form.radio='7'
                }
            },
            advertiserIdChange(row, subject, title, index, inde){
                this.form.video_ids = [];
                if (row && row.length==16) {
                    this.$axios.post(this.$httpUrl+'/jlaccount/getAdvertiserInfo',{advertiser_id: row, jlaccount : subject}).then(res=>res.data).then(res=>{
                        if(!res.data.message){
                            if (res.data.name.indexOf(title) < 0) {
                                this.$message({
                                    message: '账户' + row + "的名字为：" + res.data.name + "，请检查账户与出价策略是否匹配。",
                                    type: 'info'
                                });
                                this.form['subject' + (Number(inde)) + 'advertiser_id' + (Number(index))] = '';
                            }
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                            this.form['subject' + (Number(inde)) + 'advertiser_id' + (Number(index))] = '';
                        }
                    })
                }
            },
            videoAdvertiserIdChanged(row, subject, inde){
                this.form.video_ids = [];
                if (row && row.length==16) {
                    this.$axios.post(this.$httpUrl+'/jlaccount/getAdvertiserInfo',{advertiser_id: row, jlaccount : subject}).then(res=>res.data).then(res=>{
                        if(res.data.message){
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                            this.form['subjectvideo' + (Number(inde))] = '';
                        }
                    })
                }
            },
            dealAdvertiser_ids () {

                this.form.advertiser_id1s = [];
                this.form.advertiser_id2s = [];
                this.form.advertiser_id3s = [];
                this.form.advertiser_id4s = [];
                for (const index in this.form.subject) {
                    for (const ind in this.form.bid_strategy) {
                        this.form['advertiser_id' + (Number(index)+1) + 's'].push(this.form['subject' + (Number(index)+1) + 'advertiser_id' + (Number(ind)+1)]);
                    }
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

            fixed (val) {
                return Number(val).toFixed(4);
            },
            fixed2 (val) {
                return Number(val).toFixed(2);
            },

            resetForm() {
                this.$refs.form.resetFields();
                this.form.id = '';
                this.form.cover = 'y';
                this.form.video_ids = [];
                this.subject1advertiser_id1='';
                this.subject1advertiser_id2='';
                this.subject1advertiser_id3='';
                this.subject1advertiser_id4='';
                this.subject2advertiser_id1='';
                this.subject2advertiser_id2='';
                this.subject2advertiser_id3='';
                this.subject2advertiser_id4='';
                this.subject3advertiser_id1='';
                this.subject3advertiser_id2='';
                this.subject3advertiser_id3='';
                this.subject3advertiser_id4='';
                this.subject4advertiser_id1='';
                this.subject4advertiser_id2='';
                this.subject4advertiser_id3='';
                this.subject4advertiser_id4='';
                this.subjectvideo1='';
                this.subjectvideo2='';
                this.subjectvideo3='';
                this.subjectvideo4='';
            },
            add(){
                this.centerDialogVisible = true
            },
            doSave(){
                // let loadingInstance = Loading.service({ fullscreen: true, text: '创建广告中，请稍等！',  });
                this.form.time=this.currentDate();
                this.form.creater = this.user.name;
                this.form.distributorId_w = this.user.distributor_w;
                this.form.distributorId_b = this.user.distributor_b;
                this.form.distributorId_f = this.user.distributor_f;
                this.form.jlaccount = this.user.jlaccount;
                this.dealAdvertiser_ids();
                this.$axios.post(this.$httpUrl+'/jlaccount/autoCreatePromotion',this.form).then(res=>res.data).then(()=>{
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.centerDialogVisible = false
                    this.loadPost1()
                    this.resetForm();
                    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    //     loadingInstance.close();
                    // });
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
                        date2:this.form1.date2,
                        creater:this.form1.creater
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.autoPromotionTableData=res.data
                        this.autoPromotionTableData.map(item => {
                            console.log(item.project_num)
                            if (!item.project_info) {
                                item.project_info=[];
                                item.advertising_info=[];
                                item.advertiser_id_info=[];
                            }
                        })

                        this.total1=res.total
                    }else{
                        alert('获取数据失败')
                    }
                })
            },

        },
        beforeMount() {
            if (this.user.roleId!=2){
                this.form1.creater=[];
            } else {
                this.form1.creater=[JSON.parse(sessionStorage.getItem('CurUser')).name];
            }
            this.form1.creater = this.user.name
            this.loadPost1()
            this.getInputInfo();
            this.radioChange();
            if (!this.timer) {
                this.timer = setInterval(() => {
                    this.loadPost1();
                }, 120000);
            }
        }
    }
</script>

<style scoped>
.table_class /deep/ tr{
    height: 70px;
}
</style>
