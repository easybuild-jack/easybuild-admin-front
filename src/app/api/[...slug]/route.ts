import { NextRequest } from 'next/server'
import { dispatchMockRequest } from '@/mock'
import type { MockMethod } from '@/mock/types'

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

async function handle(
  request: NextRequest,
  context: RouteContext,
  method: MockMethod
) {
  const { slug } = await context.params
  const path = '/' + (slug || []).join('/')
  return dispatchMockRequest(request, method, path)
}

export const GET = (req: NextRequest, ctx: RouteContext) => handle(req, ctx, 'GET')
export const POST = (req: NextRequest, ctx: RouteContext) => handle(req, ctx, 'POST')
export const PUT = (req: NextRequest, ctx: RouteContext) => handle(req, ctx, 'PUT')
export const DELETE = (req: NextRequest, ctx: RouteContext) => handle(req, ctx, 'DELETE')
export const PATCH = (req: NextRequest, ctx: RouteContext) => handle(req, ctx, 'PATCH')

