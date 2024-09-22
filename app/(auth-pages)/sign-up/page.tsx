import { signUpAction } from '@/utils/supabase/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SmtpMessage } from '../smtp-message'

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ('message' in searchParams) {
    return (
      <div className='w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4'>
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <>
      <form className='flex flex-col w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-white text-center'>サインアップ</h1>
        <p className='text-sm text-gray-400 text-center mt-2'>
          すでにアカウントをお持ちですか？{' '}
          <Link className='text-indigo-400 font-medium underline' href='/sign-in'>
            サインイン
          </Link>
        </p>
        <div className='flex flex-col gap-4 mt-6'>
          <Label htmlFor='email' className='text-gray-200'>
            メールアドレス
          </Label>
          <Input
            name='email'
            placeholder='you@example.com'
            required
            className='bg-gray-700 text-gray-300 placeholder-gray-500'
          />
          <Label htmlFor='password' className='text-gray-200'>
            パスワード
          </Label>
          <Input
            type='password'
            name='password'
            placeholder='パスワード'
            minLength={6}
            required
            className='bg-gray-700 text-gray-300 placeholder-gray-500'
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText='サインアップ中...'
            className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-300'
          >
            サインアップ
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  )
}
