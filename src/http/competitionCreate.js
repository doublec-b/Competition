import request from "./axios";

export function getAll(data){
	return request({
		url: '/api/competitionCreate/page/user',
		method: 'post',
		data
	});
}

export function getOne(id){
	return request({
		url: `/api/competitionCreate/one?id=${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/api/competitionCreate/delete/`+id,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/competitionCreate/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/competitionCreate/edit',
		method: 'post',
		data
	});
}

