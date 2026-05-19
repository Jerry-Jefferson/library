"use client";

import BgPic from "@/public/libs.jpg";
import { Button } from "@/src/components/client/button/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (error.digest) {
      navigator.clipboard.writeText(error.digest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Please, describe your problem to support@example.com");
    }
  }
  return (
    <div
      style={{ backgroundImage: `url(${BgPic.src})` }}
      className="flex flex-col w-full min-h-[calc(100vh-74.4px)] gap-6 p-8 justify-center bg-cover bg-center bg-no-repeat"
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
        <h1 className="uppercase font-bold text-7xl">An ink-spill in the system</h1>
        <p className="text-secondary text-2xl">
          The manuscript has encountered a fatal tear. The archival binding has failed, leaving the
          current page illegible
        </p>
        <div className="flex justify-between gap-8 ml-10 mr-10">
          <Button fullWidth size="medium" variant="primary" onClick={() => unstable_retry()}>
            Retry
          </Button>
          <Button fullWidth size="medium" variant="primary" onClick={handleCopy}>
            {copied ? "ID copied!" : "Copy Error ID"}
          </Button>
        </div>
        <p>Please contact us at support@example.com</p>
      </div>
    </div>
  );
}
