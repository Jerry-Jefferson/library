"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { Button } from "../button/button";

interface Props {
  children: ReactNode;
  title: string;
  message: string;
  className?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className={`flex flex-col items-center justify-center rounded-xl bg-card-back p-8 gap-2 text-center ${this.props.className}`}
        >
          <BsFillExclamationSquareFill className="text-primary text-5xl" />
          <p className="text-lg font-bold">Failed to load</p>
          <p className="text-md mb-2">{this.props.title || "Content failed"}</p>
          <p className="text-secondary">{this.props.message}</p>
          <Button
            fullWidth
            onClick={this.reset}
            variant="primary"
            size="small"
            className="text-[10px] transition-colors"
          >
            Retry
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
