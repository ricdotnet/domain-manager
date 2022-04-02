import { Controller, controller, dto, get, post, response } from "@envuso/core/Routing";
import axios from "axios";
import Environment from "@envuso/core/AppContainer/Config/Environment";
import { IPV4Dto } from "../../DataTransferObjects/IPV4Dto";

@controller('/')
export class DomainController extends Controller {

  private apiUrl  = Environment.get('CP_API_URL');
  private apiAuth = Environment.get('CP_API_AUTH_STRING');

  @get('/')
  public async index() {
    let res;
    try {
      res = await axios.get(`${this.apiUrl}/domains/details-by-name.json?${this.apiAuth}&domain-name=domain.com&options=OrderDetails&options=NsDetails`);
    } catch (e) {
      console.log(e.message);
      console.log('something went wrong');
      return response().json({ error: 'something went wrong' });
    }
    return response().json(res.data);
  }

  @post('/add/arecord')
  public async addARecord(@dto() body: IPV4Dto) {
    let res;
    try {
      res = await axios.post(`${this.apiUrl}/dns/manage/add-ipv4-record.json?${this.apiAuth}&domain-name=${body.domainName}&value=${body.ipAddress}&host=${body.subDomain}`);
    } catch (e) {
      console.log(e.message);
      console.log('something went wrong');
      return response().json({ error: 'something went wrong' });
    }
    return response().json(res.data);
  }

  @post('/del/arecord')
  public async removeARecord(@dto() body: IPV4Dto) {
    let res;
    try {
      res = await axios.post(`${this.apiUrl}/dns/manage/delete-ipv4-record.json?${this.apiAuth}&domain-name=${body.domainName}&host=${body.subDomain}&value=${body.ipAddress}`);
    } catch (e) {
      console.log(e.message);
      console.log('something went wrong')
      return response().json({ error: 'something went wrong' });
    }
    return response().json(res.data);
  }

}
