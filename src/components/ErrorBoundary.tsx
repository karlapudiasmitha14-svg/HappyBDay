import * as React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in Birthday Arc:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-amber-400 font-mono flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-zinc-950 border-4 border-amber-500 p-8 shadow-[8px_8px_0px_#000000] space-y-6">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-amber-400">
              <AlertTriangle size={32} />
            </div>
            
            <div className="space-y-2">
              <h1 className="font-pixel text-sm text-white">SYSTEM RECOVERY PROTOCOL</h1>
              <p className="text-xs text-zinc-400">
                A temporal glitch occurred in the Birthday Arc Matrix. Click below to reboot the system.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs border-2 border-yellow-200 shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
            >
              <RefreshCw size={14} />
              <span>REBOOT ARC (REFRESH)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
