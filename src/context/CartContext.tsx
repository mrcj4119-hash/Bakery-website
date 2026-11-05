import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';

export interface CartLine {
  id: string;
  title: string;
  price: number;
  qty: number;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: 'add'; line: Omit<CartLine, 'qty'> }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: CartLine[] };

const STORAGE_KEY = 'ambatana-cart';
const MAX_QTY = 99;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((line) => line.id === action.line.id);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.id === action.line.id ? { ...line, qty: Math.min(line.qty + 1, MAX_QTY) } : line,
          ),
        };
      }
      return { lines: [...state.lines, { ...action.line, qty: 1 }] };
    }
    case 'setQty': {
      if (action.qty < 1) {
        return { lines: state.lines.filter((line) => line.id !== action.id) };
      }
      return {
        lines: state.lines.map((line) =>
          line.id === action.id ? { ...line, qty: Math.min(action.qty, MAX_QTY) } : line,
        ),
      };
    }
    case 'remove':
      return { lines: state.lines.filter((line) => line.id !== action.id) };
    case 'clear':
      return { lines: [] };
    case 'hydrate':
      return { lines: action.lines };
  }
}

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.id === 'string' &&
        typeof line?.title === 'string' &&
        typeof line?.price === 'number' &&
        typeof line?.qty === 'number' &&
        line.qty >= 1,
    );
  } catch {
    return [];
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartLine, 'qty'>) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getQty: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch({ type: 'hydrate', lines: readStoredLines() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  }, [state.lines, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const addItem = useCallback((item: Omit<CartLine, 'qty'>) => dispatch({ type: 'add', line: item }), []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'setQty', id, qty }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = state.lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    return {
      lines: state.lines,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQty,
      removeItem,
      clearCart,
      getQty: (id: string) => state.lines.find((line) => line.id === id)?.qty ?? 0,
    };
  }, [state.lines, isOpen, openCart, closeCart, addItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
