import APIService, { APIPromise } from './APIService';

class User extends APIService {
    static verifySessionUser() {
        const config = {
            method: 'get',
            url: '/user/session'
        };

        return APIPromise(config);
    }

    static getRole(ruid: string) {
        const config = {
            method: 'get',
            url: `/userrole/${ruid}`
        };

        return APIPromise(config);
    }

    static login({userName, password}: { userName: string, password: string }) {
        const config = {
            method: 'post',
            url: '/user/login',
            data: {userName, password}
        };

        return APIPromise(config);
    }

    static logout() {
        const config = {
            method: 'post',
            url: '/user/logout',
            data: {}
        };

        return APIPromise(config);
    }
}

export default User;
