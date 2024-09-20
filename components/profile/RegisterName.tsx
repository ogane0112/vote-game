// Start of Selection
import React from 'react'
import { registerName } from '@/utils/supabase/actions'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { FormMessage, Message } from '../form-message'
function RegisterName({ searchParams }: { searchParams: Message }) {
  return (
    <form>
      <Input type='password' name='name' placeholder='パスワード' required />
      <SubmitButton pendingText='登録中...' type='submit' formAction={registerName}>
        名前登録
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  )
}

export default RegisterName
