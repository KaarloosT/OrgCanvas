import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  
} from 'react-flow-renderer';
// @ts-ignore
import { toPng, toSvg } from 'html-to-image';
import Toolbar from './Toolbar';
import CorporateNode from './CorporateNode';
import CorporateNodeAlt from './CorporateNodeAlt';
import ContextMenu from './ContextMenu';
import SidePanel from './SidePanel';


// Editor simple y persistencia local (single-user)
export default function FlowEditor(): JSX.Element {
  const [nodes, setNodes] = useState<any[]>([
    { id: '1', position: { x: 250, y: 5 }, data: { label: 'CEO' } },
    { id: '2', position: { x: 100, y: 125 }, data: { label: 'CTO' } },
    { id: '3', position: { x: 400, y: 125 }, data: { label: 'CFO' } },
  ]);
  const [edges, setEdges] = useState<any[]>([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const idCounter = useRef(4);


  // Cargar desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('organigrama:v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.nodes)) setNodes(parsed.nodes);
        if (Array.isArray(parsed.edges)) setEdges(parsed.edges);
        // compute next id safely: take max numeric id and add 1
        const maxId = parsed.nodes && parsed.nodes.length > 0 ? Math.max(...parsed.nodes.map((n: any) => Number(n.id) || 0)) : 4;
        idCounter.current = Math.max(4, maxId) + 1;
      } catch {
        // ignore
      }
    }
  }, []);

  // Real-time collaboration removed: single-user mode only. State is persisted to localStorage.

  // Persistencia local (single-user)
  useEffect(() => {
    localStorage.setItem('organigrama:v1', JSON.stringify({ nodes, edges }));
  }, [nodes, edges]);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((connection: any) => setEdges((eds) => addEdge({ ...connection, id: connection.id || `e${connection.source}-${connection.target}-${Date.now()}-${Math.random().toString(36).slice(2,6)}` }, eds)), []);

  // Context menu state
  const [contextMenu, setContextMenu] = React.useState<null | { x: number; y: number; nodeId: string }>(null);
  // Side panel state
  const [sideNodeId, setSideNodeId] = React.useState<string | null>(null);

  // Keyboard delete support
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && sideNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== sideNodeId));
        setEdges((eds) => eds.filter((e) => e.source !== sideNodeId && e.target !== sideNodeId));
        setSideNodeId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sideNodeId]);

  const addNode = (template?: Partial<any>) => {
    setNodes((prev) => {
      // Ensure unique id using current state
      let idNum = idCounter.current;
      while (prev.find((n) => String(n.id) === String(idNum))) {
        idNum += 1;
      }
      idCounter.current = idNum + 1;
      const id = String(idNum);

      const newNode: any = {
        id,
        position: { x: 50 + Math.random() * 400, y: 50 + Math.random() * 300 },
        data: { label: template?.data?.label || `Nuevo (${id})`, title: template?.data?.title, avatar: template?.data?.avatar },
        type: template?.type || 'default',
        ...template,
      };

      return prev.concat(newNode);
    });
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedId && e.target !== selectedId));
    setSelectedId(null);
  };

  const onNodeDoubleClick = (_: any, node: any) => {
    // Ignore double-clicks on empty canvas or edges
    if (!node || !node.id) return;

    setSideNodeId(node.id);
  };

  const onSelectionChange = (sel: any) => {
    const s = sel.nodes && sel.nodes.length > 0 ? sel.nodes[0].id : null;
    setSelectedId(s);
    setSideNodeId(s);
  };

  // Hide context menu on any click
  useEffect(() => {
    const onClick = () => setContextMenu(null);
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const exportJSON = () => {
    const payload = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organigrama.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed.nodes)) setNodes(parsed.nodes.map((n: any, idx: number) => ({ ...n, id: String(idCounter.current + idx) })));
        if (Array.isArray(parsed.edges)) setEdges(parsed.edges.map((e: any, i: number) => ({ ...e, id: e.id || `e${e.source}-${e.target}-${Date.now()}-${i}` })));
      } catch {
        // ignore
      }
    };
    reader.readAsText(file);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const exportToPNG = async () => {
    if (!wrapperRef.current) return;
    try {
      const dataUrl = await toPng(wrapperRef.current, {
        cacheBust: true,
        filter: (node) => {
          if (!(node as HTMLElement).classList) return true;
          const cls = (node as HTMLElement).classList;
          if (cls.contains('react-flow__controls') || cls.contains('react-flow__minimap')) return false;
          return true;
        },
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'organigrama.png';
      a.click();
      } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Export PNG failed', err);
    }
  };

  const exportToSVG = async () => {
    if (!wrapperRef.current) return;
    try {
      const svg = await toSvg(wrapperRef.current, {
        filter: (node) => {
          if (!(node as HTMLElement).classList) return true;
          const cls = (node as HTMLElement).classList;
          if (cls.contains('react-flow__controls') || cls.contains('react-flow__minimap')) return false;
          return true;
        },
      });
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organigrama.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Export SVG failed', err);
    }
  };

  const nodeTypes = useMemo(() => ({
    corporate: CorporateNode,
    'corporate-alt': CorporateNodeAlt,
  }), [] as any) as any;

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col">
        <Toolbar
          onAddNode={() => addNode()}
          onAddTemplate={(t) => addNode(t)}
          onDeleteSelected={deleteSelected}
          onExport={exportJSON}
          onExportPNG={exportToPNG}
          onExportSVG={exportToSVG}
          onImport={importJSON}
        />

        <div className="flex-1">
          <div ref={wrapperRef} className="h-full relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeDoubleClick={onNodeDoubleClick}
              onNodeContextMenu={(ev: any, node: any) => {
                ev.preventDefault();
                setContextMenu({ x: ev.clientX, y: ev.clientY, nodeId: node.id });
              }}
              onSelectionChange={onSelectionChange}
              nodeTypes={nodeTypes}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>

            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu(null)}
                onDelete={() => {
                  setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));
                  setEdges((eds) => eds.filter((e) => e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId));
                }}
                onDuplicate={() => {
                  const old = nodes.find((n) => n.id === contextMenu.nodeId);
                  if (old) {
                    const id = String(idCounter.current++);
                    const copy = { ...old, id, position: { x: old.position.x + 20, y: old.position.y + 20 } };
                    setNodes((nds) => nds.concat(copy));
                  }
                }}
                onEdit={() => setSideNodeId(contextMenu.nodeId)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-80 border-l bg-white">
        <SidePanel
          node={nodes.find((n) => n.id === sideNodeId) ?? null}
          onChange={(patch) => {
            setNodes((nds) => nds.map((n) => (n.id === sideNodeId ? { ...n, ...patch, data: { ...(n.data || {}), ...(patch.data || {}) } } : n)));
          }}
          onClose={() => setSideNodeId(null)}
        />
      </div>
    </div>
  );
}
