

import { environment } from '../environments/environment'

export class AppConst {

    private static appurl = environment.apiUrl;

    public static get SEARCH(): string { return this.appurl + '/api/getCourseList' };
   
};