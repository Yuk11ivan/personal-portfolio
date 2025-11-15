# GitHub 自动部署脚本
# 使用方法：在PowerShell中运行 .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GitHub 自动部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Git仓库状态
Write-Host "[1/5] 检查Git仓库状态..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "发现未提交的更改，正在添加..." -ForegroundColor Yellow
    git add .
    $commitMessage = Read-Host "请输入提交信息（直接回车使用默认信息）"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "更新网页内容"
    }
    git commit -m $commitMessage
}

# 检查远程仓库
Write-Host "[2/5] 检查远程仓库配置..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "未配置远程仓库，需要设置..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请先在GitHub上创建新仓库：" -ForegroundColor Green
    Write-Host "1. 访问 https://github.com/new" -ForegroundColor Green
    Write-Host "2. 创建新仓库（例如：personal-portfolio）" -ForegroundColor Green
    Write-Host "3. 不要初始化README、.gitignore或license" -ForegroundColor Green
    Write-Host ""
    $repoUrl = Read-Host "请输入GitHub仓库URL（例如：https://github.com/Yuk11ivan/personal-portfolio.git）"
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "远程仓库已添加！" -ForegroundColor Green
    } else {
        Write-Host "未提供仓库URL，退出脚本" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "远程仓库已配置: $remoteUrl" -ForegroundColor Green
}

# 设置主分支
Write-Host "[3/5] 设置主分支..." -ForegroundColor Yellow
git branch -M main 2>$null

# 推送到GitHub
Write-Host "[4/5] 准备推送到GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "注意：推送时需要输入GitHub凭证" -ForegroundColor Yellow
Write-Host "- 如果启用了2FA，请使用Personal Access Token作为密码" -ForegroundColor Yellow
Write-Host "- 获取Token: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "是否现在推送？(Y/N)"
if ($confirm -eq "Y" -or $confirm -eq "y") {
    Write-Host "正在推送到GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "   部署成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "您的代码已推送到GitHub！" -ForegroundColor Green
        Write-Host ""
        Write-Host "下一步：启用GitHub Pages" -ForegroundColor Cyan
        Write-Host "1. 访问您的仓库页面" -ForegroundColor Cyan
        Write-Host "2. 点击 Settings > Pages" -ForegroundColor Cyan
        Write-Host "3. Source选择 'main' 分支" -ForegroundColor Cyan
        Write-Host "4. 保存后，网站将在几分钟内可用" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "推送失败，请检查：" -ForegroundColor Red
        Write-Host "1. 网络连接" -ForegroundColor Red
        Write-Host "2. GitHub凭证是否正确" -ForegroundColor Red
        Write-Host "3. 仓库权限" -ForegroundColor Red
    }
} else {
    Write-Host "已取消推送" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[5/5] 完成！" -ForegroundColor Green
