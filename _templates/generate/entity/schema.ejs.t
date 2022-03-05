---
to: <%= h.dir(name) %>/<%= h.name(name, true) %>.schema.ts
---

import { gql } from "apollo-server-express";

export default gql`
    
    extend type Query {
        getAll<%= h.name(name) %>(q: QueryInput): <%= h.name(name) %>PageData
        getOne<%= h.name(name) %>(id: ID!): <%= h.name(name) %>
    }
    extend type Mutation {
        create<%= h.name(name) %>(data: Create<%= h.name(name) %>Input!): <%= h.name(name) %>
        update<%= h.name(name) %>(id: ID!, data: Update<%= h.name(name) %>Input!): <%= h.name(name) %>
        delete<%= h.name(name) %>(id: ID!): Boolean
    }
    type <%= h.name(name) %>PageData {
        data: [<%= h.name(name) %>]
        pagination: Pagination
    }
    type <%= h.name(name) %> {
        id: ID!
        createdAt: DateTime
        updatedAt: DateTime

    }

    input Create<%= h.name(name) %>Input {
        
    }

    input Update<%= h.name(name) %>Input {
        
    }

`;
