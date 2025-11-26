# APIs

> **Source:** https://developer.domo.com/portal/8ba9aedad3679-ap-is
> Domo's APIs provide programmatic access to the powerful features of the Domo platform, enabling developers and data professionals to automate workflows, integrate external systems, and build custom data applications. Depending on the specific API and the tools you're using, authentication methods may vary — but in every case, your data's security is our top priority. Whether you're pulling data, pushing updates, or managing Users and DataSets, Domo’s APIs offer the flexibility and control you need to extend the value of your data.

## [

Which APIs should I use?
](#which-apis-should-i-use)
Domo offers several authentication methods, and the APIs available to you will vary based on the context in which you're developing.

1.  **App Framework APIs:** APIs available within the Domo App context.
2.  **Platform APIs:** APIs that use an OAuth 2.0 authorization and authentication pattern which allows you to define clients with a variety of scopes.
3.  **Product APIs:** APIs that allow you to do anything you can do in the Domo UI. Tokens generated for these APIs provide access to all resources the user has in Domo.
    API
    Auth Approach
    Auth Instructions
    Endpoint Coverage
    App Session Token
    [App Sessions Guide](https://developer.domo.com/portal/xma9hezmttvid-app-sessions)
    Limited to endpoints explicitly allowed by the App Framework.
    Platform
    API Client
    [Creating a Developer Client and Auth Token](https://developer.domo.com/portal/1845fc11bbe5d-api-authentication)
    Limited to a subset of all Product endpoints that can be given scopes.
    Product
    Access Token
    [Managing Access Tokens](https://domo-support.domo.com/s/article/360042934494?language=en_US)
    Access to all APIs corresponding to an action that can be taken in the Domo UI.
    If you're developing in the context of the [Domo App Framework](https://developer.domo.com/portal/d54m2ohkacza0-welcome), then you should use the App Framework APIs. This use-case includes both:

- [Building a Domo Brick](https://developer.domo.com/portal/0037739ab3747-domo-bricks-overview)
- [Building a Custom App on Domo](https://developer.domo.com/portal/d54m2ohkacza0-welcome)
  If you're developing against Domo outside of the Domo App context, you'll want to use either the Platform (OAuth) APIs or the Product APIs. This use-case may include:
- [Writing Code Engine Functions](https://domo-support.domo.com/s/article/000005173?language=en_US)
- [Scripting in Jupyter Workspaces](https://developer.domo.com/portal/4cjt7r72bnwlf-jupyter-workspaces)
- Scripting from outside of Domo
  The Platform APIs require using a client to regularly generate a refreshed access token, while the Product APIs only require a single access token. In general, Platform APIs are preferred because they allow for scoping clients to particular resources (e.g. Data, User, Dashboard, etc.) and their access tokens regularly expire and refresh. This reduces risk if you mistakenly leak your token.
  The Product APIs are much more expansive in what they enable you to do, but you'll need to be more careful managing access to them.
  In either case, admins have the ability to [revoke clients for the Platform APIs](https://domo-support.domo.com/s/article/000005240?language=en_US) or [tokens for the Product APIs](https://domo-support.domo.com/s/article/360042934494?language=en_US) at any time.
  ](#app-framework-apis)
  Typically, authentication for the [App Framework APIs](https://developer.domo.com/portal/1l1fm2g0sfm69-app-db-api) is handled automatically when developing with the [Domo Apps CLI](https://developer.domo.com/portal/rmfbkwje8kmqj-domo-apps-cli) through the `domo login` command or is inherited by virtue of developing from within your Domo Instance (e.g. building [Domo Bricks](https://developer.domo.com/portal/0037739ab3747-domo-bricks-overview)).
  Please note that some of the App Framework APIs share (or have a similar) name as related Platform (OAuth) APIs. This can cause confusion, so it's worth clarifying that the App Framework APIs are for use within the Domo App context and the Platform (OAuth) APIs are more generally accessible.
- [AI Service Layer API](https://developer.domo.com/portal/wjqiqhsvpadon-ai-service-layer-api-ai-pro)
- [AppDB API](https://developer.domo.com/portal/1l1fm2g0sfm69-app-db-api)
- [Code Engine API](https://developer.domo.com/portal/p48phjy7wwtw8-code-engine-api)
- [Data API](https://developer.domo.com/portal/8s3y9eldnjq8d-data-api)
- [Files API](https://developer.domo.com/portal/eeoadx67i6h46-files-api)
- [Groups API](https://developer.domo.com/portal/2hwa98wx7kdm4-groups-api)
- [Task Center API](https://developer.domo.com/portal/k2vv2vir3c8ry-task-center-api)
- [User API](https://developer.domo.com/portal/n7f7swo7h29wg-user-api)
- [Workflows API](https://developer.domo.com/portal/1ay1akbc787jg-workflows-api)
  ](#platform-oauth-apis)
  The Domo Platform APIs leverage the OAuth 2.0 authorization and authentication pattern. This means these APIs require creating and managing clients (which include a `client id`, `client secret`, and `scopes` to limit access). These clients can then be used to generate the `access token` passed in each subsequent API call. See the [OAuth API Authentication Quickstart](https://developer.domo.com/portal/1845fc11bbe5d-api-authentication) below for a walkthrough on how to generate clients.
- [Account API](https://developer.domo.com/portal/w8dk0f75hetfk-account-api)
- [Activity Log API](https://developer.domo.com/portal/i19jain6fvwjj-activity-log-api)
- [Cards API](https://developer.domo.com/portal/8260c0e561f08-cards-api)
- [DataSet API](https://developer.domo.com/portal/3b1e3a7d5f420-data-set-api)
- [Embed Token API](https://developer.domo.com/portal/uc9ls4li6ny8s-embed-token-api)
- [Group API](https://developer.domo.com/portal/6tw2454j0zttg-group-api)
- [Page API](https://developer.domo.com/portal/gcl6cvkh1x5nk-page-api)
- [Projects and Tasks API](https://developer.domo.com/portal/wnn8cxurat78o-projects-and-tasks-api)
- [Simple API](https://developer.domo.com/portal/jaqelzzxpee3e-simple-api)
- [Stream API](https://developer.domo.com/portal/lw7cqi3lqufah-stream-api)
- [User API](https://developer.domo.com/portal/v91hopqk7ki3b-user-api)
  ](#product-apis)
  Product APIs allow you to programmatically do anything you could do as your user in the Domo UI. It requires [generating an access token in Domo](https://domo-support.domo.com/s/article/360042934494?language=en_US) that you pass to each request via the `X-DOMO-Developer-Token` header, which simulates the same request that the Domo product makes.
  > #### [
  >
  > Server-side only
  > ](#server-side-only)
  > These APIs are CORS restricted, so they should only be called server-side when scripting against Domo. Due to this restriction, the "Try It" functionality in this documentation will not work, but the code snippet it generates (e.g. the curl request) should, provided that you replace `YOUR_INSTANCE` and `YOUR_TOKEN` with the appropriate values.
  > Documentation of many of the Product endpoints is underway. If you'd like to request documentation for a particular piece of functionality, please reach out to your CSM.
- [Activity Log API](https://developer.domo.com/portal/b90c3866dbc26-activity-log-api)
- [AI Services API](https://developer.domo.com/portal/ffvznqc76b2b5-ai-services-api-ai-pro)
- [Alerts API](https://developer.domo.com/portal/b09437e8d4d53-alerts-api)
- [Beast Modes API](https://developer.domo.com/portal/bff3ab39f7a6b-beast-modes)
- [Cards API](https://developer.domo.com/portal/22d11898c7994-update-card-title)
- [Certified Content API](https://developer.domo.com/portal/3c41213d16bb5-certified-content)
- [Connectors API](https://developer.domo.com/portal/1e640de669b27-connectors)
- [Data Accounts API](https://developer.domo.com/portal/17a8df3265783-data-accounts)
- [DataSets API](https://developer.domo.com/portal/35115c5c48927-datasets-api)
- [Files API](https://developer.domo.com/portal/9850f1f9ca01b-files-api)
- [Groups API](https://developer.domo.com/portal/9cb3d1d12bb26-group-documentation)
- [Pages API](../API-Reference/Product-APIs/Pages.md)
- [Roles Governance API](https://developer.domo.com/portal/6ebb96cd8be53-roles-governance-api)
- [Search API](https://developer.domo.com/portal/fce416aea276f-search-product-api)
- [Task Center API](https://developer.domo.com/portal/ff85f1d956ae2-task-center-api)
- [Users API](https://developer.domo.com/portal/98ab364f4848f-users-api)
- [Workflows API](https://developer.domo.com/portal/kspv2orr3oi30-workflows-product-api)
