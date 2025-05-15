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

                    <el-button type="primary" style="float: right" @click="add" v-if="user.roleId!=2 || user.no=='wujinyuan' || user.no=='pengdeshui' || user.no=='wangshengyu' || user.no=='xiaojiawang' || user.no=='dashan'|| user.no=='yuboya'|| user.no=='maishangye'|| user.no=='linghuayi'|| user.no=='lijiahao'|| user.no=='zhongleping'|| user.no=='yangcheng'|| user.no=='zhangfazhao'|| user.no=='wangbohan'|| user.no=='xiaoyan'|| user.no=='wuweijian'|| user.no=='zhengzijia'|| user.no=='linrongxin'|| user.no=='chenjiafu'|| user.no=='hejinlin'">创建广告</el-button>
                </div>
                <el-table :data="autoPromotionTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="promotion_id" label="账户ID" width="150" ></el-table-column>
                    <el-table-column prop="promotion_name" label="账户名称" width="400" ></el-table-column>
                    <el-table-column prop="media_source" label="小程序" width="100" ></el-table-column>
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
                    <el-button type="primary" style="float: right" @click="add" v-if="user.roleId!=2 || user.no=='wujinyuan' || user.no=='pengdeshui' || user.no=='wangshengyu' || user.no=='xiaojiawang' || user.no=='dashan'|| user.no=='yuboya'|| user.no=='maishangye'|| user.no=='linghuayi'|| user.no=='lijiahao'|| user.no=='zhongleping'|| user.no=='yangcheng'|| user.no=='zhangfazhao'|| user.no=='wangbohan'|| user.no=='xiaoyan'|| user.no=='wuweijian'|| user.no=='zhengzijia'|| user.no=='linrongxin'|| user.no=='chenjiafu'|| user.no=='hejinlin'">创建广告</el-button>
                </div>
                <el-table :data="jlprojectTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="project_id" label="项目ID" width="200" ></el-table-column>
                    <el-table-column prop="name" label="项目名称" width="300" ></el-table-column>
                    <el-table-column prop="advertiser_id" label="账户ID" width="150" ></el-table-column>
                    <el-table-column prop="bid_strategy" label="出价策略" width="200" ></el-table-column>
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

                    <el-button type="primary" style="float: right" @click="add" v-if="user.roleId!=2 || user.no=='wujinyuan' || user.no=='pengdeshui' || user.no=='wangshengyu' || user.no=='xiaojiawang' || user.no=='dashan'|| user.no=='yuboya'|| user.no=='maishangye'|| user.no=='linghuayi'|| user.no=='lijiahao'|| user.no=='zhongleping'|| user.no=='yangcheng'|| user.no=='zhangfazhao'|| user.no=='wangbohan'|| user.no=='xiaoyan'|| user.no=='wuweijian'|| user.no=='zhengzijia'|| user.no=='linrongxin'|| user.no=='chenjiafu'|| user.no=='hejinlin'">创建广告</el-button>
                </div>
                <el-table :data="jlpromotionTableData" border style="overflow: auto; " max-height="calc(100% - 200px)">
                    <el-table-column prop="promotion_id" label="广告ID" width="200"></el-table-column>
                    <el-table-column prop="name" label="广告名" width="300" ></el-table-column>
                    <el-table-column prop="advertiser_id" label="账户ID" width="150"></el-table-column>
                    <el-table-column prop="project_id" label="项目ID" width="200" ></el-table-column>
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
                width="650px" :close-on-click-modal="false"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="140px">
                <el-col :span="24">
                    <el-form-item label="投放载体" prop="radio">
                        <el-radio v-model="form.radio" label="1" @change="(value)=>radioChange(value)" border size="mini">抖音小程序</el-radio>
<!--                        <el-radio v-model="form.radio" label="4" @change="(value)=>radioChange(value)" border size="mini">微信小程序</el-radio>-->
                        <el-radio v-model="form.radio" label="7" @change="(value)=>radioChange(value)" border size="mini">抖音小程序免费</el-radio>
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

                <el-col :span="24">
                    <el-form-item label="投放主体" prop="subject">
                        <el-select style="width: 400px;"
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

                <span v-for="(inde) in form.subject.length" :key="inde">

                    <el-col :span="24" style="margin-left:50px ">
                        <span>{{form.subject[inde-1]}}</span>
                    <el-form-item label="视频账户ID" :prop="'subjectvideo' + inde" :rules="{required: true, trigger: 'change'}">
                        <el-input style="width: 350px;"
                                  v-model="form['subjectvideo' + inde]" >
                        </el-input>
                    </el-form-item>
                    </el-col>

                    <el-col :span="24" v-for="(index) in form.bid_strategy.length" :key="index" style="margin-left:50px ">
                        <el-form-item :label="form.bid_strategy[index-1]" :prop="'subject' + inde + 'advertiser_id' +  index"
                                      :rules="{required: true, trigger: 'change'}">
                            <el-input style="width: 350px;" v-model="form['subject' + inde + 'advertiser_id' +  index]"  @change="(value)=>advertiserIdChange(value, form.subject[inde-1], form.bid_strategy[index-1], index)">
                            </el-input>
                        </el-form-item>
                    </el-col>

                </span>


                <el-col :span="24">
                    <el-form-item label="番茄短剧ID" prop="video_id">
                        <el-input v-model="form.video_id" style="width: 400px;" ></el-input>
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
    import { Loading } from 'element-ui';

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
                question:'问题',
                formAiAsk:{ask:''},
                aiAskDialogVisible:false,
                aiAnswerDialogVisible:false,
                aiAnswer:'',


                activeName: 'automation_promotion',
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
                    cover:'n',
                    id:'',
                    subject:[],
                    advertiser_id1s:[],
                    advertiser_id2s:[],
                    advertiser_id3s:[],
                    advertiser_id4s:[],
                    bid_strategy:[],
                    video_id:'',
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
                },
                subjects:JSON.parse(sessionStorage.getItem('CurUser')).jlaccount,
                flag : true,
                videoListLoading: false,
                allValue:'all',
                bid_strategys:[
                    '抖超小29',
                    '抖超小10',
                    '抖小额',
                    '抖大额'
                ],
                bid_strategys_name_info: {
                    '抖超小29': "抖超小29",
                    '5块9解锁': "抖超小59",
                    '抖超小10': "抖超小10",
                    '抖小额': "抖小额",
                    '抖大额': "抖大额",
                },
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
                    ]

                },

                users:[],
                roles:[],
                modRow: {}
            }
        },
        methods:{
            videoFocus() {
                console.log(this.user)
                for (const index in this.form.subject) {
                    if (this.validateVideoAdvertiser_id((Number(index)+1))) {return}
                    for (const ind in this.form.bid_strategy) {
                        const res = this.validateAdvertiser_id1('subject' + (Number(index)+1) + 'advertiser_id' + (Number(ind)+1), this.form.bid_strategy[ind]);
                        if (res) {return}
                    }
                }
                this.videoAdvertiserIdChange();
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
            handleClick(tab, event) {
                console.log(tab, event);
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
            strategyChange() {
                this.form.video_ids = [];
                this.form.advertiser_id1 = '';
                this.form.advertiser_id2 = '';
                this.form.advertiser_id3 = '';
                this.form.advertiser_id4 = '';
                this.form.advertiser_id5 = '';
            },
            videoListClear() {
                this.form.video_ids = [];
            },
            radioChange(value){
                if (value == "1") {
                    this.bid_strategys =[
                        '抖超小29',
                        // '5块9解锁',
                        '抖超小10',
                        '抖小额',
                        '抖大额'
                    ]
                } else if (value == "7") {
                    this.bid_strategys =[
                        '超小',
                        '低',
                        'ROI'
                    ]
                }
            },
            advertiserIdChange(row, subject, title, index){
                this.form.video_ids = [];
                if (row && row.length==16) {
                    this.$axios.post(this.$httpUrl+'/jlaccount/getAdvertiserInfo',{advertiser_id: row, jlaccount : subject}).then(res=>res.data).then(res=>{
                        if(!res.data.message){
                            if (res.data.name.indexOf(title) < 0) {
                                this.$message({
                                    message: '账户' + row + "的名字为：" + res.data.name + "，请检查账户与出价策略是否匹配。",
                                    type: 'info'
                                });
                                this.form['advertiser_id' + (Number(index))] = '';
                            }
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            });
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
                this.form.cover = 'n';
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
                this.form.distributorId_f = this.user.distributor_f;
                this.form.jlaccount = this.user.jlaccount;
                this.dealAdvertiser_ids();
                this.$axios.post(this.$httpUrl+'/jlaccount/autoCreatePromotion',this.form).then(res=>res.data).then(res=>{
                    if(res.data.message=='success'){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.centerDialogVisible = false
                        this.loadPost1()
                        this.loadPost2()
                        this.loadPost3()
                        this.activeName= 'automation_promotion',
                        this.resetForm();
                    }else{
                        this.$message({
                            message: '创建失败！' + res.data.message,
                            type: 'error'
                        });
                    }
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
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
