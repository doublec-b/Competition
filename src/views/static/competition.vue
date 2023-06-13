<template>
	<div style="margin-top:10px">
		<div style="width: 95%;margin: 0 auto;">
			<el-form-item label="比赛编号" :label-width="110" style="display:inline-flex; margin-right: 10px;">
				<el-input v-model="searchId" placeholder="比赛编号"></el-input>
			</el-form-item>

			<el-button type="primary" @click="search">查询</el-button>
		</div>
		<div style="width: 95%;margin: 0 auto; margin-bottom: 10px;">
			<el-button type="info" @click="research">重置</el-button>
			<el-button type="success" @click="toAdd">添加</el-button>
		</div>
		<el-table :data="competitions" style="width: 95%;margin: 0 auto;height: 800px;">
			<el-table-column fixed prop="id" label="编号" width="80" />
			<el-table-column prop="name" label="竞赛名" width="120" />
			<el-table-column prop="start" label="开始日期" width="120" />
			<el-table-column prop="end" label="结束日期" width="150" />
			<el-table-column prop="homePage" label="网站主页" width="150" />
			<el-table-column prop="type" label="类型" width="150" />
			<el-table-column prop="level" label="比赛等级" width="150" />
			<el-table-column prop="organizer" label="组织者" width="150" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link type="warning" size="small" @click="toEdit(scope.row)">更新</el-button>
					<el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<el-dialog v-model="dialogFormVisible" title="竞赛编辑">
		<el-form :model="competition">
			<el-form-item label="比赛名" :label-width="formLabelWidth">
				<el-input v-model="competition.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="开始时间" :label-width="formLabelWidth">
				<div class="block">
					<el-date-picker v-model="competition.start" type="datetime" placeholder="请选择开始时间" />
				</div>
			</el-form-item>
			<el-form-item label="结束时间" :label-width="formLabelWidth">
				<div class="block">
					<el-date-picker v-model="competition.end" type="datetime" placeholder="请选择结束时间" />
				</div>
			</el-form-item>
			<el-form-item label="网站主页" :label-width="formLabelWidth">
				<el-input v-model="competition.homePage" autocomplete="off" />
			</el-form-item>
			<el-form-item label="类型" :label-width="formLabelWidth">
				<el-input v-model="competition.type" autocomplete="off" />
			</el-form-item>
			<el-form-item label="比赛等级" :label-width="formLabelWidth">
				<el-input v-model="competition.level" autocomplete="off" />
			</el-form-item>
			<el-form-item label="组织者" :label-width="formLabelWidth">
				<el-input v-model="competition.organizer" autocomplete="off" />
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
	} from "@/http/competition";
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
				competitions: [],
				searchId: "",
				dialogFormVisible: false,
				competition: {
					id: 0,
					name: "",
					start: new Date(),
					end: new Date(),
					homePage: "",
					type: "",
					level: "",
					organizer: "",
					schoolId: 74
				},
				formLabelWidth: 80,
			};
		},
		mounted() {
			// this.getUserLevelList();
			this.getAllCopetition();
		},
		methods: {
			research() {
				this.searchId = null;
				this.getAllCopetition();
			},
			search() {
				if (this.searchId == "") {
					alert("请选择后进行查询");
					return;
				}
				getOne(this.searchId)
					.then((res) => {
						console.log(res);
						this.competitions = [];
						this.competitions.push(res.data.competition);
						console.log(this.userLevels);
					})
					.catch((err) => {
						console.log(err);
					});
			},
			toEdit(userLevel) {
				this.dialogFormVisible = true;
				this.competition = cloneDeep(userLevel);
			},
			getAllCopetition() {
				getAll()
					.then((res) => {
						console.log(res);
						this.competitions = res.data.competitions;
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
				this.competition = {
					id: 0,
					name: "",
					start: new Date(),
					end: new Date(),
					homePage: "",
					type: "",
					level: "",
					organizer: "",
					schoolId: 74
				};
			},
			save() {
				const competition = this.competition;
				if (competition.id == 0) {
					addOne(competition)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								this.getAllCopetition();
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
					updateOne(competition)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								this.getAllCopetition();
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