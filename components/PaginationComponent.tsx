import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg">
      <p className="text-sm text-muted-foreground order-2 sm:order-1" aria-live="polite">
        Página <span className="font-medium text-foreground">{currentPage}</span> de{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>
      <Pagination className="w-auto order-1 sm:order-2">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              className="min-w-[40px]"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              className="min-w-[40px]"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
