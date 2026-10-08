import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-[#1A1A1A] p-4 font-sans text-[#1A1A1A] dark:text-[#F7F2EA]">
          <div className="max-w-md w-full bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-xl overflow-hidden border border-[#E5A93C]/20">
            <div className="bg-[#C85A32] h-3 w-full"></div>
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-[#F7F2EA] dark:bg-[#1A1A1A] rounded-full mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-[#C85A32]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Something went wrong</h2>
              <p className="text-[#5A524C] dark:text-gray-400 text-center mb-6">
                The pulse of Kathmandu paused for a moment. Our digital mandala hit a slight bump.
              </p>
              
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center space-x-2 bg-[#C85A32] hover:bg-[#8B263E] text-white py-3 px-4 rounded-xl transition-colors duration-300 font-medium"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Reload Application</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
