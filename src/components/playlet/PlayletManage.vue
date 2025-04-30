<template>
    <div style="height:100%">
        <div style="margin-bottom: 5px;">
            <el-form ref="form1" :model="form" label-width="75px">
                <el-col :span="5">
                    <el-form-item label="起止日期" prop="creater">
                        <el-date-picker type="date" placeholder="起始时间" v-model="form1.date1" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>-
                        <el-date-picker type="date" placeholder="结束时间" v-model="form1.date2" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="短剧名称" prop="creater">
                        <el-input v-model="form1.playlet_name" placeholder="短剧名称" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="短剧ID" prop="creater">
                        <el-input v-model="form1.playlet_id" placeholder="短剧ID" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>


            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="exportExcel" v-show="user.roleId!=2">导出</el-button>
        </div>
        <el-table :data="tableData"
                  border style="overflow: auto; " max-height="calc(100% - 200px)">
            <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
            <el-table-column prop="playlet_name" label="短剧名称" width="200" :sortable="true"></el-table-column>
            <el-table-column prop="playlet_id" label="短剧ID" width="170" :sortable="true"></el-table-column>
            <el-table-column prop="author" label="作者" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="category" label="主分类" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="abstract_info" label="简介"  :sortable="true"></el-table-column>
            <el-table-column prop="chapter_amount" label="集数" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="free_chapter_count" label="免费集数" width="1 0" :sortable="true"></el-table-column>
            <el-table-column prop="price" label="单章价格" width="100" :sortable="true"></el-table-column>
            <el-table-column prop="release_time" label="上线时间" width="150" :sortable="true"></el-table-column>
            <el-table-column prop="promotion_times" label="推广次数" width="1 0" :sortable="true"></el-table-column>
            <el-table-column prop="operate" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="promotion(scope.row)">推广</el-button>
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
                width="500px"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-col :span="24">
                    <el-form-item label="短剧ID" prop="playlet_id">
                        <el-input v-model="form.playlet_id" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="推广"
                :visible.sync="promotionDialogVisible"
                width="500px"
                center>

            <el-form ref="form2" :model="form2" label-width="100px">
                <el-col :span="24">
                    <el-form-item label="短剧名称" prop="playlet_name">
                        <el-input v-model="form2.playlet_name" :disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="短剧ID" prop="playlet_id" >
                        <el-input v-model="form2.playlet_id" :disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="分销商" prop="playlet_name">
                        <el-select v-model="form2.distributor" filterable placeholder="请选择分销商!" style="width: 300px;"
                                    @change="distributorChange">
                            <el-option
                                    v-for="item in distributors"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="分销商ID" prop="playlet_name">
                        <el-select v-model="form2.distributor_id" filterable placeholder="请选择分销商ID!" style="width: 300px;"
                                    @change="distributorIdChange">
                            <el-option
                                    v-for="item in distributor_ids"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="充值模版" prop="recharge_template_id">
                        <el-select v-model="form2.adCallbackConfigId" filterable placeholder="请选择广告回传!" style="width: 300px;">
                            <el-option
                                    v-for="item in adCallbackConfigList"
                                    :key="item.config_id"
                                    :label="item.config_name"
                                    :value="item.config_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="充值模版" prop="recharge_template_id">
                        <el-select v-model="form2.recharge_template_id" filterable placeholder="请选择充值模版!" style="width: 300px;">
                            <el-option
                                    v-for="item in recharge_templates"
                                    :key="item.recharge_template_id"
                                    :label="item.recharge_template_name"
                                    :value="item.recharge_template_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="媒体类型" prop="mini_program_name">
                        <el-input v-model="form2.media_source" :disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="小程序" prop="mini_program_name">
                        <el-input v-model="form2.mini_program_name" :disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="标签" prop="label">
                        <el-select v-model="form2.label" filterable placeholder="请选择标签!" style="width: 300px;">
                            <el-option
                                    v-for="item in labels"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="mini_program_name">
                        <el-input v-model="form2.remark" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="doPromotion">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PlayletManage",
        data() {
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                tableData: [],
                pageSize:10,
                pageNum:1,
                total:0,
                name:'',
                centerDialogVisible:false,
                promotionDialogVisible:false,
                form: {
                    playlet_id:'',
                },
                form1:{
                    date1:'',
                    date2:'',
                    playlet_name:'',
                    playlet_id:'',
                },
                form2:{
                    playlet_name:'',
                    playlet_id:'',
                    distributor:'',
                    distributor_id:'',
                    mini_program_name:'',
                    label: '',
                    remark: '',
                    recharge_template_id: '',
                    adCallbackConfigId:''
                },
                distributors:[],
                distributor_ids:[],
                recharge_templates:[],
                adCallbackConfigList:[],
                labels: ['大额', '小额', '不涉及'],
                rules: {
                    playlet_id: [
                        {required: true, trigger: 'blur'},
                    ]
                },
                modRow: {}
            }
        },
        methods:{
            distributorChange(row){
                this.$axios.post(this.$httpUrl+'/playlet/getdistributorIdBydistributor',{distributor: row}).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.distributor_ids = res.data;
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }

                })
            },
            distributorIdChange(row){
                this.$axios.post(this.$httpUrl+'/playlet/getdistributorIdInfo', {distributorId: row}).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.form2.media_source = res.data.media_source;
                        this.form2.mini_program_name = res.data.mini_program_name;
                        this.form2.secret_key = res.data.secret_key;
                        this.recharge_templates = res.data.distributorIdInfo;
                        this.adCallbackConfigList = res.data.adCallbackConfigInfo;
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
            },
            del(id){
                this.$axios.get(this.$httpUrl+'/playlet/del?id='+id).then(res=>res.data).then(res=>{
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
            promotion(row) {
                this.promotionDialogVisible = true
                this.form2.playlet_name = row.playlet_name;
                this.form2.playlet_id = row.playlet_id;
                this.distributors = this.user.distributor;
            },
            cancel(){
                this.$refs.form2.resetFields();
                this.promotionDialogVisible = false
            },
            doPromotion() {
                const param = {
                    playlet_id: this.form2.playlet_id,
                    playlet_name: this.form2.playlet_name,
                    distributor_id: this.form2.distributor_id,
                    media_source: this.form2.media_source,
                    secret_key: this.form2.secret_key,
                    label: this.form2.label,
                    creater: this.user.name,
                    remark: this.form2.remark,
                    recharge_template_id: this.form2.recharge_template_id,
                    adCallbackConfigId: this.form2.adCallbackConfigId
                }
                this.$axios.post(this.$httpUrl+'/promotion/promotion', param).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: '推广成功，推广链ID为：' + res.data.promotion_id + "，推广链名称为：" +  + res.data.promotion_name,
                            type: 'success'
                        });
                        this.$refs.form2.resetFields();
                        this.promotionDialogVisible = false;
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
                    this.form.playlet_name = row.playlet_name;
                    this.form.playlet_id = row.playlet_id;
                    this.form.release_time = row.release_time;
                })
                this.modRow = row;
            },
            add(){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    this.resetForm();
                })

            },

            doSave(){
                this.$axios.post(this.$httpUrl+'/playlet/checkrecord',this.form).then(res=>res.data).then(res=>{
                    if(res.data.length==0){
                        this.form.distributor_id = '1809883619983433';
                        this.$axios.post(this.$httpUrl+'/playlet/save',this.form).then(res=>res.data).then(res=>{
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
                            message: this.form.playlet_id + '已添加！',
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
                        url:this.$httpUrl+'/playlet/export',
                        method:'post',
                        data: {
                            date1:this.form1.date1,
                            date2:this.form1.date2,
                            location:this.form1.location,
                            content:this.form1.content,
                            hiredate1:this.form1.hiredate1,
                            hiredate2:this.form1.hiredate2,
                            creater:this.form1.creater
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
                this.form.creater = this.modRow.creater;
                this.$axios.post(this.$httpUrl+'/playlet/update',this.form).then(res=>res.data).then(res=>{
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
                    this.form1.creater='';
                } else {
                    this.form1.creater=this.user.name;
                }
            },
            loadPost(){
                this.$axios.post(this.$httpUrl+'/playlet/listPage',{
                    pageSize:this.pageSize,
                    pageNum:this.pageNum,
                    param:{
                        date1:this.form1.date1,
                        date2:this.form1.date2,
                        location:this.form1.location,
                        content:this.form1.content,
                        hiredate1:this.form1.hiredate1,
                        hiredate2:this.form1.hiredate2,
                        creater:this.form1.creater
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.tableData=res.data;
                        this.total=res.total;
                    }else{
                        alert('获取数据失败')
                    }

                })
            }
        },
        beforeMount() {
            if (this.user.roleId!=2){
                this.form1.creater='';
            } else {
                this.form1.creater=JSON.parse(sessionStorage.getItem('CurUser')).name;
            }
            this.loadPost()
        }
    }
</script>

<style scoped>

</style>
