"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FiSidebar, FiX } from "react-icons/fi";

import { Button } from "@/src/components/client/button/button";
import { sidebarLinks } from "@/src/shared/constants/sidebarLinks";
import { useTranslations } from "next-intl";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Common");
  const tEntity = useTranslations("Entities");
  return (
    <>
      <Button
        type="button"
        size="small"
        variant="icon"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-20 right-6 z-50 bg-primary/40 border border-primary"
      >
        <FiSidebar className="text-lg" />
      </Button>

      <aside className="hidden md:block w-[15%] border-r border-secondary p-6">
        <div className="text-primary flex flex-col gap-2 sticky top-6">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[clamp(12px,5cqw+10px,20px)] hover:text-primary-hover transition-colors"
            >
              {t("add")} {tEntity(link.label)}
            </Link>
          ))}
        </div>
      </aside>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={setIsOpen} className="relative z-50 md:hidden">
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transition duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-64 bg-background/50 backdrop-blur border-l border-primary p-6 shadow-xl">
                <div className="flex justify-end mb-6">
                  <Button onClick={() => setIsOpen(false)}>
                    <FiX className="text-2xl" />
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg hover:text-primary-hover transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
