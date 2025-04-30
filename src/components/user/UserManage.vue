<template>
    <div>
        <div style="margin-bottom: 5px;">
            <el-form ref="form1" :model="form" label-width="75px">
                <el-col :span="3">
                    <el-form-item label="姓名" prop="location">
                        <el-input v-model="form1.name" placeholder="请输入姓名" suffix-icon="el-icon-search" style="width: 170px;"
                                  @keyup.enter.native="loadPost"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="性别" prop="location">
                        <el-select v-model="form1.sex" filterable placeholder="请选择性别" style="width: 170px;"
                                   @keyup.enter.native="loadPost">
                            <el-option
                                    v-for="item in sexs"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="位置" prop="location">
                        <el-input v-model="form1.location" placeholder="请输入位置" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="内容" prop="content">
                        <el-input v-model="form1.content" placeholder="请输入内容" style="width: 170px;"
                                  @keyup.enter.native="loadPost" clearable ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="exportExcel">导出</el-button>
        </div>
        <el-table :data="tableData"
                  :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
                  border>
            <el-table-column type="index" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="no" label="账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="180">
            </el-table-column>
            <el-table-column prop="distributor" label="分销商" width="150">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80">
            </el-table-column>
            <el-table-column prop="role" label="员工角色" width="80">
            </el-table-column>
            <el-table-column prop="location" label="位置" width="80">
            </el-table-column>
            <el-table-column prop="content" label="内容" width="80">
            </el-table-column>
            <el-table-column prop="hiredate" label="入职时间" width="150">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.sex === 1 ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.sex === 1 ? '男' : '女'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="roleId" label="账号角色" width="120">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.roleId === 0 ? 'danger' : (scope.row.roleId === 1 ? 'primary' : 'success')"
                            disable-transitions>{{scope.row.roleId === 0 ? '超级管理员' :
                        (scope.row.roleId === 1 ? '管理员' : '用户')}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="180">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
                    <el-popconfirm
                            title="确定删除吗？"
                            @confirm="del(scope.row.id)"
                            style="margin-left: 5px;"
                    >
                        <el-button slot="reference" size="small" type="danger" >删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="账号" prop="no">
                    <el-col :span="20">
                        <el-input v-model="form.no"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="名字" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-col :span="20">
                        <el-input v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="分销商" prop="distributor">
                    <el-col :span="20">
                        <el-select v-model="form.distributor" multiple collapse-tags placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in distributors" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-col :span="20">
                        <el-input v-model="form.role"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="位置" prop="location">
                    <el-col :span="20">
                        <el-select v-model="form.location" multiple collapse-tags placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in locations" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-col :span="20">
                        <el-select v-model="form.content" multiple collapse-tags placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in contents" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="入职时间" prop="hiredate">
                    <el-col :span="20">
                        <el-date-picker type="date" v-model="form.hiredate"  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-col :span="20">
                        <el-input v-model="form.age"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-col :span="20">
                        <el-input v-model="form.phone"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data() {
            let checkDuplicate =(rule,value,callback)=>{
                if(this.form.id){
                    return callback();
                }
                this.$axios.get(this.$httpUrl+"/user/findByNo?no="+this.form.no).then(res=>res.data).then(res=>{
                    if(res.code!=200){

                        callback()
                    }else{
                        callback(new Error('账号已经存在'));
                    }
                })
            };

            return {
                tableData: [],
                pageSize:10,
                pageNum:1,
                total:0,
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
                distributors: [],
                sexs:[
                    {
                        value: '1',
                        label: '男'
                    }, {
                        value: '0',
                        label: '女'
                    }
                ],
                centerDialogVisible:false,
                form:{
                    id:'',
                    no:'',
                    name:'',
                    password:'',
                    distributor:'',
                    age:'',
                    phone:'',
                    sex:'0',
                    roleId:'2',
                    role:'',
                    location:'',
                    content:'',
                    hiredate:''
                },
                form1:{
                    name:'',
                    sex:'',
                    location:'',
                    content:''
                },
                rules: {
                    no: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'},
                        {validator:checkDuplicate,trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}
                    ],
                    distributor: [
                        // {required: true, trigger: 'blur'},
                    ]
                }
            }
        },
        methods:{
            resetForm() {
                this.$refs.form.resetFields();
                this.form.id = '';
            },
            getDistributorInfo(){
                this.$axios.get(this.$httpUrl+'/user/distributors').then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.distributors = res.data;
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }

                })
            },
            del(id){
                this.$axios.get(this.$httpUrl+'/user/del?id='+id).then(res=>res.data).then(res=>{
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
                    this.form.id = row.id
                    this.form.no = row.no
                    this.form.name = row.name
                    this.form.password = row.password
                    this.form.sex = row.sex +''
                    this.form.phone = row.phone
                    this.form.roleId = row.roleId
                    this.form.location = row.location
                    this.form.content = row.content
                    this.form.hiredate = row.hiredate
                    this.form.distributor = row.distributor
                    this.form.role = row.role
                    if (!row.age) {
                        this.form.age =  '0';
                    } else {
                        this.form.age =  row.age + '';
                    }
                })
            },
            add(){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    this.resetForm()
                })

            },
            doSave(){
                this.$axios.post(this.$httpUrl+'/user/save',this.form).then(res=>res.data).then(res=>{
                    if(res.code==200){

                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.centerDialogVisible = false
                        this.loadPost()
                        this.resetForm()
                    }else{
                        this.$message({
                            message: '操作失败！',
                            type: 'error'
                        });
                    }

                })
            },
            doMod(){
                this.$axios.post(this.$httpUrl+'/user/update',this.form).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.centerDialogVisible = false
                        this.loadPost()
                        this.resetForm()
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
                this.pageNum=val
                this.loadPost()
            },
            loadGet(){
                this.$axios.get(this.$httpUrl+'/user/list').then(res=>res.data).then(res=>{
                    console.log(res)
                })
            },
            resetParam(){
                this.form1 = {
                    name:'',
                    sex:'',
                    location:'',
                    content:''
                }
                this.loadPost()
            },
            loadPost(){
                this.$axios.post(this.$httpUrl+'/user/listPageC1',{
                    pageSize:this.pageSize,
                    pageNum:this.pageNum,
                    param:{
                        name:this.form1.name,
                        sex:this.form1.sex,
                        location:this.form1.location,
                        content:this.form1.content,
                        roleId:'2'
                    }
                }).then(res=>res.data).then(res=>{
                    if(res.code==200){
                        this.tableData=res.data
                        this.total=res.total
                    }else{
                        alert('获取数据失败')
                    }

                })
            },
            exportExcel(){
                this.$confirm('确定导出？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$axios.request({
                        url:this.$httpUrl+'/user/export',
                        method:'post',
                        data: {
                            name:this.form1.name,
                            sex:this.form1.sex,
                            location:this.form1.location,
                            content:this.form1.content,
                            roleId:'2'
                        },
                        responseType:'blob'
                    }).then(res=>{
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download','用户名单' + new Date().getTime() + '.xlsx');
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
        },
        beforeMount() {
            //this.loadGet();
            this.loadPost();
            this.getDistributorInfo();
        }
    }
</script>

<style scoped>

</style>
