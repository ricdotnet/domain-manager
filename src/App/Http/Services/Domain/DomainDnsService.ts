import { injectable } from "@envuso/core/AppContainer";
import { request } from "@envuso/core/Routing";
import axios from "axios";
import Environment from "@envuso/core/AppContainer/Config/Environment";

@injectable()
export class DomainDnsService {

  private apiUrl  = Environment.get('CP_API_URL');
  private apiAuth = Environment.get('CP_API_AUTH_STRING');

  async getDns(type: string): Promise<any> {
    const { domain } = request().params().all();

    let response;
    try {
      response = await axios.get(`${this.apiUrl}/dns/manage/search-records.json?${this.apiAuth}&domain-name=${domain}&type=${type}&no-of-records=10&page-no=1`);
      return Promise.resolve(response.data);
    } catch (e) {
      // console.error(e);
      return Promise.reject(e);
    }
  }

}
