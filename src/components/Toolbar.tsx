import React, { useRef } from 'react';

type Props = {
  onAddNode: () => void;
  onAddTemplate: (t: any) => void;
  onDeleteSelected: () => void;
  onExport: () => void;
  onExportPNG: () => void;
  onExportSVG: () => void;
  onImport: (file: File) => void;
};


export default function Toolbar({ onAddNode, onAddTemplate, onDeleteSelected, onExport, onExportPNG, onExportSVG, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const openFile = () => fileRef.current?.click();

  return (
    <div className="flex items-center gap-2 p-3 border-b bg-gray-50">
      <button type="button" onClick={onAddNode} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
        + Node
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onAddTemplate({ type: 'corporate', data: { label: 'Manager', title: 'Manager' } })}
          className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
        >
          Corporate: Manager
        </button>
        <button
          type="button"
          onClick={() => onAddTemplate({ type: 'corporate', data: { label: 'Team Lead', title: 'Team Lead' } })}
          className="px-3 py-1 rounded bg-gray-700 text-white text-sm"
        >
          Corporate: Team Lead
        </button>

        <button
          type="button"
          onClick={() => onAddTemplate({ type: 'corporate-alt', data: { label: 'Manager', title: 'Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop' } })}
          className="px-3 py-1 rounded bg-corporateAlt-600 text-white text-sm"
        >
          Corporate Alt: Manager (photo)
        </button>
        <button
          type="button"
          onClick={() => onAddTemplate({ type: 'corporate-alt', data: { label: 'Team Lead', title: 'Team Lead' } })}
          className="px-3 py-1 rounded bg-corporateAlt-700 text-white text-sm"
        >
          Corporate Alt: Team Lead (initials)
        </button>
      </div>

      <button type="button" onClick={onDeleteSelected} className="px-3 py-1 rounded bg-red-600 text-white text-sm">
        Delete Selected
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button type="button" onClick={onExport} className="px-3 py-1 rounded bg-green-600 text-white text-sm">
          Export JSON
        </button>
        <button type="button" onClick={onExportPNG} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
          Export PNG
        </button>
        <button type="button" onClick={onExportSVG} className="px-3 py-1 rounded bg-indigo-700 text-white text-sm">
          Export SVG
        </button>
        <button type="button" onClick={openFile} className="px-3 py-1 rounded bg-gray-200 text-sm">
          Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            if (f) onImport(f);
            // reset value to allow same file re-upload
            e.currentTarget.value = '';
          }}
        />
      </div>
    </div>
  );
}
