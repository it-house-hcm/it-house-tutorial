---
to: <%= h.dir(name) %>/<%= h.name(name, true) %>.service.ts
---

import { CrudService } from "<%= h.importPath(name, 'src/base/crudService') %>";
import { <%= h.name(name) %>, <%= h.name(name) %>Model } from "./<%= h.name(name, true) %>.model";

class <%= h.name(name) %>Service extends CrudService<<%= h.name(name) %>> {
  constructor() {
    super(<%= h.name(name) %>Model);
  }
}

export const <%= h.name(name, true) %>Service = new <%= h.name(name) %>Service();
