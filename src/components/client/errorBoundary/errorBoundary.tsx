"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { Button } from "../button/button";

interface Props {
  children: ReactNode;
  title?: string;
  message?: string;
  retryLabel?: string;
  failedLabel?: string;
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
        <div className={`@container h-full w-full ${this.props.className || ""}`}>
          <div
            className={`
              flex h-full w-full flex-col items-center justify-center gap-2
              rounded-xl bg-card-back p-8 text-center
              @lg:flex-row @lg:justify-between @lg:gap-6
              @lg:text-left @lg:text-xl
              @[150px]:text-sm
            `}
          >
            <div
              className={`
                flex flex-col items-center gap-2 text-center
                @lg:flex-row @lg:gap-6
                @lg:text-left @lg:text-xl
              `}
            >
              <BsFillExclamationSquareFill className="text-primary text-5xl" />

              <div>
                <p className="text-lg font-bold">{this.props.failedLabel || "Failed to load"}</p>

                <p className="text-md mb-2">{this.props.title || "Content failed"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 @lg:max-w-[300px] @lg:text-center">
              <p className="text-secondary">{this.props.message || "Try again later"}</p>

              <Button
                fullWidth
                onClick={this.reset}
                variant="primary"
                size="small"
                className="transition-colors"
              >
                {this.props.retryLabel || "Retry"}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
