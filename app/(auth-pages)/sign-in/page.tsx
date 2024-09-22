// Start of Selection
import { signInAction } from '@/utils/supabase/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className='flex flex-col w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold text-white text-center'>サインイン</h1>
      <p className='text-sm text-gray-400 text-center mt-2'>
        アカウントをお持ちでないですか？{' '}
        <Link className='text-indigo-400 font-medium underline' href='/sign-up'>
          サインアップ
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
        <div className='flex justify-between items-center'>
          <Label htmlFor='password' className='text-gray-200'>
            パスワード
          </Label>
          <Link className='text-xs text-indigo-400 underline' href='/forgot-password'>
            パスワードをお忘れですか？
          </Link>
        </div>
        <Input
          type='password'
          name='password'
          placeholder='パスワード'
          required
          className='bg-gray-700 text-gray-300 placeholder-gray-500'
        />
        <SubmitButton
          pendingText='サインイン中...'
          formAction={signInAction}
          className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-300'
        >
          サインイン
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  )
}
