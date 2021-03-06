import axios from 'axios';
import store from '@/store/store';
import router from '@/router/route';

// axios 配置
axios.defaults.timeout = 9000;

axios.defaults.baseURL ='/pc';

//axios.defaults.baseURL='/mall/pc'
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
    	if(response.data.code=='401'){
    		 store.commit('LOGOUT');
    		  router.replace({
                        name: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
    	  }
        return response.data;
    },
    error => {
        console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
