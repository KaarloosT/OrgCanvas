import React from 'react';

type Props = {
  node: any | null;
  onChange: (patch: Partial<any>) => void;
  onClose: () => void;
};

export default function SidePanel({ node, onChange, onClose }: Props) {
  if (!node) return null;

  return (
    <aside className="w-80 p-4 border-l bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Propiedades</h3>
        <button type="button" onClick={onClose} className="text-sm text-gray-500">Cerrar</button>
      </div>

      <label htmlFor="label" className="block text-sm text-gray-600">Etiqueta</label>
      <input
        id="label"
        className="w-full mb-3 mt-1 p-2 border rounded"
        value={node.data?.label || ''}
        onChange={(e) => onChange({ data: { ...(node.data || {}), label: e.target.value } })}
      />

      <label htmlFor="title" className="block text-sm text-gray-600">Título</label>
      <input
        id="title"
        className="w-full mb-3 mt-1 p-2 border rounded"
        value={node.data?.title || ''}
        onChange={(e) => onChange({ data: { ...(node.data || {}), title: e.target.value } })}
      />

      <label htmlFor="avatar" className="block text-sm text-gray-600">Avatar URL</label>
      <input
        id="avatar"
        className="w-full mb-3 mt-1 p-2 border rounded"
        value={node.data?.avatar || ''}
        onChange={(e) => onChange({ data: { ...(node.data || {}), avatar: e.target.value } })}
      />

      <label htmlFor="type" className="block text-sm text-gray-600">Tipo</label>
      <select
        id="type"
        className="w-full mb-3 mt-1 p-2 border rounded"
        value={node.type || 'default'}
        onChange={(e) => onChange({ type: e.target.value })}
      >
        <option value="default">Default</option>
        <option value="corporate">Corporate</option>
        <option value="corporate-alt">Corporate Alt</option>
      </select>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => onChange({ data: { ...(node.data || {}), label: node.data?.label || 'Nuevo' } })}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
        >
          Guardar
        </button>
      </div>
    </aside>
  );
}
