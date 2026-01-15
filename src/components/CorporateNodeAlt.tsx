import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

function initials(name = '') {
  return name
    .split(' ')
    .map((s) => s.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function CorporateNodeAlt({ data }: { data: any }) {
  const avatar = data.avatar as string | undefined;
  const label = data.label || '';
  return (
    <div className="w-56 p-3 rounded-lg border bg-white shadow-corporate-md relative" style={{ borderColor: 'rgba(16,36,64,0.06)' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#4f6f8f', width: 10, height: 10, borderRadius: 10 }} />

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-corporateAlt-500 flex items-center justify-center text-white font-semibold overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">{initials(label)}</span>
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{label}</div>
          {data.title && <div className="text-sm text-gray-500">{data.title}</div>}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: '#22354a', width: 10, height: 10, borderRadius: 10 }} />
    </div>
  );
}
