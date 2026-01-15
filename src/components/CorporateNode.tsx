import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default function CorporateNode({ data }: { data: any }) {
  return (
    <div className="w-56 p-3 rounded-lg border border-corporate-200 bg-white shadow-corporate-md relative">
      {/* target handle (incoming) */}
      <Handle type="target" position={Position.Top} style={{ background: '#2b6fc2', width: 10, height: 10, borderRadius: 10 }} />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-corporate-200 rounded-full flex items-center justify-center text-white font-semibold">{(data.label || '').charAt(0)}</div>
        <div>
          <div className="font-semibold text-corporate-800">{data.label}</div>
          {data.title && <div className="text-sm text-gray-500">{data.title}</div>}
        </div>
      </div>

      {/* source handle (outgoing) */}
      <Handle type="source" position={Position.Bottom} style={{ background: '#2359a3', width: 10, height: 10, borderRadius: 10 }} />
    </div>
  );
}
