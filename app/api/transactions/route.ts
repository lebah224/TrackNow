import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const allowedTypes = new Set(['income','expense'])

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))

  const form = await request.formData()
  const type = String(form.get('type') || 'expense')
  const amount = Number(form.get('amount') || 0)
  const account_id = String(form.get('account_id') || '')
  const category_id = String(form.get('category_id') || '') || null
  const description = String(form.get('description') || '').trim() || null
  const occurred_at = String(form.get('occurred_at') || new Date().toISOString())

  if (!allowedTypes.has(type) || !account_id || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.redirect(new URL('/?error=invalid_transaction', request.url))
  }

  const { data: account } = await supabase.from('accounts').select('id').eq('id', account_id).eq('user_id', user.id).eq('is_active', true).maybeSingle()
  if (!account) return NextResponse.redirect(new URL('/?error=account', request.url))

  const { error } = await supabase.from('transactions').insert({
    user_id:user.id, account_id, category_id, type, amount, currency:'XOF', description, occurred_at
  })
  if (error) return NextResponse.redirect(new URL('/?error=save_transaction', request.url))
  return NextResponse.redirect(new URL('/?saved=1', request.url))
}
