import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const Diagram = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default Diagram;
