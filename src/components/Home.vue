<!--
 * @Description:
 * @Author: Rabbiter
 * @Date: 2023-03-04 15:31:03
-->
<template>
    <div style="text-align: center;background-color: #f1f1f3;height: 100%;padding: 0px;margin: 0px;">
        <!-- <h1 style="font-size: 50px;">{{'欢迎你！'+user.name}}</h1> -->
        <el-descriptions  title="个人中心" :column="2" size="40" border style="padding-top:20px;">
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    账号
                </template>
                {{user.no}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    电话
                </template>
                {{user.phone}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    性别
                </template>
                <el-tag
                        :type="user.sex === '1' ? 'primary' : 'danger'"
                        disable-transitions><i :class="user.sex==1?'el-icon-male':'el-icon-female'"></i>{{user.sex==1?"男":"女"}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    角色
                </template>
                <el-tag
                        type="success"
                        disable-transitions>{{user.roleId==0?"超级管理员":(user.roleId==1?"管理员":"用户")}}</el-tag>

            </el-descriptions-item>
        </el-descriptions>
        <div style="width: 100%;text-align: right;">
            <el-button style="box-sizing: border-box; margin-right: 117px;margin-top: 10px;" @click="modPassword">修改密码</el-button>
        </div>
        <DateUtils></DateUtils>
        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>

            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="账号" prop="no">
                    <el-col :span="20">
                        <el-input v-model="form.no" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="旧密码" prop="password">
                    <el-col :span="20">
                        <el-input v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                    <el-col :span="20">
                        <el-input v-model="form.newpassword"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doMod">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import DateUtils from "./DateUtils";
    export default {
        name: "Home",
        components: {DateUtils},
        data() {

            return {
                user:{},
                centerDialogVisible:false,
                form:{
                    id:'',
                    no:'',
                    password:'',
                    newpassword:''
                },
                rules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    newpassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        computed:{

        },
        methods:{
            init(){
                this.user = JSON.parse(sessionStorage.getItem('CurUser'))
            },
            modPassword(){
                this.centerDialogVisible = true
                this.$nextTick(()=>{
                    //赋值到表单
                    this.form.id = this.user.id
                    this.form.no = this.user.no
                    this.form.password = ''
                    this.form.newpassword = ''
                })
            },
            doMod(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if(this.form.password!=this.user.password) {
                            this.$message({
                                message: '旧密码错误！',
                                type: 'error'
                            });
                            return false;
                        }
                        if(this.form.password==this.form.newpassword) {
                            this.$message({
                                message: '新旧密码不能相同！',
                                type: 'error'
                            });
                            return false;
                        }
                        this.user.password = this.form.newpassword;
                        this.$axios.post(this.$httpUrl+'/user/update',this.user).then(res=>res.data).then(res=>{
                            if(res.code==200){
                                this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                                });
                                this.centerDialogVisible = false
                            }else{
                                this.$message({
                                    message: '操作失败！',
                                    type: 'error'
                                });
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
        },
        created(){
            this.init()
        }
    }
</script>

<style scoped>
    .el-descriptions{
        width:90%;

        margin: 0 auto;
        text-align: center;
    }
</style>
