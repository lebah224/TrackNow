import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))
  const form = await request.formData()
  const name = String(form.get('name') || '').trim()
  const account_type = String(form.get('account_type') || 'other')
  const opening_balance = Number(form.get('opening_balance') || 0)
  if (!name || !Number.isFinite(opening_balance) || opening_balance < 0) return NextResponse.redirect(new URL('/onboarding?error=invalid', request.url))
  const { error } = await supabase.from('accounts').insert({ user_id:user.id, name, account_type, opening_balance, currency:'XOF' })
  if (error) return NextResponse.redirect(new URL('/onboarding?error=save', request.url))
  return NextResponse.redirect(new URL('/', request.url))
}
