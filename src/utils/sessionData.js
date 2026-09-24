export const SESSION_INFO = {
  attendee: "Alexandre Mori",
  ticketKey: "AI-195",
  title: "Add Weather Widget & OpenCode Session Dashboard",
  confluenceUrl: "https://kramphub.atlassian.net/wiki/spaces/AI/pages/8211988532",
  galleryUrl: "https://kramphub.atlassian.net/wiki/spaces/AI/pages/7820476423",
  apiMountPath: "/api/_a/57a28de8-afc5-40e3-b53e-ff1e34e97b74/weather",
  stats: {
    tasksCompleted: 5,
    totalDeliverables: 5,
    artifactsRendered: 1,
    apiMountsRegistered: 1,
    confluencePagesPublished: 1
  },
  deliverables: [
    {
      id: "DEL-1",
      name: "Weather API Backend Mount",
      type: "API Endpoint",
      status: "Completed",
      details: "REST endpoint with Open-Meteo geocoding & 5-min Deno KV caching"
    },
    {
      id: "DEL-2",
      name: "Interactive Weather Widget",
      type: "Preact Artifact",
      status: "Completed",
      details: "Theme-adaptive UI with city search, °C/°F toggle & 7-day forecast"
    },
    {
      id: "DEL-3",
      name: "OpenCode Session Dashboard",
      type: "Preact Artifact",
      status: "Completed",
      details: "Metrics dashboard & deliverables tracking matrix"
    },
    {
      id: "DEL-4",
      name: "Confluence Session Documentation",
      type: "Confluence Page",
      status: "Published",
      details: "Alexandre Mori - OpenCode Sessions page updated"
    },
    {
      id: "DEL-5",
      name: "Automated Test Suite",
      type: "Unit Tests",
      status: "Passing",
      details: "Node.js unit test coverage for weather utilities and API handler"
    }
  ]
};
