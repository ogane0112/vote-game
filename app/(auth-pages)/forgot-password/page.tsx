import { forgotPasswordAction } from '@/utils/supabase/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ForgotPassword({ searchParams }: { searchParams: Message }) {
  return (
    <form className='flex-1 flex flex-col w-full gap-4 text-gray-300 min-w-64 max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg sm:p-8 md:p-10 lg:p-12'>
      <div>
        <h1 className='text-3xl font-bold text-white'>パスワードをリセット</h1>
        <p className='text-sm text-gray-400'>
          すでにアカウントをお持ちですか？{' '}
          <Link className='text-indigo-400 underline' href='/sign-in'>
            サインイン
          </Link>
        </p>
      </div>
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
        <SubmitButton
          formAction={forgotPasswordAction}
          className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-300'
        >
          パスワードをリセット
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  )
}
