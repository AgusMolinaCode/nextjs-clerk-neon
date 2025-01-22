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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

interface SelectNativeComponentProps {
  cities: string[]
  onCityChange: (city: string) => void
}

export default function SelectNativeComponent({ 
  cities, 
  onCityChange 
}: SelectNativeComponentProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    onCityChange(currentValue === value ? "" : currentValue);
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
              {value || "Todas las ciudades"}
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
            <CommandInput placeholder="Busca una ciudad..." />
            <CommandList>
              <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value=""
                  onSelect={handleSelect}
                >
                  Todas las ciudades
                  {value === "" && (
                    <CheckIcon width={12} height={12} strokeWidth={2} className="ml-auto" />
                  )}
                </CommandItem>
                {cities.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={handleSelect}
                  >
                    {city}
                    {value === city && (
                      <CheckIcon width={12} height={12} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
