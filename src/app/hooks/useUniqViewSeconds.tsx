'use client'

import { useState, useEffect, useCallback } from 'react'

type MockApiResponse = {
  id: string;
  numbers: Array<Array<number>> | number[][];
}

const useUniqViewSeconds = (url = 'https://664ac067a300e8795d42d1ff.mockapi.io/api/v1/numbers/1') => {
  const [uniqueSeconds, setUniqueSeconds] = useState<number[]>([])
  /**
   * Used to store the original `numbers` values from the api call for presentation purposes
   * it is useless if the `Quick Coding Test` only needs this file to be submitted.
   *
   * It is added in just for displaying the generated content into `../page.tsx`.
   * Can ignore this implementation
   */
  const [originalSeconds, setOriginalSeconds] = useState<number[][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | any | null>(null)

  const fetchViewSeconds = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to fetch numbers from provided url')
      }
      const data: MockApiResponse = await response.json()

      if (!data?.numbers?.length) {
        throw new Error('Numbers provided via API is empty')
      }

      const uniqueSortedSeconds = [
        ...new Set(data.numbers.flat()),
      ].sort((a, b) => a - b)

      setOriginalSeconds(data.numbers)
      setUniqueSeconds(uniqueSortedSeconds)
      setError(null)
    } catch (error) {
      setError(error)
      setUniqueSeconds([])
      setOriginalSeconds([])
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchViewSeconds()
  }, [fetchViewSeconds])

  return {
    originalSeconds,
    uniqueSeconds,
    loading,
    error,
  }
}

export default useUniqViewSeconds
