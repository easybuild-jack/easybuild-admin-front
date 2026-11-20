import type { NextRequest, NextResponse } from 'next/server'

export type MockMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type MockHandler = (
  request: NextRequest
) => Promise<NextResponse> | NextResponse

export type MockRouteMap = Record<string, MockHandler>

