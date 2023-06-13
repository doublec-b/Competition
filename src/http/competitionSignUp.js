import request from "./axios";

export function getAll(competitionId){
	return request({
		url: `/api/competitionSignup/getStudentSignupCompetitionVos/${competitionId}`,
		method: 'get',
	});
}

export function getOne(id){
	return request({
		url: `/api/competition/one?id=${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/api/competition/delete?id=${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/competitionSignup/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/competition/edit',
		method: 'post',
		data
	});
}

