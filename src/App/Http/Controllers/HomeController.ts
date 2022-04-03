import { Controller, controller, get } from "@envuso/core/Routing";
import { Inertia } from "@envuso/core/Packages/Inertia/Inertia";

@controller('/')
export class HomeController extends Controller {

  @get('/')
  async index() {
    return Inertia.render('Home');
  }

}
