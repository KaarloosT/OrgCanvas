import React from 'react';

type Props = {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onEdit: () => void;
};

export default function ContextMenu({ x, y, onClose, onDelete, onDuplicate, onEdit }: Props) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 60 }}>
      <div className="bg-white border rounded shadow py-1 w-40">
        <button onClick={() => { onEdit(); onClose(); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">Editar</button>
        <button onClick={() => { onDuplicate(); onClose(); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">Duplicar</button>
        <button onClick={() => { onDelete(); onClose(); }} className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100">Borrar</button>
      </div>
    </div>
  );
}
