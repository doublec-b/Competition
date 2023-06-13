<template>
	<div style="margin-top:10px">
		<el-form-item label="比赛编号" :label-width="110" style="display:inline-flex; margin-right: 10px;">
			<el-input v-model="searchId" placeholder="比赛编号"></el-input>
		</el-form-item>
		
		<el-button type="primary" @click="search">查询</el-button>
		<div style="width: 95%;margin: 0 auto; margin-bottom: 10px;">
			<el-button type="info" @click="research">重置</el-button>
			<el-button type="success" @click="toAdd">报名</el-button>
		</div>
		<el-table :data="studentSignupCompetitionVos" style="width: 95%;margin: 0 auto;height: 800px;">
			<el-table-column fixed prop="id" label="编号" width="80" />
			<el-table-column prop="studentId" label="学生编号" width="120" />
			<el-table-column prop="competitionId" label="比赛编号" width="120" />
			<el-table-column prop="createTime" label="创建时间" width="150" />
			<el-table-column prop="checked" label="审核状态" width="150" >
				<template #default="scope">
					{{ scope.row.type == 1 ? "已审核" : "未审核" }}
				</template>
			</el-table-column>
		</el-table>
	</div>
	<el-dialog v-model="dialogFormVisible" title="竞赛编辑">
		<el-form :model="studentSignupCompetitionVo">
			<el-form-item label="学生编号" :label-width="formLabelWidth">
				<el-input v-model="studentSignupCompetitionVo.studentId" autocomplete="off" />
			</el-form-item>
			<el-form-item label="比赛编号" :label-width="formLabelWidth">
				<el-input v-model="studentSignupCompetitionVo.competitionId" autocomplete="off" />
			</el-form-item>
			
			<el-form-item label="创建时间" :label-width="formLabelWidth">
				<div class="block">
					<el-date-picker v-model="studentSignupCompetitionVo.createTime" type="datetime" placeholder="请选择创建时间" />
				</div>
			</el-form-item>
			<el-form-item label="审核状态" :label-width="formLabelWidth">
				<el-input v-model="studentSignupCompetitionVo.checked" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="save">
					保存
				</el-button>
			</span>
		</template>
	</el-dialog>

	<template><el-input v-model="input" placeholder="Please input" /></template>
</template>

<script>
	import {
		defineComponent
	} from "vue";
	import {
		getAll,
		addOne,
		updateOne,
		delOne,
		getOne
	} from "@/http/competitionSignUp";
	import {
		ElMessage
	} from "element-plus";
	import {
		cloneDeep
	} from "lodash-es";
	export default defineComponent({
		data() {
			return {
				input: "",
				studentSignupCompetitionVos: [],
				studentSignupCompetitionVo:{
					studentId:0,
					competitionId:0,
					createTime:new Date(),
					checked:0
				},
				searchId: 0,
				dialogFormVisible: false,
				formLabelWidth: 80,
			};
		},
		mounted() {
			// this.getUserLevelList();
			// this.getStudentSignUp();
		},
		methods: {
			research() {
				this.searchId = null;
				this.getStudentSignUp(0);
			},
			search() {
				if (this.searchId == "") {
					alert("请选择后进行查询");
					return;
				}
				this.getStudentSignUp(this.searchId);
			},
			toEdit(userLevel) {
				this.dialogFormVisible = true;
				this.competition = cloneDeep(userLevel);
			},
			getStudentSignUp(mid) {
				if(mid==0){
					mid=5;
				};
				console.log("----",mid)
				getAll(mid)
					.then((res) => {
						console.log("***",res);
						this.studentSignupCompetitionVos = res.data.studentSignupCompetitionVos;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			del(levelId) {
				delOne(levelId)
					.then((res) => {
						if (res.success) {
							this.getAllCopetition();
						} else {
							console.log(res.msg);
							return false;
						}
					})
					.catch((err) => {});
			},
			toAdd() {
				//到添加的页面
				this.dialogFormVisible = true;
				this.studentSignupCompetitionVo = {
					id:0,
					studentId:0,
					competitionId:0,
					createTime:new Date(),
					checked:0
				};
			},
			save() {
				const studentSignupCompetitionVo = this.studentSignupCompetitionVo;
				if (studentSignupCompetitionVo.id == 0) {
					addOne(studentSignupCompetitionVo)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								console.log("///",studentSignupCompetitionVo.competitionId)
								 this.getStudentSignUp(studentSignupCompetitionVo.competitionId);
								ElMessage(res.msg);
							} else {
								ElMessage(res.msg);
								return false;
							}
						})
						.catch((err) => {
							ElMessage("网络错误联系管理员");
						});
				} else {
					updateOne(studentSignupCompetitionVo)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								this.getStudentSignUp();
								ElMessage(res.msg);
							} else {
								ElMessage(res.msg);
								return false;
							}
						})
						.catch((err) => {
							ElMessage("网络错误联系管理员");
						});
				}
			},
		},
	});
</script>

<style lang="scss" scoped></style>