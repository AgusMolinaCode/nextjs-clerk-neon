"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
// import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { FRAMEWORKS } from '@/constants'

export default function SelectWithSearch({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    onCategoryChange(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-60">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? FRAMEWORKS.find((framework) => framework.value === value)?.label
                : "Selecciona una categoría"}
            </span>
            <ChevronDownIcon
              width={16}
              height={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Busca una categoría..." />
            <CommandList>
              <CommandEmpty>No se encontraron categorías.</CommandEmpty>
              {Object.entries(
                FRAMEWORKS.reduce((acc, framework) => {
                  if (!acc[framework.group]) acc[framework.group] = [];
                  acc[framework.group].push(framework);
                  return acc;
                }, {} as Record<string, typeof FRAMEWORKS>)
              ).map(([group, items]) => (
                <CommandGroup key={group} heading={group}>
                  {items.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        handleSelect(currentValue);
                      }}
                    >
                      {framework.label}
                      {value === framework.value && (
                        <CheckIcon width={12} height={12} strokeWidth={2} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
