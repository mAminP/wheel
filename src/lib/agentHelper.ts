import { headers } from "next/headers";

export default function agentHelper() {
  const headerList = headers();
  const agent = headerList.get("user-agent");
  return {
    isGoogle: Boolean(agent && agent.toLowerCase().includes("googlebot")),
  };
}
