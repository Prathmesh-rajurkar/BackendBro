import { Parser } from "@dbml/core";
import type { Edge, Node } from "reactflow";

export function dbmlToReactFlow(dbml: string): { nodes: Node[]; edges: Edge[] } {
  const parsed = Parser.parse(dbml, "dbml");
  const schema = parsed.schemas[0];

  const nodes: Node[] = schema.tables.map((table: any, index: number) => {
    const tableName = table.name;
    const columns = table.columns ?? table.fields ?? [];

    const label = `
      🔷 ${tableName.toUpperCase()}
${columns.map((col: any) => `   • ${col.name}: ${col.type}`).join("\n")}
    `.trim();

    return {
      id: tableName,
      type: "default",
      position: { x: index * 300, y: 100 },
      data: { label },
      style: {
        whiteSpace: "pre-line",
        padding: 12,
        border: "1px solid #3f3f46",
        background: "#FFFFFF",
        color: "#000000",
        borderRadius: 10,
        fontFamily: "monospace",
        fontSize: 13,
        lineHeight: 1.4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        width: 240,
      },
    };
  });

  const edges: Edge[] = schema.refs.map((ref: any, index: number) => {
    const from = ref.endpoints[0].tableName || ref.endpoints[0].table;
    const to = ref.endpoints[1].tableName || ref.endpoints[1].table;

    return {
      id: `edge-${index}`,
      source: from,
      target: to,
      type: "step",
      animated: true,
      style: {
        stroke: "#facc15", // amber-400
        strokeWidth: 2,
      },
    };
  });

  return { nodes, edges };
}
