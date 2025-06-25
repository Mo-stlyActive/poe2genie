"use client";
import React, { useEffect, useState } from "react";

interface PassiveNode {
  id: number;
  name: string;
  x: number;
  y: number;
  out: number[];
}

interface PassiveTreeData {
  nodes: PassiveNode[];
}

export default function PassiveTree({
  selectedNodes,
  setSelectedNodes,
  note,
  setNote,
}: {
  selectedNodes: number[];
  setSelectedNodes: (ids: number[]) => void;
  note: string;
  setNote: (n: string) => void;
}) {
  const [tree, setTree] = useState<PassiveTreeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTree() {
      setLoading(true);
      const res = await fetch("/poe-passive-tree.json");
      const data = await res.json();
      // Extract only the nodes we need (id, name, x, y, out)
      const nodes = Object.values(data.nodes).map((n: any) => ({
        id: n.id,
        name: n.dn,
        x: n.x,
        y: n.y,
        out: n.out,
      }));
      setTree({ nodes });
      setLoading(false);
    }
    loadTree();
  }, []);

  function handleNodeClick(id: number) {
    if (selectedNodes.includes(id)) {
      setSelectedNodes(selectedNodes.filter((nid) => nid !== id));
    } else {
      setSelectedNodes([...selectedNodes, id]);
    }
  }

  if (loading || !tree) return <div className="text-fuchsia-200">Loading passive tree...</div>;

  // Normalize positions for SVG
  const minX = Math.min(...tree.nodes.map((n) => n.x));
  const minY = Math.min(...tree.nodes.map((n) => n.y));
  const maxX = Math.max(...tree.nodes.map((n) => n.x));
  const maxY = Math.max(...tree.nodes.map((n) => n.y));
  const width = maxX - minX + 100;
  const height = maxY - minY + 100;

  return (
    <div className="bg-purple-950/80 rounded-2xl shadow-xl border-2 border-fuchsia-700/40 p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Passive Skill Tree</h2>
      <div className="mb-2 text-fuchsia-200">Skill Points Used: {selectedNodes.length}</div>
      <div className="overflow-auto" style={{ maxWidth: "100%", maxHeight: 600 }}>
        <svg width={width} height={height} style={{ background: "#1a102a" }}>
          {/* Draw connections */}
          {tree.nodes.map((node) =>
            node.out.map((outId) => {
              const target = tree.nodes.find((n) => n.id === outId);
              if (!target) return null;
              return (
                <line
                  key={node.id + "-" + outId}
                  x1={node.x - minX + 50}
                  y1={node.y - minY + 50}
                  x2={target.x - minX + 50}
                  y2={target.y - minY + 50}
                  stroke="#6d28d9"
                  strokeWidth={1}
                  opacity={0.3}
                />
              );
            })
          )}
          {/* Draw nodes */}
          {tree.nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x - minX + 50}
                cy={node.y - minY + 50}
                r={selectedNodes.includes(node.id) ? 13 : 10}
                fill={selectedNodes.includes(node.id) ? "#f59e42" : "#a78bfa"}
                stroke="#fff"
                strokeWidth={selectedNodes.includes(node.id) ? 3 : 1}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: "pointer" }}
              />
              {/* Show node name on hover */}
              <title>{node.name}</title>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4">
        <label className="block text-fuchsia-200 mb-2 font-semibold">Notes (e.g. lvl 95 build)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
          rows={2}
          placeholder="Add notes about your passive tree..."
        />
      </div>
    </div>
  );
} 