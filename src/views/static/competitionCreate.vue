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
		<el-table :data="competitionCreates" style="width: 95%;margin: 0 auto;">
			<el-table-column fixed prop="id" label="编号" width="80" />
			<el-table-column prop="aimCompetition" label="目标赛事" width="120" />
			<el-table-column prop="content" label="内容" width="120" />
			<el-table-column prop="title" label="竞赛标题" width="150" />
			<el-table-column prop="target" label="竞赛对象" width="150" />
			<el-table-column prop="type" label="竞赛类型" width="150" />
			<el-table-column prop="checked" label="审核状态" width="150">
				<template #default="scope">
					{{ scope.row.type == 1 ? "已审核" : "未审核" }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link type="warning" size="small" @click="toEdit(scope.row)">更新</el-button>
					<el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
			style="width: 95%; margin:0 auto" @current-change="currentchange" />
	</div>
	<el-dialog v-model="dialogFormVisible" title="竞赛编辑">
		<el-form :model="competitionCreate">
			<el-form-item label="目标赛事" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.aimCompetition" autocomplete="off" />
			</el-form-item>
			<el-form-item label="内容" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.content" autocomplete="off" />
			</el-form-item>
			<el-form-item label="竞赛标题" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.title" autocomplete="off" />
			</el-form-item>
			<el-form-item label="竞赛对象" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.target" autocomplete="off" />
			</el-form-item>
			<el-form-item label="竞赛类型" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.type" autocomplete="off" />
			</el-form-item>
			<el-form-item label="审核状态" :label-width="formLabelWidth">
				<el-input v-model="competitionCreate.checked" autocomplete="off" />
				
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
	} from "@/http/competitionCreate";
	import {
		ElMessage
	} from "element-plus";
	import {
		cloneDeep
	} from "lodash-es";
	export default defineComponent({
		data() {
			return {
				page: {
					total: 0,
					current: 1,
					size: 6,
				},
				selectPage: {
					total: 0,
					current: 1,
					size: 6,
					pagerCount: 5,
				},
				input: "",
				competitionCreates: [],
				searchId: "",
				dialogFormVisible: false,
				competitionCreate: {
					id: 0,
					userId: 1,
					title: "",
					content: "",
					startTime: new Date(),
					endTime: new Date(),
					signup: 0,
					target: "",
					type: "",
					createTime: new Date(),
					updateTime: new Date(),
					deleted: 0,
					aimCompetition: 0,
					state: 0,
					checked: 0,
					schoolId: 0
				},
				formLabelWidth: 80,
			};
		},
		mounted() {
			// this.getUserLevelList();
			this.getAllCopetitionCreate(1);
		},
		methods: {
			research() {
				this.searchId = null;
				this.getAllCopetitionCreate(1);
			},
			search() {
				if (this.searchId == "") {
					alert("请选择后进行查询");
					return;
				}
				getOne(this.searchId)
					.then((res) => {
						console.log(res);
						this.competitionCreates = [];
						this.competitionCreates.push(res.data.competitionCreate);
						this.page.size=6;
						this.page.total=0;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			toEdit(userLevel) {
				this.dialogFormVisible = true;
				this.competitionCreate = cloneDeep(userLevel);
			},
			getAllCopetitionCreate(current) {
				const data = {
					current: current,
					size: 6,
					colums: [],
					userId:1
				};
				getAll(data)
					.then((res) => {
						console.log(res);
						const page=res.data.page;
						this.competitionCreates=page.records;
						this.page=page;
						console.log("****",this.page)
					})
					.catch((err) => {
						console.log(err);
					});
			},
			del(levelId) {
				delOne(levelId)
					.then((res) => {
						if (res.success) {
							this.getAllCopetitionCreate(1);
						} else {
							console.log(res.msg);
							return false;
						}
					})
					.catch((err) => {});
			},
			currentchange(current) {
				// console.log(current);
				this.getAllCopetitionCreate(current);
				this.page.current = current; //数据更新到目前显示的页面
			},
			toAdd() {
				//到添加的页面
				this.dialogFormVisible = true;
				this.competitionCreate = {
					id: 0,
					userId: 1,
					title: "",
					content: "",
					startTime: new Date(),
					endTime: new Date(),
					signup: 0,
					target: "",
					type: "",
					createTime: new Date(),
					updateTime: new Date(),
					deleted: 0,
					aimCompetition: 0,
					state: 0,
					checked: 0,
					schoolId: 0
				};
			},
			save() {
				const competitionCreate = this.competitionCreate;
				if (competitionCreate.id == 0) {
					addOne(competitionCreate)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								this.getAllCopetitionCreate(1);
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
					updateOne(competitionCreate)
						.then((res) => {
							if (res.success) {
								//刷新页面
								this.dialogFormVisible = false;
								this.getAllCopetitionCreate(1);
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