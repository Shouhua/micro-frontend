Write-Host "开始安装依赖包..."   
pnpm i
Write-Host "开始工程编译..." 
pnpm run build
 
$PROJECT_NAME = "proj1"
$VERSION = "0.0.1"
$TIMESTAMP = Get-Date -Format "yyyyMMddHHmmss"
$BRANCH = "main"
# 正式环境使用git命令: git rev-parse --short HEAD
$COMMIT_ID = "12345678" 
$IMAGE_NAME = "microfrontend-${PROJECT_NAME}"
$IMAGE_TAG = "$VERSION.$TIMESTAMP-$BRANCH-$COMMIT_ID"
$REPO_NAME = "dockerregistry:5000/${IMAGE_NAME}"
$IMAGE = "${REPO_NAME}:${IMAGE_TAG}"
$LATEST = "dockerregistry:5000/${IMAGE_NAME}:latest"
 
Write-Host "开始生成镜像：${IMAGE}"
# 注意docker位置指相对于根据最后指定的path上下文
docker build -f .\Dockerfile -t $IMAGE -t $LATEST .
 
if($? -eq "True") {
    Write-Host "生成镜像成功 :)" -ForegroundColor Green
    docker push -a $REPO_NAME
    if($? -eq "True") {
        Write-Host "推送镜像成功 :)" -ForegroundColor Green  
    } else {
        Write-Host "推送镜像失败 :(" -ForegroundColor Red
    }
} else {
    Write-Host "镜像build失败 :(" -ForegroundColor Red 
}