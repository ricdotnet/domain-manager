import { injectable } from '@envuso/core/AppContainer';
import axios from 'axios';
import Environment from '@envuso/core/AppContainer/Config/Environment';

@injectable()
export class DomainsService {


  private apiUrl  = Environment.get('CP_API_URL');
  private apiAuth = Environment.get('CP_API_AUTH_STRING');

  private customerId = Environment.get('CUSTOMER_ID');

  async getUserDomains(): Promise<any> {
    let userDomains;
    try {
      userDomains = await axios.get(`${this.apiUrl}/domains/search.json?${this.apiAuth}&no-of-records=20&page-no=1&customer-id=${this.customerId}`);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(userDomains.data);
  }

}
