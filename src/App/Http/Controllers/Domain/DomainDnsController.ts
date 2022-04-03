import { Controller, controller, get, param, post, response } from "@envuso/core/Routing";
import { DomainDnsService } from '../../Services/Domain/DomainDnsService';
import { Inertia } from "@envuso/core/Packages/Inertia/Inertia";
import axios from "axios";
import Environment from "@envuso/core/AppContainer/Config/Environment";

@controller('/dns')
export class DomainDnsController extends Controller {

  constructor(
    private domainDnsService: DomainDnsService
  ) {
    super();
  }

  @get('/a/:domain')
  public async getDomainDns() {

    let dnsData;

    try {
      dnsData = await this.domainDnsService.getDns('A');
    } catch (e) {
      console.error(e.message);
      return response().setCode(500).json({ error: 'Something went wrong.' });
    }

    return Inertia.render('Domains', {
      dnsData
    });
  }

  @post('/add/a')
  public async addARecord() {

    return response().json({ m: 'added an a record' });
  }

  @post('/delete/a')
  public async deleteARecord() {

    return response().json({ m: 'deleted an a record' });
  }

  @post('/add/cname')
  public async addCnameRecord() {

    return response().json({ m: 'added a cname record' });
  }

  @post('/del/cname')
  public async deleteCnameRecord() {

    return response().json({ m: 'deleted cname record' });
  }
}
