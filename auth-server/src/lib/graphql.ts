import { initGraphQLTada } from "@tryve-apps/monday-server-sdk";
import { introspection } from "@/types/graphql-env";

export const graphql = initGraphQLTada<{
  introspection: typeof introspection;
}>();

export type {
  FragmentOf,
  ResultOf,
  VariablesOf,
} from "@tryve-apps/monday-server-sdk";
export { readFragment } from "@tryve-apps/monday-server-sdk";
