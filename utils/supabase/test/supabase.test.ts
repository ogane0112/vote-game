import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from '@/utils/supabase/server'
import {
  getTheme,
  registerName,
  changeName,
  signUpAction,
  signInAction,
  forgotPasswordAction,
  resetPasswordAction,
  signOutAction,
} from '../actions'
import { encodedRedirect } from '@/utils/utils'
import { redirect } from 'next/navigation'

// Supabaseクライアントのモック
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}))

// ユーティリティ関数のモック
vi.mock('@/utils/utils', () => ({
  encodedRedirect: vi.fn(),
}))

// Next.jsのリダイレクト関数のモック
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// Next.jsのヘッダー関数のモック
vi.mock('next/headers', () => ({
  headers: vi.fn(() => ({
    get: vi.fn(() => 'http://localhost:3000'),
  })),
}))

describe('Server Actions', () => {
  let mockSupabase: any

  // 各テスト前の準備
  beforeEach(() => {
    // モックをリセット
    vi.clearAllMocks()

    // Supabaseクライアントのモックを設定
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      auth: {
        getUser: vi.fn(),
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updateUser: vi.fn(),
        signOut: vi.fn(),
      },
    }
    vi.mocked(createClient).mockReturnValue(mockSupabase)
  })

  // getTheme関数のテスト
  describe('getTheme', () => {
    it('正常にテーマを取得できること', async () => {
      const mockTheme = [{ id: 1, topic: 'Test Theme' }]
      mockSupabase.select.mockResolvedValue({ data: mockTheme, error: null })

      const result = await getTheme()
      expect(result).toEqual(mockTheme)
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      mockSupabase.select.mockResolvedValue({ data: null, error: new Error('DB Error') })

      await getTheme()
      expect(encodedRedirect).toHaveBeenCalledWith('error', '/test', 'データ取得に失敗しました')
    })
  })

  // registerName関数のテスト
  describe('registerName', () => {
    it('正常に名前を登録できること', async () => {
      const mockUser = { id: 'user123' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
      mockSupabase.insert.mockReturnThis()
      mockSupabase.select.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Test User')

      await registerName(formData)
      expect(redirect).toHaveBeenCalledWith('/protected')
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user123' } } })
      mockSupabase.insert.mockReturnThis()
      mockSupabase.select.mockResolvedValue({ error: new Error('Insert Error') })

      const formData = new FormData()
      formData.append('name', 'Test User')

      await registerName(formData)
      expect(encodedRedirect).toHaveBeenCalledWith('error', '/test', '既に登録済みです！')
    })
  })

  // changeName関数のテスト
  describe('changeName', () => {
    it('正常に名前を変更できること', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user123' } } })
      mockSupabase.update.mockReturnThis()
      mockSupabase.eq.mockReturnThis()
      mockSupabase.select.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'New Name')

      await changeName(formData)
      expect(encodedRedirect).not.toHaveBeenCalled()
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user123' } } })
      mockSupabase.update.mockReturnThis()
      mockSupabase.eq.mockReturnThis()
      mockSupabase.select.mockResolvedValue({ error: new Error('Update Error') })

      const formData = new FormData()
      formData.append('name', 'New Name')

      await changeName(formData)
      expect(encodedRedirect).toHaveBeenCalledWith('error', '/test', 'エラーが発生しました')
    })
  })

  // signUpAction関数のテスト
  describe('signUpAction', () => {
    it('正常にサインアップできること', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      await signUpAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith(
        'success',
        '/sign-up',
        'Thanks for signing up! Please check your email for a verification link.'
      )
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      const mockError = { message: 'Sign up failed' }
      mockSupabase.auth.signUp.mockResolvedValue({ error: mockError })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      await signUpAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith('error', '/sign-up', 'Sign up failed')
    })
  })

  // signInAction関数のテスト
  describe('signInAction', () => {
    it('正常にサインインできること', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      await signInAction(formData)
      expect(redirect).toHaveBeenCalledWith('/protected')
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      const mockError = { message: 'Invalid credentials' }
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: mockError })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'wrong-password')

      await signInAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith('error', '/sign-in', 'Invalid credentials')
    })
  })

  // forgotPasswordAction関数のテスト
  describe('forgotPasswordAction', () => {
    it('正常にパスワードリセットメールを送信できること', async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('email', 'test@example.com')

      await forgotPasswordAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith(
        'success',
        '/forgot-password',
        'Check your email for a link to reset your password.'
      )
    })

    it('エラー時に適切にリダイレクトすること', async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        error: new Error('Reset failed'),
      })

      const formData = new FormData()
      formData.append('email', 'test@example.com')

      await forgotPasswordAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith(
        'error',
        '/forgot-password',
        'Could not reset password'
      )
    })
  })

  // resetPasswordAction関数のテスト
  describe('resetPasswordAction', () => {
    it('正常にパスワードをリセットできること', async () => {
      mockSupabase.auth.updateUser.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('password', 'newpassword123')
      formData.append('confirmPassword', 'newpassword123')

      await resetPasswordAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith(
        'success',
        '/protected/reset-password',
        'Password updated'
      )
    })

    it('Supabaseエラー時に適切にリダイレクトすること', async () => {
      mockSupabase.auth.updateUser.mockResolvedValue({ error: new Error('Update failed') })

      const formData = new FormData()
      formData.append('password', 'newpassword123')
      formData.append('confirmPassword', 'newpassword123')

      await resetPasswordAction(formData)
      expect(encodedRedirect).toHaveBeenCalledWith(
        'error',
        '/protected/reset-password',
        'Password update failed'
      )
    })
  })

  // signOutAction関数のテスト
  describe('signOutAction', () => {
    it('正常にサインアウトできること', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({ error: null })

      await signOutAction()
      expect(redirect).toHaveBeenCalledWith('/')
    })
  })
})
//RLSがきちんと確認されているのか確認するtestコードを作成する
