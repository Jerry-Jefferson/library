"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CloseButton } from "../button/variants/closeButton";

export interface ModalWindowProps {
  header: string | React.ReactNode;
  children: React.ReactNode;
  handleCancel: () => void;
}

export function ModalWindow({ header, children, handleCancel }: ModalWindowProps) {
  return (
    <Dialog open onClose={handleCancel}>
      <div className="fixed inset-0 flex w-full items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <DialogPanel className="bg-card-back rounded-md p-6 max-w-[800px] min-w-[200px] flex flex-col gap-6 border border-secondary md:w-[400px] lg:w-[800px]">
          <DialogTitle className="flex justify-between items-center border-b border-secondary p-2">
            {header}
            <CloseButton handleCancel={handleCancel} />
          </DialogTitle>
          <div className="flex flex-col gap-6 w-full">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
