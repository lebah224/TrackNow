import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const form = await request.formData()
  const email = String(form.get('email') || '')
  const password = String(form.get('password') || '')
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) return NextResponse.redirect(new URL('/login?error=signup', request.url))
  return NextResponse.redirect(new URL('/login?created=1', request.url))
}
