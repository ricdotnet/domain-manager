import { Controller, controller, get, post, response } from "@envuso/core/Routing";
import axios from "axios";
import Environment from "@envuso/core/AppContainer/Config/Environment";

//@middleware()
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

  @post('/addipv4record')
  public async addARecord() {
    let res;
    try {
      res = await axios.post(`${this.apiUrl}/dns/manage/add-ipv4-record.json?${this.apiAuth}&domain-name=domain.com&value=123.12.12.123&host=hello`);
    } catch (e) {
      console.log(e.message);
      console.log('something went wrong');
      return response().json({ error: 'something went wrong' });
    }
    return response().json(res.data);
  }

  @post('/deleteipv4record')
  public async removeARecord() {
    let res;
    try {
      res = await axios.post(`${this.apiUrl}/dns/manage/delete-ipv4-record.json?${this.apiAuth}&domain-name=domain.com&host=hello&value=123.12.12.123`);
    } catch (e) {
      console.log(e.message);
      console.log('something went wrong')
      return response().json({ error: 'something went wrong' });
    }
    return response().json(res.data);
  }

}
