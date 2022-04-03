import { Controller, controller, get, response } from '@envuso/core/Routing';
import { DomainsService } from '../../Services/Domain/DomainsService';
import { Inertia } from '@envuso/core/Packages/Inertia/Inertia';

@controller('/domains')
export class DomainsController extends Controller {

  constructor(
    private domainsService: DomainsService
  ) {
    super();
  }


  @get('/')
  async index() {
    let domains;
    try {
      domains = await this.domainsService.getUserDomains();
    } catch (e) {
      console.error(e.message);
      return response().view('exception', {
        title: 'Something went wrong.'
      });
    }

    return Inertia.render('Domains', { domains });
  }

}
