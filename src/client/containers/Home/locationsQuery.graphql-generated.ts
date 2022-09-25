/* eslint-disable */
import * as Types from "../../types/graphql";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type GetLocationsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetLocationsQuery = {
  __typename?: "Query";
  locations: Array<{
    __typename?: "Location";
    id: string;
    name: string;
    description: string;
    photo: string;
  }>;
};

export const GetLocationsDocument = ({
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getLocations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "locations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "photo" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown) as DocumentNode<GetLocationsQuery, GetLocationsQueryVariables>;
