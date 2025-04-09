"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ProductsPagination({
  pageCount,
}: {
  pageCount: number
}) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const router = useRouter()
  const handlePagination = (count: number) => {
    const nextPage = currentPage + count
    router.push(`?page=${nextPage}`)
  }

  return (
    <div className="flex justify-center mt-8 gap-4">
      <Button onClick={() => handlePagination(-1)} disabled={currentPage === 1}>
        <ArrowLeft /> Previous Page
      </Button>
      <Button
        onClick={() => handlePagination(1)}
        disabled={currentPage === pageCount}
      >
        Next Page <ArrowRight />
      </Button>
    </div>
  )
}
