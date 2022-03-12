---
to: <%= h.dir(name) %>/<%= h.name(name, true) %>.model.ts
---

import { Document, Schema } from "mongoose";
import { BaseDocument } from "<%= h.importPath(name, 'src/base/baseModel') %>";
import { Mongo } from "<%= h.importPath(name, 'src/helpers/mongo') %>";
import { getModelDataLoader } from "<%= h.importPath(name, 'src/helpers/dataloader') %>";

export type <%= h.name(name) %> = BaseDocument & {
  name?: string; // Tên
};

const <%= h.name(name, true) %>Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const <%= h.name(name) %>Model = Mongo.model<<%= h.name(name) %>>("<%= h.name(name) %>",  <%= h.name(name, true) %>Schema);

export const <%= h.name(name) %>Loader = getModelDataLoader(<%= h.name(name) %>Model);