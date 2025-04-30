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
                    <el-form-item  label="投放ID" prop="content">
                        <el-input v-model="form1.promotion_id" placeholder="请输入" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item  label="投放名称" prop="location">
                        <el-input v-model="form1.promotion_name" placeholder="请输入" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item v-show="user.roleId!=2"  label="投放人" prop="creater">
                        <el-input v-model="form1.creater" placeholder="请输入投放人名" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>


            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="exportExcel" v-show="user.roleId!=2">导出</el-button>
        </div>
        <el-table :data="tableData"
                  :header-cell-style="cell_style" border style="overflow: auto; " max-height="calc(100% - 200px)">
            <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
            <el-table-column prop="promotion_id" label="投放ID" width="150" fixed="left" ></el-table-column>
            <el-table-column prop="promotion_name" label="投放名称" width="200" fixed="left" ></el-table-column>
            <el-table-column prop="promotion_http_url" label="投放网络地址" width="200" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="promotion_url" label="投放地址" width="200" fixed="left" v-if="user.roleId!=2"></el-table-column>
            <el-table-column prop="distributor_id" label="分销商ID" width="150" :sortable="true"></el-table-column>
            <el-table-column prop="book_id" label="短剧ID" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="media_source" label="媒体类型 " width="120" :sortable="true"></el-table-column>
            <el-table-column prop="package_name" label="剧场名" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="creater" label="投放人" width="120" :sortable="true"></el-table-column>
            <el-table-column prop="create_time" label="投放时间" width="150" :sortable="true"></el-table-column>
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
    </div>
</template>

<script>
    export default {
        name: "promotionManage",
        data() {
            return {
                user : JSON.parse(sessionStorage.getItem('CurUser')),
                tableData: [],
                pageSize:10,
                pageNum:1,
                total:0,
                name:'',
                form1:{
                    date1:'',
                    date2:'',
                    promotion_id:'',
                    promotion_name:'',
                    creater:JSON.parse(sessionStorage.getItem('CurUser')).name
                },
                rules: {
                    date: [
                        {required: true, trigger: 'blur'},
                    ]
                },
                modRow: {}
            }
        },
        methods:{
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
                this.form1.promotion_id='';
                this.form1.promotion_name='';
                if (this.user.roleId!=2){
                    this.form1.creater='';
                } else {
                    this.form1.creater=this.user.name;
                }
            },
            loadPost(){
                this.$axios.post(this.$httpUrl+'/promotion/listPage',{
                    pageSize:this.pageSize,
                    pageNum:this.pageNum,
                    param:{
                        date1:this.form1.date1,
                        date2:this.form1.date2,
                        promotion_id:this.form1.promotion_id,
                        promotion_name:this.form1.promotion_name,
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
                this.$axios.post(this.$httpUrl+'/shouzhi/calculate',{mini_program_name:miniProgramName, date:this.form.date, user_name: userName})
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
