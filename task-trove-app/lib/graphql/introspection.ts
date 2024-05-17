/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
const introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Account",
        "fields": [
          {
            "name": "country_code",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "first_day_of_the_week",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FirstDayOfTheWeek"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "logo",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "plan",
            "type": {
              "kind": "OBJECT",
              "name": "Plan"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "products",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountProduct"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "show_timeline_weekends",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sign_up_product_kind",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "slug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tier",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AccountProduct",
        "fields": [
          {
            "name": "default_workspace_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ActivityLogType",
        "fields": [
          {
            "name": "account_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "entity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "event",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "user_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppInstall",
        "fields": [
          {
            "name": "app_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "app_install_account",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppInstallAccount"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "app_install_user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppInstallUser"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "app_version",
            "type": {
              "kind": "OBJECT",
              "name": "AppVersion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "permissions",
            "type": {
              "kind": "OBJECT",
              "name": "AppInstallPermissions"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppInstallAccount",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppInstallPermissions",
        "fields": [
          {
            "name": "approved_scopes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "required_scopes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppInstallUser",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppMonetizationStatus",
        "fields": [
          {
            "name": "is_supported",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppSubscription",
        "fields": [
          {
            "name": "billing_period",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "days_left",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_trial",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "plan_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pricing_version",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "renewal_date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppSubscriptionOperationsCounter",
        "fields": [
          {
            "name": "app_subscription",
            "type": {
              "kind": "OBJECT",
              "name": "AppSubscription"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "counter_value",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "period_key",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppVersion",
        "fields": [
          {
            "name": "major",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "minor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "patch",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Asset",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "file_extension",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "file_size",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "original_geometry",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "public_url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "uploaded_by",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url_thumbnail",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "AssetsSource",
        "enumValues": [
          {
            "name": "all",
            "isDeprecated": false
          },
          {
            "name": "columns",
            "isDeprecated": false
          },
          {
            "name": "gallery",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Board",
        "fields": [
          {
            "name": "activity_logs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActivityLogType"
              }
            },
            "args": [
              {
                "name": "column_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "from",
                "type": {
                  "kind": "SCALAR",
                  "name": "ISO8601DateTime"
                }
              },
              {
                "name": "group_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "item_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              },
              {
                "name": "to",
                "type": {
                  "kind": "SCALAR",
                  "name": "ISO8601DateTime"
                }
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "board_folder_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "board_kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "BoardKind"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "columns",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "types",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "ColumnType"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "communication",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "groups",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Group"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "item_terminology",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items_count",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items_page",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ItemsResponse"
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                },
                "defaultValue": "25"
              },
              {
                "name": "query_params",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQuery"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [],
            "isDeprecated": true
          },
          {
            "name": "owners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "permissions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "state",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "State"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subscribers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tags",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Tag"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "team_owners",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Team"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "team_subscribers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Team"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "top_group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Group"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "ENUM",
              "name": "BoardObjectType"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "ISO8601DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Update"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "views",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BoardView"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "workspace",
            "type": {
              "kind": "OBJECT",
              "name": "Workspace"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "workspace_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "BoardAttributes",
        "enumValues": [
          {
            "name": "communication",
            "isDeprecated": false
          },
          {
            "name": "description",
            "isDeprecated": false
          },
          {
            "name": "name",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BoardDuplication",
        "fields": [
          {
            "name": "board",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Board"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_async",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "BoardKind",
        "enumValues": [
          {
            "name": "private",
            "isDeprecated": false
          },
          {
            "name": "public",
            "isDeprecated": false
          },
          {
            "name": "share",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "BoardObjectType",
        "enumValues": [
          {
            "name": "board",
            "isDeprecated": false
          },
          {
            "name": "custom_object",
            "isDeprecated": false
          },
          {
            "name": "document",
            "isDeprecated": false
          },
          {
            "name": "sub_items_board",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BoardRelationValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display_value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_item_ids",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Item"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "BoardSubscriberKind",
        "enumValues": [
          {
            "name": "owner",
            "isDeprecated": false
          },
          {
            "name": "subscriber",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BoardView",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "settings_str",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "source_view_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "view_specific_data_str",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "BoardsOrderBy",
        "enumValues": [
          {
            "name": "created_at",
            "isDeprecated": false
          },
          {
            "name": "used_at",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "OBJECT",
        "name": "ButtonValue",
        "fields": [
          {
            "name": "color",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ChangeTeamMembershipsResult",
        "fields": [
          {
            "name": "failed_users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "successful_users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CheckboxValue",
        "fields": [
          {
            "name": "checked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ColorPickerValue",
        "fields": [
          {
            "name": "color",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Column",
        "fields": [
          {
            "name": "archived",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "settings_str",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ColumnMappingInput",
        "inputFields": [
          {
            "name": "source",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "target",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "ENUM",
        "name": "ColumnProperty",
        "enumValues": [
          {
            "name": "description",
            "isDeprecated": false
          },
          {
            "name": "title",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ColumnType",
        "enumValues": [
          {
            "name": "auto_number",
            "isDeprecated": false
          },
          {
            "name": "board_relation",
            "isDeprecated": false
          },
          {
            "name": "button",
            "isDeprecated": false
          },
          {
            "name": "checkbox",
            "isDeprecated": false
          },
          {
            "name": "color_picker",
            "isDeprecated": false
          },
          {
            "name": "country",
            "isDeprecated": false
          },
          {
            "name": "creation_log",
            "isDeprecated": false
          },
          {
            "name": "date",
            "isDeprecated": false
          },
          {
            "name": "dependency",
            "isDeprecated": false
          },
          {
            "name": "doc",
            "isDeprecated": false
          },
          {
            "name": "dropdown",
            "isDeprecated": false
          },
          {
            "name": "email",
            "isDeprecated": false
          },
          {
            "name": "file",
            "isDeprecated": false
          },
          {
            "name": "formula",
            "isDeprecated": false
          },
          {
            "name": "group",
            "isDeprecated": false
          },
          {
            "name": "hour",
            "isDeprecated": false
          },
          {
            "name": "integration",
            "isDeprecated": false
          },
          {
            "name": "item_assignees",
            "isDeprecated": false
          },
          {
            "name": "item_id",
            "isDeprecated": false
          },
          {
            "name": "last_updated",
            "isDeprecated": false
          },
          {
            "name": "link",
            "isDeprecated": false
          },
          {
            "name": "location",
            "isDeprecated": false
          },
          {
            "name": "long_text",
            "isDeprecated": false
          },
          {
            "name": "mirror",
            "isDeprecated": false
          },
          {
            "name": "name",
            "isDeprecated": false
          },
          {
            "name": "numbers",
            "isDeprecated": false
          },
          {
            "name": "people",
            "isDeprecated": false
          },
          {
            "name": "person",
            "isDeprecated": false
          },
          {
            "name": "phone",
            "isDeprecated": false
          },
          {
            "name": "progress",
            "isDeprecated": false
          },
          {
            "name": "rating",
            "isDeprecated": false
          },
          {
            "name": "status",
            "isDeprecated": false
          },
          {
            "name": "subtasks",
            "isDeprecated": false
          },
          {
            "name": "tags",
            "isDeprecated": false
          },
          {
            "name": "team",
            "isDeprecated": false
          },
          {
            "name": "text",
            "isDeprecated": false
          },
          {
            "name": "time_tracking",
            "isDeprecated": false
          },
          {
            "name": "timeline",
            "isDeprecated": false
          },
          {
            "name": "unsupported",
            "isDeprecated": false
          },
          {
            "name": "vote",
            "isDeprecated": false
          },
          {
            "name": "week",
            "isDeprecated": false
          },
          {
            "name": "world_clock",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ColumnValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "BoardRelationValue"
          },
          {
            "kind": "OBJECT",
            "name": "ButtonValue"
          },
          {
            "kind": "OBJECT",
            "name": "CheckboxValue"
          },
          {
            "kind": "OBJECT",
            "name": "ColorPickerValue"
          },
          {
            "kind": "OBJECT",
            "name": "CountryValue"
          },
          {
            "kind": "OBJECT",
            "name": "CreationLogValue"
          },
          {
            "kind": "OBJECT",
            "name": "DateValue"
          },
          {
            "kind": "OBJECT",
            "name": "DependencyValue"
          },
          {
            "kind": "OBJECT",
            "name": "DocValue"
          },
          {
            "kind": "OBJECT",
            "name": "DropdownValue"
          },
          {
            "kind": "OBJECT",
            "name": "EmailValue"
          },
          {
            "kind": "OBJECT",
            "name": "FileValue"
          },
          {
            "kind": "OBJECT",
            "name": "FormulaValue"
          },
          {
            "kind": "OBJECT",
            "name": "GroupValue"
          },
          {
            "kind": "OBJECT",
            "name": "HourValue"
          },
          {
            "kind": "OBJECT",
            "name": "IntegrationValue"
          },
          {
            "kind": "OBJECT",
            "name": "ItemIdValue"
          },
          {
            "kind": "OBJECT",
            "name": "LastUpdatedValue"
          },
          {
            "kind": "OBJECT",
            "name": "LinkValue"
          },
          {
            "kind": "OBJECT",
            "name": "LocationValue"
          },
          {
            "kind": "OBJECT",
            "name": "LongTextValue"
          },
          {
            "kind": "OBJECT",
            "name": "MirrorValue"
          },
          {
            "kind": "OBJECT",
            "name": "NumbersValue"
          },
          {
            "kind": "OBJECT",
            "name": "PeopleValue"
          },
          {
            "kind": "OBJECT",
            "name": "PersonValue"
          },
          {
            "kind": "OBJECT",
            "name": "PhoneValue"
          },
          {
            "kind": "OBJECT",
            "name": "ProgressValue"
          },
          {
            "kind": "OBJECT",
            "name": "RatingValue"
          },
          {
            "kind": "OBJECT",
            "name": "StatusValue"
          },
          {
            "kind": "OBJECT",
            "name": "SubtasksValue"
          },
          {
            "kind": "OBJECT",
            "name": "TagsValue"
          },
          {
            "kind": "OBJECT",
            "name": "TeamValue"
          },
          {
            "kind": "OBJECT",
            "name": "TextValue"
          },
          {
            "kind": "OBJECT",
            "name": "TimeTrackingValue"
          },
          {
            "kind": "OBJECT",
            "name": "TimelineValue"
          },
          {
            "kind": "OBJECT",
            "name": "UnsupportedValue"
          },
          {
            "kind": "OBJECT",
            "name": "VoteValue"
          },
          {
            "kind": "OBJECT",
            "name": "WeekValue"
          },
          {
            "kind": "OBJECT",
            "name": "WorldClockValue"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "CompareValue"
      },
      {
        "kind": "OBJECT",
        "name": "Complexity",
        "fields": [
          {
            "name": "after",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "before",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reset_in_x_seconds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Country",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CountryValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "country",
            "type": {
              "kind": "OBJECT",
              "name": "Country"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreationLogValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Date"
      },
      {
        "kind": "OBJECT",
        "name": "DateValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "date",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "icon",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DependencyValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display_value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_item_ids",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Item"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DocValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "file",
            "type": {
              "kind": "OBJECT",
              "name": "FileDocValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DropdownValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "values",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DropdownValueOption"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DropdownValueOption",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "DuplicateBoardType",
        "enumValues": [
          {
            "name": "duplicate_board_with_pulses",
            "isDeprecated": false
          },
          {
            "name": "duplicate_board_with_pulses_and_updates",
            "isDeprecated": false
          },
          {
            "name": "duplicate_board_with_structure",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EmailValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "File"
      },
      {
        "kind": "OBJECT",
        "name": "FileAssetValue",
        "fields": [
          {
            "name": "asset",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Asset"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "asset_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FileDocValue",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "file_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "object_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FileLinkValue",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "file_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FileLinkValueKind"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "FileLinkValueKind",
        "enumValues": [
          {
            "name": "box",
            "isDeprecated": false
          },
          {
            "name": "dropbox",
            "isDeprecated": false
          },
          {
            "name": "google_drive",
            "isDeprecated": false
          },
          {
            "name": "link",
            "isDeprecated": false
          },
          {
            "name": "onedrive",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FileValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "files",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "FileValueItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "FileValueItem",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "FileAssetValue"
          },
          {
            "kind": "OBJECT",
            "name": "FileDocValue"
          },
          {
            "kind": "OBJECT",
            "name": "FileLinkValue"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "FirstDayOfTheWeek",
        "enumValues": [
          {
            "name": "monday",
            "isDeprecated": false
          },
          {
            "name": "sunday",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "OBJECT",
        "name": "Folder",
        "fields": [
          {
            "name": "children",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Board"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "color",
            "type": {
              "kind": "ENUM",
              "name": "FolderColor"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parent",
            "type": {
              "kind": "OBJECT",
              "name": "Folder"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sub_folders",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Folder"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "workspace",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Workspace"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "FolderColor",
        "enumValues": [
          {
            "name": "AQUAMARINE",
            "isDeprecated": false
          },
          {
            "name": "BRIGHT_BLUE",
            "isDeprecated": false
          },
          {
            "name": "BRIGHT_GREEN",
            "isDeprecated": false
          },
          {
            "name": "CHILI_BLUE",
            "isDeprecated": false
          },
          {
            "name": "DARK_ORANGE",
            "isDeprecated": false
          },
          {
            "name": "DARK_PURPLE",
            "isDeprecated": false
          },
          {
            "name": "DARK_RED",
            "isDeprecated": false
          },
          {
            "name": "DONE_GREEN",
            "isDeprecated": false
          },
          {
            "name": "INDIGO",
            "isDeprecated": false
          },
          {
            "name": "LIPSTICK",
            "isDeprecated": false
          },
          {
            "name": "NULL",
            "isDeprecated": false
          },
          {
            "name": "PURPLE",
            "isDeprecated": false
          },
          {
            "name": "SOFIA_PINK",
            "isDeprecated": false
          },
          {
            "name": "STUCK_RED",
            "isDeprecated": false
          },
          {
            "name": "SUNSET",
            "isDeprecated": false
          },
          {
            "name": "WORKING_ORANGE",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FormulaValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Group",
        "fields": [
          {
            "name": "archived",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "color",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "deleted",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items_page",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ItemsResponse"
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                },
                "defaultValue": "25"
              },
              {
                "name": "query_params",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQuery"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "position",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "GroupAttributes",
        "enumValues": [
          {
            "name": "color",
            "isDeprecated": false
          },
          {
            "name": "position",
            "isDeprecated": false
          },
          {
            "name": "relative_position_after",
            "isDeprecated": false
          },
          {
            "name": "relative_position_before",
            "isDeprecated": false
          },
          {
            "name": "title",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "GroupValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "group_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "HourValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hour",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "minute",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "ISO8601DateTime"
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "OBJECT",
        "name": "IntegrationValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "entity_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "issue_api_url",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "issue_id",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Item",
        "fields": [
          {
            "name": "assets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Asset"
              }
            },
            "args": [
              {
                "name": "assets_source",
                "type": {
                  "kind": "ENUM",
                  "name": "AssetsSource"
                }
              },
              {
                "name": "column_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "board",
            "type": {
              "kind": "OBJECT",
              "name": "Board"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "column_values",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "ColumnValue"
                  }
                }
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String"
                    }
                  }
                }
              },
              {
                "name": "types",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "ColumnType"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Item"
                  }
                }
              }
            },
            "args": [
              {
                "name": "link_to_item_column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "linked_board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parent_item",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "relative_link",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "state",
            "type": {
              "kind": "ENUM",
              "name": "State"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subitems",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Item"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subscribers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Update"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ItemIdValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "item_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ItemsOrderByDirection",
        "enumValues": [
          {
            "name": "asc",
            "isDeprecated": false
          },
          {
            "name": "desc",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ItemsPageByColumnValuesQuery",
        "inputFields": [
          {
            "name": "column_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "column_values",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ItemsQuery",
        "inputFields": [
          {
            "name": "groups",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQueryGroup"
                }
              }
            }
          },
          {
            "name": "ids",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            }
          },
          {
            "name": "operator",
            "type": {
              "kind": "ENUM",
              "name": "ItemsQueryOperator"
            },
            "defaultValue": "and"
          },
          {
            "name": "order_by",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQueryOrderBy"
                }
              }
            }
          },
          {
            "name": "rules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQueryRule"
                }
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ItemsQueryGroup",
        "inputFields": [
          {
            "name": "groups",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQueryGroup"
                }
              }
            }
          },
          {
            "name": "operator",
            "type": {
              "kind": "ENUM",
              "name": "ItemsQueryOperator"
            },
            "defaultValue": "and"
          },
          {
            "name": "rules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ItemsQueryRule"
                }
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "ENUM",
        "name": "ItemsQueryOperator",
        "enumValues": [
          {
            "name": "and",
            "isDeprecated": false
          },
          {
            "name": "or",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ItemsQueryOrderBy",
        "inputFields": [
          {
            "name": "column_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "direction",
            "type": {
              "kind": "ENUM",
              "name": "ItemsOrderByDirection"
            },
            "defaultValue": "asc"
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ItemsQueryRule",
        "inputFields": [
          {
            "name": "column_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "compare_attribute",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "compare_value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "CompareValue"
              }
            }
          },
          {
            "name": "operator",
            "type": {
              "kind": "ENUM",
              "name": "ItemsQueryRuleOperator"
            },
            "defaultValue": "any_of"
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "ENUM",
        "name": "ItemsQueryRuleOperator",
        "enumValues": [
          {
            "name": "any_of",
            "isDeprecated": false
          },
          {
            "name": "between",
            "isDeprecated": false
          },
          {
            "name": "contains_terms",
            "isDeprecated": false
          },
          {
            "name": "contains_text",
            "isDeprecated": false
          },
          {
            "name": "ends_with",
            "isDeprecated": false
          },
          {
            "name": "greater_than",
            "isDeprecated": false
          },
          {
            "name": "greater_than_or_equals",
            "isDeprecated": false
          },
          {
            "name": "is_empty",
            "isDeprecated": false
          },
          {
            "name": "is_not_empty",
            "isDeprecated": false
          },
          {
            "name": "lower_than",
            "isDeprecated": false
          },
          {
            "name": "lower_than_or_equal",
            "isDeprecated": false
          },
          {
            "name": "not_any_of",
            "isDeprecated": false
          },
          {
            "name": "not_contains_text",
            "isDeprecated": false
          },
          {
            "name": "starts_with",
            "isDeprecated": false
          },
          {
            "name": "within_the_last",
            "isDeprecated": false
          },
          {
            "name": "within_the_next",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ItemsResponse",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Item"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "JSON"
      },
      {
        "kind": "ENUM",
        "name": "Kind",
        "enumValues": [
          {
            "name": "person",
            "isDeprecated": false
          },
          {
            "name": "team",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "LastUpdatedValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updater",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updater_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "LinkValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url_text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "LocationValue",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "city_short",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "country",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "country_short",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "lat",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "lng",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "place_id",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "street",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "street_number",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "street_number_short",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "street_short",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "LongTextValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MirrorValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display_value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mirrored_items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MirroredItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MirroredItem",
        "fields": [
          {
            "name": "linked_board",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Board"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_board_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linked_item",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Item"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mirrored_value",
            "type": {
              "kind": "UNION",
              "name": "MirroredValue"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MirroredValue",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Board"
          },
          {
            "kind": "OBJECT",
            "name": "BoardRelationValue"
          },
          {
            "kind": "OBJECT",
            "name": "ButtonValue"
          },
          {
            "kind": "OBJECT",
            "name": "CheckboxValue"
          },
          {
            "kind": "OBJECT",
            "name": "ColorPickerValue"
          },
          {
            "kind": "OBJECT",
            "name": "CountryValue"
          },
          {
            "kind": "OBJECT",
            "name": "CreationLogValue"
          },
          {
            "kind": "OBJECT",
            "name": "DateValue"
          },
          {
            "kind": "OBJECT",
            "name": "DependencyValue"
          },
          {
            "kind": "OBJECT",
            "name": "DocValue"
          },
          {
            "kind": "OBJECT",
            "name": "DropdownValue"
          },
          {
            "kind": "OBJECT",
            "name": "EmailValue"
          },
          {
            "kind": "OBJECT",
            "name": "FileValue"
          },
          {
            "kind": "OBJECT",
            "name": "FormulaValue"
          },
          {
            "kind": "OBJECT",
            "name": "Group"
          },
          {
            "kind": "OBJECT",
            "name": "GroupValue"
          },
          {
            "kind": "OBJECT",
            "name": "HourValue"
          },
          {
            "kind": "OBJECT",
            "name": "IntegrationValue"
          },
          {
            "kind": "OBJECT",
            "name": "ItemIdValue"
          },
          {
            "kind": "OBJECT",
            "name": "LastUpdatedValue"
          },
          {
            "kind": "OBJECT",
            "name": "LinkValue"
          },
          {
            "kind": "OBJECT",
            "name": "LocationValue"
          },
          {
            "kind": "OBJECT",
            "name": "LongTextValue"
          },
          {
            "kind": "OBJECT",
            "name": "MirrorValue"
          },
          {
            "kind": "OBJECT",
            "name": "NumbersValue"
          },
          {
            "kind": "OBJECT",
            "name": "PeopleValue"
          },
          {
            "kind": "OBJECT",
            "name": "PersonValue"
          },
          {
            "kind": "OBJECT",
            "name": "PhoneValue"
          },
          {
            "kind": "OBJECT",
            "name": "ProgressValue"
          },
          {
            "kind": "OBJECT",
            "name": "RatingValue"
          },
          {
            "kind": "OBJECT",
            "name": "StatusValue"
          },
          {
            "kind": "OBJECT",
            "name": "SubtasksValue"
          },
          {
            "kind": "OBJECT",
            "name": "TagsValue"
          },
          {
            "kind": "OBJECT",
            "name": "TeamValue"
          },
          {
            "kind": "OBJECT",
            "name": "TextValue"
          },
          {
            "kind": "OBJECT",
            "name": "TimeTrackingValue"
          },
          {
            "kind": "OBJECT",
            "name": "TimelineValue"
          },
          {
            "kind": "OBJECT",
            "name": "UnsupportedValue"
          },
          {
            "kind": "OBJECT",
            "name": "VoteValue"
          },
          {
            "kind": "OBJECT",
            "name": "WeekValue"
          },
          {
            "kind": "OBJECT",
            "name": "WorldClockValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "add_file_to_column",
            "type": {
              "kind": "OBJECT",
              "name": "Asset"
            },
            "args": [
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "file",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "File"
                  }
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_file_to_update",
            "type": {
              "kind": "OBJECT",
              "name": "Asset"
            },
            "args": [
              {
                "name": "file",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "File"
                  }
                }
              },
              {
                "name": "update_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_subscribers_to_board",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "BoardSubscriberKind"
                },
                "defaultValue": "subscriber"
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": true
          },
          {
            "name": "add_teams_to_board",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "BoardSubscriberKind"
                },
                "defaultValue": "subscriber"
              },
              {
                "name": "team_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_teams_to_workspace",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "WorkspaceSubscriberKind"
                },
                "defaultValue": "subscriber"
              },
              {
                "name": "team_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_users_to_board",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "BoardSubscriberKind"
                },
                "defaultValue": "subscriber"
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_users_to_team",
            "type": {
              "kind": "OBJECT",
              "name": "ChangeTeamMembershipsResult"
            },
            "args": [
              {
                "name": "team_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "add_users_to_workspace",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "WorkspaceSubscriberKind"
                },
                "defaultValue": "subscriber"
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "archive_board",
            "type": {
              "kind": "OBJECT",
              "name": "Board"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "archive_group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "archive_item",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "change_column_metadata",
            "type": {
              "kind": "OBJECT",
              "name": "Column"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "column_property",
                "type": {
                  "kind": "ENUM",
                  "name": "ColumnProperty"
                }
              },
              {
                "name": "value",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "change_column_title",
            "type": {
              "kind": "OBJECT",
              "name": "Column"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "change_column_value",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "create_labels_if_missing",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "JSON"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "change_multiple_column_values",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_values",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "JSON"
                  }
                }
              },
              {
                "name": "create_labels_if_missing",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "change_simple_column_value",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "create_labels_if_missing",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "value",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "clear_item_updates",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "item_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "complexity",
            "type": {
              "kind": "OBJECT",
              "name": "Complexity"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "create_board",
            "type": {
              "kind": "OBJECT",
              "name": "Board"
            },
            "args": [
              {
                "name": "board_kind",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "BoardKind"
                  }
                }
              },
              {
                "name": "board_name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "board_owner_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "board_owner_team_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "board_subscriber_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "board_subscriber_teams_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "empty",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "folder_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "template_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_column",
            "type": {
              "kind": "OBJECT",
              "name": "Column"
            },
            "args": [
              {
                "name": "after_column_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "ColumnType"
                  }
                }
              },
              {
                "name": "defaults",
                "type": {
                  "kind": "SCALAR",
                  "name": "JSON"
                }
              },
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_folder",
            "type": {
              "kind": "OBJECT",
              "name": "Folder"
            },
            "args": [
              {
                "name": "color",
                "type": {
                  "kind": "ENUM",
                  "name": "FolderColor"
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "parent_folder_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "group_color",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "group_name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "position",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "position_relative_method",
                "type": {
                  "kind": "ENUM",
                  "name": "PositionRelative"
                }
              },
              {
                "name": "relative_to",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_item",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_values",
                "type": {
                  "kind": "SCALAR",
                  "name": "JSON"
                }
              },
              {
                "name": "create_labels_if_missing",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "item_name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "position_relative_method",
                "type": {
                  "kind": "ENUM",
                  "name": "PositionRelative"
                }
              },
              {
                "name": "relative_to",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_notification",
            "type": {
              "kind": "OBJECT",
              "name": "Notification"
            },
            "args": [
              {
                "name": "target_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "target_type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "NotificationTargetType"
                  }
                }
              },
              {
                "name": "text",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "user_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_or_get_tag",
            "type": {
              "kind": "OBJECT",
              "name": "Tag"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "tag_name",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_subitem",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "column_values",
                "type": {
                  "kind": "SCALAR",
                  "name": "JSON"
                }
              },
              {
                "name": "create_labels_if_missing",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "item_name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "parent_item_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_update",
            "type": {
              "kind": "OBJECT",
              "name": "Update"
            },
            "args": [
              {
                "name": "body",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "parent_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_webhook",
            "type": {
              "kind": "OBJECT",
              "name": "Webhook"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "config",
                "type": {
                  "kind": "SCALAR",
                  "name": "JSON"
                }
              },
              {
                "name": "event",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "WebhookEventType"
                  }
                }
              },
              {
                "name": "url",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "create_workspace",
            "type": {
              "kind": "OBJECT",
              "name": "Workspace"
            },
            "args": [
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "WorkspaceKind"
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_board",
            "type": {
              "kind": "OBJECT",
              "name": "Board"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_column",
            "type": {
              "kind": "OBJECT",
              "name": "Column"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "column_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_folder",
            "type": {
              "kind": "OBJECT",
              "name": "Folder"
            },
            "args": [
              {
                "name": "folder_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_item",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_subscribers_from_board",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_teams_from_board",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "team_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_teams_from_workspace",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "team_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_update",
            "type": {
              "kind": "OBJECT",
              "name": "Update"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_users_from_workspace",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_webhook",
            "type": {
              "kind": "OBJECT",
              "name": "Webhook"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delete_workspace",
            "type": {
              "kind": "OBJECT",
              "name": "Workspace"
            },
            "args": [
              {
                "name": "workspace_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "duplicate_board",
            "type": {
              "kind": "OBJECT",
              "name": "BoardDuplication"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "board_name",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "duplicate_type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "DuplicateBoardType"
                  }
                }
              },
              {
                "name": "folder_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "keep_subscribers",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "workspace_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "duplicate_group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [
              {
                "name": "add_to_top",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "group_title",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "duplicate_item",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "with_updates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "increase_app_subscription_operations",
            "type": {
              "kind": "OBJECT",
              "name": "AppSubscriptionOperationsCounter"
            },
            "args": [
              {
                "name": "increment_by",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              },
              {
                "name": "kind",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                },
                "defaultValue": "\"global\""
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "like_update",
            "type": {
              "kind": "OBJECT",
              "name": "Update"
            },
            "args": [
              {
                "name": "update_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "move_item_to_board",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "columns_mapping",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ColumnMappingInput"
                    }
                  }
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "subitems_columns_mapping",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ColumnMappingInput"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "move_item_to_group",
            "type": {
              "kind": "OBJECT",
              "name": "Item"
            },
            "args": [
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "item_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "remove_users_from_team",
            "type": {
              "kind": "OBJECT",
              "name": "ChangeTeamMembershipsResult"
            },
            "args": [
              {
                "name": "team_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "user_ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "update_board",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [
              {
                "name": "board_attribute",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "BoardAttributes"
                  }
                }
              },
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "new_value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "update_folder",
            "type": {
              "kind": "OBJECT",
              "name": "Folder"
            },
            "args": [
              {
                "name": "color",
                "type": {
                  "kind": "ENUM",
                  "name": "FolderColor"
                }
              },
              {
                "name": "folder_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "parent_folder_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "update_group",
            "type": {
              "kind": "OBJECT",
              "name": "Group"
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "group_attribute",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "GroupAttributes"
                  }
                }
              },
              {
                "name": "group_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "new_value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "update_workspace",
            "type": {
              "kind": "OBJECT",
              "name": "Workspace"
            },
            "args": [
              {
                "name": "attributes",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateWorkspaceAttributesInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Notification",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "NotificationTargetType",
        "enumValues": [
          {
            "name": "Post",
            "isDeprecated": false
          },
          {
            "name": "Project",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NumberValueUnitDirection",
        "enumValues": [
          {
            "name": "left",
            "isDeprecated": false
          },
          {
            "name": "right",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NumbersValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "direction",
            "type": {
              "kind": "ENUM",
              "name": "NumberValueUnitDirection"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "number",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "OutOfOffice",
        "fields": [
          {
            "name": "active",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "disable_notifications",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "end_date",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "start_date",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PeopleEntity",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "ENUM",
              "name": "Kind"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PeopleValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "persons_and_teams",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PeopleEntity"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PersonValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "person_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PhoneValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "country_short_name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "phone",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Plan",
        "fields": [
          {
            "name": "max_users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "period",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tier",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "PositionRelative",
        "enumValues": [
          {
            "name": "after_at",
            "isDeprecated": false
          },
          {
            "name": "before_at",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProgressValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "account",
            "type": {
              "kind": "OBJECT",
              "name": "Account"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "app_installs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppInstall"
              }
            },
            "args": [
              {
                "name": "account_id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "app_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "app_subscription_operations",
            "type": {
              "kind": "OBJECT",
              "name": "AppSubscriptionOperationsCounter"
            },
            "args": [
              {
                "name": "kind",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                },
                "defaultValue": "\"global\""
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "apps_monetization_status",
            "type": {
              "kind": "OBJECT",
              "name": "AppMonetizationStatus"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "assets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Asset"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "ID"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "boards",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Board"
              }
            },
            "args": [
              {
                "name": "board_kind",
                "type": {
                  "kind": "ENUM",
                  "name": "BoardKind"
                }
              },
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "ENUM",
                  "name": "BoardsOrderBy"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              },
              {
                "name": "state",
                "type": {
                  "kind": "ENUM",
                  "name": "State"
                },
                "defaultValue": "active"
              },
              {
                "name": "workspace_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "complexity",
            "type": {
              "kind": "OBJECT",
              "name": "Complexity"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "folders",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Folder"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              },
              {
                "name": "workspace_ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Item"
              }
            },
            "args": [
              {
                "name": "exclude_nonactive",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "newest_first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "items_page_by_column_values",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ItemsResponse"
              }
            },
            "args": [
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ItemsPageByColumnValuesQuery"
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                },
                "defaultValue": "25"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "next_items_page",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ItemsResponse"
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                },
                "defaultValue": "25"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "tags",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Tag"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "teams",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Update"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "emails",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "UserKind"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "newest_first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "non_active",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Version"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "versions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Version"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "webhooks",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Webhook"
              }
            },
            "args": [
              {
                "name": "app_webhooks_only",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "board_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "workspaces",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Workspace"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "WorkspaceKind"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "ENUM",
                  "name": "WorkspacesOrderBy"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              },
              {
                "name": "state",
                "type": {
                  "kind": "ENUM",
                  "name": "State"
                },
                "defaultValue": "active"
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RatingValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "rating",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Reply",
        "fields": [
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text_body",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "State",
        "enumValues": [
          {
            "name": "active",
            "isDeprecated": false
          },
          {
            "name": "all",
            "isDeprecated": false
          },
          {
            "name": "archived",
            "isDeprecated": false
          },
          {
            "name": "deleted",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "StatusLabelStyle",
        "fields": [
          {
            "name": "border",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "color",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "StatusValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "index",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_done",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label_style",
            "type": {
              "kind": "OBJECT",
              "name": "StatusLabelStyle"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "update_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "OBJECT",
        "name": "SubtasksValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display_value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subitems",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Item"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subitems_ids",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Tag",
        "fields": [
          {
            "name": "color",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TagsValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tag_ids",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Tag"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Team",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User"
                  }
                }
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "picture_url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "emails",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              },
              {
                "name": "kind",
                "type": {
                  "kind": "ENUM",
                  "name": "UserKind"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "newest_first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "non_active",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TeamValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "team_id",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TextValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TimeTrackingHistoryItem",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ended_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ended_user_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "manually_entered_end_date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "manually_entered_end_time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "manually_entered_start_date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "manually_entered_start_time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "started_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "started_user_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimeTrackingValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "duration",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "history",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TimeTrackingHistoryItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "running",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "started_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TimelineValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "from",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "to",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "visualization_type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "UnsupportedValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Update",
        "fields": [
          {
            "name": "assets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Asset"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "creator_id",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "item_id",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "replies",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Reply"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text_body",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateWorkspaceAttributesInput",
        "inputFields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "kind",
            "type": {
              "kind": "ENUM",
              "name": "WorkspaceKind"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "account",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "birthday",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "country_code",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "current_language",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "enabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_admin",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_guest",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_pending",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_verified",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_view_only",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "join_date",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "last_activity",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "location",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mobile_phone",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "out_of_office",
            "type": {
              "kind": "OBJECT",
              "name": "OutOfOffice"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "phone",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "photo_original",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "photo_small",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "photo_thumb",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "photo_thumb_small",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "photo_tiny",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sign_up_product_kind",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "teams",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID"
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "time_zone_identifier",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "utc_hours_diff",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "UserKind",
        "enumValues": [
          {
            "name": "all",
            "isDeprecated": false
          },
          {
            "name": "guests",
            "isDeprecated": false
          },
          {
            "name": "non_guests",
            "isDeprecated": false
          },
          {
            "name": "non_pending",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Version",
        "fields": [
          {
            "name": "display_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "VersionKind"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "VersionKind",
        "enumValues": [
          {
            "name": "current",
            "isDeprecated": false
          },
          {
            "name": "deprecated",
            "isDeprecated": false
          },
          {
            "name": "dev",
            "isDeprecated": false
          },
          {
            "name": "maintenance",
            "isDeprecated": false
          },
          {
            "name": "release_candidate",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "VoteValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "vote_count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "voter_ids",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "voters",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Webhook",
        "fields": [
          {
            "name": "board_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "config",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "event",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "WebhookEventType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "WebhookEventType",
        "enumValues": [
          {
            "name": "change_column_value",
            "isDeprecated": false
          },
          {
            "name": "change_name",
            "isDeprecated": false
          },
          {
            "name": "change_specific_column_value",
            "isDeprecated": false
          },
          {
            "name": "change_status_column_value",
            "isDeprecated": false
          },
          {
            "name": "change_subitem_column_value",
            "isDeprecated": false
          },
          {
            "name": "change_subitem_name",
            "isDeprecated": false
          },
          {
            "name": "create_column",
            "isDeprecated": false
          },
          {
            "name": "create_item",
            "isDeprecated": false
          },
          {
            "name": "create_subitem",
            "isDeprecated": false
          },
          {
            "name": "create_subitem_update",
            "isDeprecated": false
          },
          {
            "name": "create_update",
            "isDeprecated": false
          },
          {
            "name": "delete_update",
            "isDeprecated": false
          },
          {
            "name": "edit_update",
            "isDeprecated": false
          },
          {
            "name": "item_archived",
            "isDeprecated": false
          },
          {
            "name": "item_deleted",
            "isDeprecated": false
          },
          {
            "name": "item_moved_to_any_group",
            "isDeprecated": false
          },
          {
            "name": "item_moved_to_specific_group",
            "isDeprecated": false
          },
          {
            "name": "item_restored",
            "isDeprecated": false
          },
          {
            "name": "move_subitem",
            "isDeprecated": false
          },
          {
            "name": "subitem_archived",
            "isDeprecated": false
          },
          {
            "name": "subitem_deleted",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WeekValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "end_date",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "start_date",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Workspace",
        "fields": [
          {
            "name": "account_product",
            "type": {
              "kind": "OBJECT",
              "name": "AccountProduct"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "is_default_workspace",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "ENUM",
              "name": "WorkspaceKind"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owners_subscribers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "settings",
            "type": {
              "kind": "OBJECT",
              "name": "WorkspaceSettings"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "state",
            "type": {
              "kind": "ENUM",
              "name": "State"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "team_owners_subscribers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Team"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "teams_subscribers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Team"
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "users_subscribers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "25"
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "1"
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "WorkspaceIcon",
        "fields": [
          {
            "name": "color",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "WorkspaceKind",
        "enumValues": [
          {
            "name": "closed",
            "isDeprecated": false
          },
          {
            "name": "open",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WorkspaceSettings",
        "fields": [
          {
            "name": "icon",
            "type": {
              "kind": "OBJECT",
              "name": "WorkspaceIcon"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "WorkspaceSubscriberKind",
        "enumValues": [
          {
            "name": "owner",
            "isDeprecated": false
          },
          {
            "name": "subscriber",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "WorkspacesOrderBy",
        "enumValues": [
          {
            "name": "created_at",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WorldClockValue",
        "fields": [
          {
            "name": "column",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Column"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timezone",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ColumnType"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ColumnValue"
          }
        ]
      }
    ],
    "directives": []
  }
} as const;

export { introspection };