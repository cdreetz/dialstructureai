import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export const config = {
  matcher: ['/dashboard/:path*'],
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })

  const { data, error } = await supabase.auth.getSession()

  // Added console logs for debugging
  console.log('Session data:', data)
  if (error) {
    console.error('Error fetching session:', error)
  }

  // Check if the session object itself is null, not just the data property
  if (!data?.session || error) {
    console.log('Redirecting to home page due to null session or error.')
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Log to confirm valid user session
  console.log('Valid user session, not redirecting.')

  return res
}
