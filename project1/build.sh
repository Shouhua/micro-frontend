#! /usr/bin/env bash
 
set -eou pipefail
 
RED='\033[31m'
GREEN='\033[32m'
NC='\033[0m' # No Color
echo -e "$NC$GREEN开始安装依赖包...$NC"
pnpm i
echo -e "$GREEN开始工程编译...$NC"
pnpm run build
 
PROJECT_NAME="proj1"
VERSION="0.0.1"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BRANCH="main"
# COMMIT_ID=$(git rev-parse --short HEAD)
COMMIT_ID=12345678
REPO_NAME="dockerregistry:5000/microfrontend-${PROJECT_NAME}"
IMAGE="${REPO_NAME}:$VERSION.$TIMESTAMP-$BRANCH-${COMMIT_ID}"
$LATEST = "dockerregistry:5000/${IMAGE_NAME}:latest"
 
echo -e "$GREEN开始生成镜像: $IMAGE$NC"
docker build -f ./Dockerfile -t $IMAGE -t $LATEST .
 
if [ $? -eq 0 ]; then
    echo -e "$GREEN生成镜像成功:)$NC"
    docker push -a $IMAGE
    if [ $? -eq 0 ]; then
        echo -e "$GREEN推送镜像成功:)$NC"
    else
        echo -e "$RED推送镜像失败:($NC"
    fi
else
    echo -e "$RED生成镜像失败:($NC"
fi