
import request from '../axios/localData'

// export const RequestFun = (method,path,obj) => {return request+'.'+method(`${path}` , obj)}
export const getFun = (path , ...obj) => {return request.get(`${path}` ,  ...obj) }
export const postFun = (path , ...obj) => {return request.post(`${path}` , ...obj)}
export const putFun = (path , ...obj) => {return request.put(`${path}` , ...obj)}
export const deleteFun = (path , ...obj) => {return request.delete(`${path}` , ...obj)}



