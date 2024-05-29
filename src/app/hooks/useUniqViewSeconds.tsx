'use client'

import { useState, useEffect, useCallback } from 'react'

type MockApiResponse = {
  id: string;
  numbers: Array<Array<number>> | number[][];
}

const useUniqViewSeconds = (url = 'https://664ac067a300e8795d42d1ff.mockapi.io/api/v1/numbers/1') => {
  const [uniqueSeconds, setUniqueSeconds] = useState<number[]>([])
  const [originalSeconds, setOriginalSeconds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | any | null>(null)

  const fetchViewSeconds = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch numbers from provided url')
      }
      const data: MockApiResponse = await response.json()
      const flattenedSeconds = data.numbers.flat()
      setOriginalSeconds(flattenedSeconds)

      const uniqueSortedSeconds = [
        ...new Set(flattenedSeconds),
      ].sort((a, b) => a - b)

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
