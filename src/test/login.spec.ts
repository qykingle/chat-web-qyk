import { expect, test } from '@playwright/test'

test('goto login', async ({ page }) => {
  await page.goto('http://localhost:1002/#/login')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('登录')
})

test('login action', async ({ page }) => {
  await page.goto('http://localhost:1002/#/login')

  // 输入用户名和密码
  await page.fill('input[placeholder="请输入用户名"]', 'admin')
  await page.fill('input[placeholder="请输入OpenAI API Key"]', '123456')

  // 点击登录按钮
  await page.getByRole('button', { name: '登录' }).click()

  // 希望成功跳转到聊天页面
  await expect(page).toHaveTitle('聊天')
})
